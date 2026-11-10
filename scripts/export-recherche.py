#!/usr/bin/env python3
"""Export the searchable places of the cg44 Elasticsearch index as static files.

Writes, in static/data/recherche/:
- lieux.json: [name, type, code_insee] for a commune or canton,
  [name, 'LIEUDIT', None, MultiPoint coordinates, commune] for a lieu-dit; sorted by type
  then name. The index gives no commune for a lieu-dit: it is taken from the commune
  outline containing its first point (None outside every commune);
- contours/<code_insee>.json: GeoJSON geometry of a commune or canton.

Addresses (551k documents) are not exported: too heavy for an in-browser search.

Usage: python3 scripts/export-recherche.py
"""
import json
import pathlib
import shutil
import urllib.request

ES = 'https://es3.makina-corpus.net'
INDEX = 'cg44'
TYPES = ['COMMUNE', 'CANTON', 'LIEUDIT']
PRECISION = 5  # about 1 m
OUT = pathlib.Path(__file__).resolve().parent.parent / 'static' / 'data' / 'recherche'
# The index stores œ/Œ as the cp1252 bytes 0x9C/0x8C read as latin-1 control characters.
MOJIBAKE = str.maketrans({'\x9c': 'œ', '\x8c': 'Œ'})


def post(path, body):
    request = urllib.request.Request(
        f'{ES}{path}',
        data=json.dumps(body).encode(),
        headers={'Content-Type': 'application/json'},
    )
    with urllib.request.urlopen(request, timeout=60) as response:
        return json.load(response)


def scroll(query):
    page = post(f'/{INDEX}/_search?scroll=2m', {'size': 1000, 'query': query})
    while page['hits']['hits']:
        yield from page['hits']['hits']
        page = post('/_search/scroll', {'scroll': '2m', 'scroll_id': page['_scroll_id']})


def round_coords(coords):
    if isinstance(coords[0], (int, float)):
        return [round(value, PRECISION) for value in coords]
    rounded = [round_coords(child) for child in coords]
    if isinstance(rounded[0][0], (int, float)):
        # Ring or line: drop points made identical by rounding.
        rounded = [point for i, point in enumerate(rounded) if i == 0 or point != rounded[i - 1]]
    return rounded


def outer_polygons(geometry):
    return [geometry['coordinates']] if geometry['type'] == 'Polygon' else geometry['coordinates']


def in_ring(x, y, ring):
    inside = False
    for (x1, y1), (x2, y2) in zip(ring, ring[1:] + ring[:1]):
        if (y1 > y) != (y2 > y) and x < x1 + (y - y1) * (x2 - x1) / (y2 - y1):
            inside = not inside
    return inside


def in_geometry(x, y, geometry):
    return any(
        in_ring(x, y, polygon[0]) and not any(in_ring(x, y, hole) for hole in polygon[1:])
        for polygon in outer_polygons(geometry)
    )


def find_commune(point, communes):
    x, y = point
    for name, (min_x, min_y, max_x, max_y), geometry in communes:
        if min_x <= x <= max_x and min_y <= y <= max_y and in_geometry(x, y, geometry):
            return name
    return None


def bbox(geometry):
    points = [point for polygon in outer_polygons(geometry) for point in polygon[0]]
    xs, ys = zip(*points)
    return min(xs), min(ys), max(xs), max(ys)


def main():
    # Everything is fetched before OUT is replaced: a failing index leaves the current files.
    sources = [hit['_source'] for hit in scroll({'terms': {'type': TYPES}})]
    for source in sources:
        source['nom'] = source['nom'].translate(MOJIBAKE)
    communes = [
        (source['nom'], bbox(source['geometry']), source['geometry'])
        for source in sources if source['type'] == 'COMMUNE'
    ]

    places = []
    contours = {}
    for source in sources:
        geometry = source['geometry']
        coords = round_coords(geometry['coordinates'])
        if source['type'] == 'LIEUDIT':
            commune = find_commune(geometry['coordinates'][0], communes)
            places.append([source['nom'], 'LIEUDIT', None, coords, commune])
        else:
            code = source['code_insee']
            places.append([source['nom'], source['type'], code])
            contours[code] = {'type': geometry['type'], 'coordinates': coords}

    def sort_key(place):
        if place[1] == 'LIEUDIT':
            return TYPES.index('LIEUDIT'), place[0], place[4] or '', place[3]
        return TYPES.index(place[1]), place[0], place[2], []

    places.sort(key=sort_key)

    if OUT.exists():
        shutil.rmtree(OUT)
    (OUT / 'contours').mkdir(parents=True)
    for code, contour in contours.items():
        (OUT / 'contours' / f'{code}.json').write_text(json.dumps(contour, separators=(',', ':')))
    (OUT / 'lieux.json').write_text(json.dumps(places, ensure_ascii=False, separators=(',', ':')))

    counts = {kind: sum(place[1] == kind for place in places) for kind in TYPES}
    orphans = sum(place[1] == 'LIEUDIT' and place[4] is None for place in places)
    print(f'{len(places)} places exported: {counts}; lieux-dits outside any commune: {orphans}')


if __name__ == '__main__':
    main()
