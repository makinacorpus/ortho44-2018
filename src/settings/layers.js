export const ALL_LAYERS = {

  default: { url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' },

  1850: {
    url: 'http://{s}.tiles.cg44.makina-corpus.net/ortho-1850/{z}/{x}/{y}.jpg',
    options: {
      maxZoom: 16,
      tms: true,
      subdomains: 'abcdefgh',
    },
  },
  1949: {
    url: 'http://{s}.tiles.cg44.makina-corpus.net/ortho-1949/{z}/{x}/{y}.jpg',
    options: {
      maxZoom: 18,
      tms: true,
      subdomains: 'abcdefgh',
    },
  },
  1999: {
    url: 'http://{s}.tiles.cg44.makina-corpus.net/ortho-1999/{z}/{x}/{y}.jpg',
    options: {
      maxZoom: 18,
      tms: true,
      subdomains: 'abcdefgh',
    },
  },
  2004: {
    url: 'http://{s}.tiles.cg44.makina-corpus.net/ortho-2004/{z}/{x}/{y}.jpg',
    options: {
      maxZoom: 18,
      tms: true,
      subdomains: 'abcdefgh',
    },
  },
  2009: {
    url: 'http://{s}.tiles.cg44.makina-corpus.net/ortho-2009/{z}/{x}/{y}.jpg',
    options: {
      maxZoom: 18,
      tms: true,
      subdomains: 'abcdefgh',
    },
  },
  2012: {
    url: 'http://{s}.tiles.cg44.makina-corpus.net/ortho-2012/{z}/{x}/{y}.jpg',
    options: {
      maxZoom: 18,
      tms: true,
      subdomains: 'abcdefgh',
    },
  },
};

export default ALL_LAYERS;
