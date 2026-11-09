import { GridLayer } from 'react-leaflet';

// One PMTiles instance per archive, shared by the synced maps:
// header and directories are fetched only once.
const sources = {};

const sourceFor = url => {
  if (!sources[url]) {
    sources[url] = new window.pmtiles.PMTiles(url);
  }
  return sources[url];
};

/**
 * Raster layer read from a PMTiles archive.
 * Relies on the global `pmtiles` script (see gatsby-ssr.js).
 */
class PMTilesLayer extends GridLayer {
  createLeafletElement (props) {
    const { url } = props;
    return window.pmtiles.leafletRasterLayer(sourceFor(url), this.getOptions(props));
  }
}

export default PMTilesLayer;
