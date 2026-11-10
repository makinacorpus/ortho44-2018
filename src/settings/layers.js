// Aerial photographs, served from PMTiles archives (static files, HTTP range requests)
const PMTILES_BASE = 'https://vu-du-ciel.s3.gra.io.cloud.ovh.net/public';

// IGN Géoplateforme WMTS, no key needed
const geopf = (layer, format) => 'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0'
  + `&LAYER=${layer}&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=${format}`;

const minMaxZoom = {
  minZoom: 9,
  maxZoom: 20,
};

export const ALL_LAYERS = {

  background: {
    url: geopf('ORTHOIMAGERY.ORTHOPHOTOS', 'image/jpeg'),
    maxNativeZoom: 18,
  },

  osm: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },

  roads: {
    pmtiles: true,
    url: `${PMTILES_BASE}/osm.pmtiles`,
    opacity: 0.75,
    minNativeZoom: 9,
    maxNativeZoom: 19,
    ...minMaxZoom,
  },

  boundaries: {
    geojson: true,
    url: 'data/dpt44.geojson',
    style: {
      fillColor: 'transparent',
      fillOpacity: 0,
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      interactive: false,
    },
  },

  cadastre: {
    label: 'Cadastre 2017',
    url: geopf('CADASTRALPARCELS.PARCELLAIRE_EXPRESS', 'image/png'),
    opacity: 0.75,
    maxNativeZoom: 19,
    ...minMaxZoom,
  },

  cassini: {
    label: 'Cartes de Cassini',
    url: geopf('BNF-IGNF_GEOGRAPHICALGRIDSYSTEMS.CASSINI', 'image/png'),
    maxNativeZoom: 14,
    ...minMaxZoom,
  },

  1850: {
    pmtiles: true,
    url: `${PMTILES_BASE}/ortho-1850.pmtiles`,
    minNativeZoom: 9,
    maxNativeZoom: 16,
    ...minMaxZoom,
  },
  1949: {
    pmtiles: true,
    url: `${PMTILES_BASE}/ortho-1949.pmtiles`,
    minNativeZoom: 9,
    maxNativeZoom: 18,
    ...minMaxZoom,
  },
  1999: {
    pmtiles: true,
    url: `${PMTILES_BASE}/ortho-1999.pmtiles`,
    minNativeZoom: 9,
    maxNativeZoom: 18,
    ...minMaxZoom,
  },
  2004: {
    pmtiles: true,
    url: `${PMTILES_BASE}/ortho-2004.pmtiles`,
    minNativeZoom: 9,
    maxNativeZoom: 18,
    ...minMaxZoom,
  },
  2009: {
    pmtiles: true,
    url: `${PMTILES_BASE}/ortho-2009.pmtiles`,
    minNativeZoom: 9,
    maxNativeZoom: 18,
    ...minMaxZoom,
  },
  2012: {
    pmtiles: true,
    url: `${PMTILES_BASE}/ortho-2012.pmtiles`,
    minNativeZoom: 10,
    maxNativeZoom: 18,
    ...minMaxZoom,
  },
  2016: {
    pmtiles: true,
    url: `${PMTILES_BASE}/ortho-2016.pmtiles`,
    minNativeZoom: 10,
    maxNativeZoom: 20,
    ...minMaxZoom,
  },
};

export const ORTHO_LAYERS_IDS = [1850, 1949, 1999, 2004, 2009, 2012, 2016, 'cadastre', 'cassini'];

export const DEFAULT_BASE = 2016;

export const COMPARE_WITH = [
  1850,
  1949,
  1999,
  2004,
  2009,
  2012,
  'cadastre',
  'cassini',
];

export default ALL_LAYERS;
