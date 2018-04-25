const ignKeys = {
  'localhost:8000': 'puaqi516lc6f75saib649eg2',
  'makinacorpus.github.io': '9z9o6i52lxwch6mxt9wmwro5',
  'vuduciel.loire-atlantique.fr': 'yyo09x3nnux7wfy7pibnjnsl',
};

const ignKey = (typeof window !== 'undefined' && window.location)
  ? ignKeys[window.location.host]
  : 'no-key-found';

export const ALL_LAYERS = {

  background: {
    url: `https://wxs.ign.fr/${ignKey}/geoportail/wmts?service=WMTS&request=GetTile&version=1.0.0&tilematrixset=PM&tilematrix={z}&tilecol={x}&tilerow={y}&layer=ORTHOIMAGERY.ORTHOPHOTOS&format=image/jpeg&style=normal`,
    maxNativeZoom: 18,
  },

  osm: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },

  roads: {
    url: 'http://{s}.tiles.cg44.makina-corpus.net/osm/{z}/{x}/{y}.png',
    opacity: .75,
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
  },

  cassini: {
    label: 'Cartes de Cassini',
    wms: true,
    url: 'https://arcgis.loire-atlantique.fr/arcgis/services/z_referentiel_externe/cassini/MapServer/WMSServer?',
    layers: '0',
  },

  napoleon: {
    label: 'Cadastre napoléonien',
    wms: true,
    url: 'https://arcgis.loire-atlantique.fr/arcgis/services/z_referentiel_externe/cadastre_napoleonien/MapServer/WMSServer?',
    layers: '0',
  },

  1850: {
    url: 'http://{s}.tiles.cg44.makina-corpus.net/ortho-1850/{z}/{x}/{y}.jpg',
    maxNativeZoom: 16,
    tms: true,
    subdomains: 'abcdefgh',
  },
  1949: {
    url: 'http://{s}.tiles.cg44.makina-corpus.net/ortho-1949/{z}/{x}/{y}.jpg',
    maxNativeZoom: 18,
    tms: true,
    subdomains: 'abcdefgh',
  },
  1999: {
    url: 'http://{s}.tiles.cg44.makina-corpus.net/ortho-1999/{z}/{x}/{y}.jpg',
    maxNativeZoom: 18,
    tms: true,
    subdomains: 'abcdefgh',
  },
  2004: {
    url: 'http://{s}.tiles.cg44.makina-corpus.net/ortho-2004/{z}/{x}/{y}.jpg',
    maxNativeZoom: 18,
    tms: true,
    subdomains: 'abcdefgh',
  },
  2009: {
    url: 'http://{s}.tiles.cg44.makina-corpus.net/ortho-2009/{z}/{x}/{y}.jpg',
    maxNativeZoom: 18,
    tms: true,
    subdomains: 'abcdefgh',
  },
  2012: {
    url: 'http://{s}.tiles.cg44.makina-corpus.net/ortho-2012/{z}/{x}/{y}.jpg',
    maxNativeZoom: 19,
    tms: true,
    subdomains: 'abcdefgh',
  },
  2016: {
    url: 'http://{s}.tiles.cg44new.makina-corpus.net/{z}/{x}/{y}.png',
    maxNativeZoom: 18,
    subdomains: 'bcd',
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
