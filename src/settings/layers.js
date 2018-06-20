const ignKeys = {
  'localhost:8000': 'puaqi516lc6f75saib649eg2',
  'makinacorpus.github.io': '9z9o6i52lxwch6mxt9wmwro5',
  'vuduciel.loire-atlantique.fr': 'yyo09x3nnux7wfy7pibnjnsl',
};

const ignKey = (typeof window !== 'undefined' && window.location)
  ? ignKeys[window.location.host]
  : 'no-key-found';

const legacyWMS = 'http://services.vuduciel.loire-atlantique.fr';

const legacyTileServer = 'http://{s}.tiles.cg44.makina-corpus.net'; // eslint-disable-line no-unused-vars
const newTileServer    = 'https://{s}-tiles-vuduciel2.makina-corpus.net';
const mainTileServer   = newTileServer;

const minMaxZoom = {
  minZoom: 9,
  maxZoom: 20,
};

export const ALL_LAYERS = {

  wms: {
    wms: true,
    url: legacyWMS,
  },

  background: {
    url: `https://wxs.ign.fr/${ignKey}/geoportail/wmts?service=WMTS&request=GetTile&version=1.0.0&tilematrixset=PM&tilematrix={z}&tilecol={x}&tilerow={y}&layer=ORTHOIMAGERY.ORTHOPHOTOS&format=image/jpeg&style=normal`,
    maxNativeZoom: 18,
  },

  osm: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },

  roads: {
    url: `${legacyTileServer}/osm/{z}/{x}/{y}.png`,
    opacity: 0.75,
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
    wms: true,
    url: 'https://arcgis.loire-atlantique.fr/arcgis/services/z_referentiel_externe/cadastre/MapServer/WMSServer?',
    layers: '0,1,2,3',
    opacity: 0.75,
    tileSize: 512,
    width: 512,
    height: 512,
    maxNativeZoom: 19,
    ...minMaxZoom,
  },

  cassini: {
    label: 'Cartes de Cassini',
    wms: true,
    url: 'https://arcgis.loire-atlantique.fr/arcgis/services/z_referentiel_externe/cassini/MapServer/WMSServer?',
    layers: '0',
    ...minMaxZoom,
  },

  napoleon: {
    label: 'Cadastre napoléonien',
    wms: true,
    url: 'https://arcgis.loire-atlantique.fr/arcgis/services/z_referentiel_externe/cadastre_napoleonien/MapServer/WMSServer?',
    layers: '0',
    ...minMaxZoom,
  },

  1850: {
    url: `${mainTileServer}/ortho-1850/{z}/{x}/{y}.jpg`,
    minNativeZoom: 9,
    maxNativeZoom: 16,
    ...minMaxZoom,
    tms: true,
    subdomains: 'abcd',
  },
  1949: {
    url: `${mainTileServer}/ortho-1949/{z}/{x}/{y}.png`,
    minNativeZoom: 9,
    maxNativeZoom: 18,
    ...minMaxZoom,
    tms: true,
    subdomains: 'abcd',
  },
  1999: {
    url: `${mainTileServer}/ortho-1999/{z}/{x}/{y}.png`,
    minNativeZoom: 9,
    maxNativeZoom: 18,
    ...minMaxZoom,
    tms: true,
    subdomains: 'abcd',
  },
  2004: {
    url: `${mainTileServer}/ortho-2004/{z}/{x}/{y}.png`,
    minNativeZoom: 9,
    maxNativeZoom: 18,
    ...minMaxZoom,
    tms: true,
    subdomains: 'abcd',
  },
  2009: {
    url: `${mainTileServer}/ortho-2009/{z}/{x}/{y}.png`,
    minNativeZoom: 9,
    maxNativeZoom: 18,
    ...minMaxZoom,
    tms: true,
    subdomains: 'abcd',
  },
  2012: {
    url: `${mainTileServer}/ortho-2012/{z}/{x}/{y}.png`,
    minNativeZoom: 10,
    maxNativeZoom: 18,
    ...minMaxZoom,
    tms: true,
    subdomains: 'abcd',
  },
  2016: {
    url: `${mainTileServer}/ortho-2016/{z}/{x}/{y}.png`,
    minNativeZoom: 10,
    maxNativeZoom: 20,
    ...minMaxZoom,
    subdomains: 'abcd',
  },
};

export const ORTHO_LAYERS_IDS = [1850, 1949, 1999, 2004, 2009, 2012, 2016, 'cadastre', 'cassini', 'napoleon'];

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
  'napoleon',
];

export default ALL_LAYERS;
