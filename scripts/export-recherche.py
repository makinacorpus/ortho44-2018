#!/usr/bin/env python3
"""Export the searchable places of the cg44 Elasticsearch index as static files.

Writes, in static/data/recherche/:
- lieux.json: [name, type, code_insee, coordinates] per place, sorted by type then name;
  coordinates = MultiPoint coordinates for a lieu-dit, absent for a commune or canton;
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


def main():
    # Everything is fetched before OUT is replaced: a failing index leaves the current files.
    places = []
    contours = {}
    for hit in scroll({'terms': {'type': TYPES}}):
        source = hit['_source']
        nom = source['nom'].translate(MOJIBAKE)
        geometry = source['geometry']
        coords = round_coords(geometry['coordinates'])
        if source['type'] == 'LIEUDIT':
            places.append([nom, 'LIEUDIT', None, coords])
        else:
            code = source['code_insee']
            places.append([nom, source['type'], code])
            contours[code] = {'type': geometry['type'], 'coordinates': coords}

    places.sort(key=lambda place: (TYPES.index(place[1]), place[0], place[2] or '', place[3:]))

    if OUT.exists():
        shutil.rmtree(OUT)
    (OUT / 'contours').mkdir(parents=True)
    for code, contour in contours.items():
        (OUT / 'contours' / f'{code}.json').write_text(json.dumps(contour, separators=(',', ':')))
    (OUT / 'lieux.json').write_text(json.dumps(places, ensure_ascii=False, separators=(',', ':')))

    counts = {kind: sum(place[1] == kind for place in places) for kind in TYPES}
    print(f'{len(places)} places exported: {counts}')


if __name__ == '__main__':
    main()
