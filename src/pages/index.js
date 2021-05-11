/* eslint-disable no-underscore-dangle */
import React from 'react';
import bbox from '@turf/bbox';
import { debounce, isEqual } from 'lodash';
import classnames from 'classnames';

import SyncedMaps from '../components/SyncedMaps';
import MapMenu from '../components/MapMenu';
import MapActions from '../components/MapActions';
import CarouselPOI from '../components/CarouselPOI';
import CustomModal from '../components/CustomModal';

import { DEFAULT_BASE, ALL_LAYERS } from '../settings/layers';

import { getRandomPlace, serializeViewport, unserializeViewport, setHash, getHash } from '../helpers';

const isLive = typeof window !== 'undefined';

export default class IndexPage extends React.Component {
  constructor () {
    super();

    this.state = {
      selection: [DEFAULT_BASE],
      roads: false,
      boundaries: true,
      boundariesData: null,
      cadastre: false,
      bgLayer: true,
      resultLayer: null,
      fullscreen: false,
      dlNotice: false,
    };

    [this.placeName, this.viewport] = getRandomPlace();

    const hash = getHash();
    if (hash) {
      if (hash.includes('=')) {
        this.initialSearch = hash;
      } else {
        const [viewportSerial, layer] = hash.split('!');
        if (ALL_LAYERS[layer]) {
          this.state.selection = [DEFAULT_BASE, layer];
        }
        this.viewport = unserializeViewport(viewportSerial) || this.viewport;
      }
    }

    this.showMaps = this.showMaps.bind(this);
    this.toggleCadastre = this.toggleCadastre.bind(this);
    this.geolocate = this.geolocate.bind(this);
    this.toggleRoads = this.toggleRoads.bind(this);
    this.toggleBoundaries = this.toggleBoundaries.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.toggleDlNotice = this.toggleDlNotice.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.handleViewportChange = debounce(this.handleViewportChange.bind(this), 100);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
  }

  handleResult (selection) {
    const geojson = {
      type: 'Feature',
      properties: {
        name: selection.suggestion.label,
      },
      geometry: selection.suggestion.data._source.geometry,
    };

    const [minX, minY, maxX, maxY] = bbox(geojson);

    this.setState({
      resultLayer: geojson,
    });

    this.firstMap
      && this.firstMap.fitBounds
      && this.firstMap.fitBounds([[minY, minX], [maxY, maxX]]);
  }

  handleViewportChange (viewport) {
    if (!isEqual(this.viewport, viewport)) {
      this.viewport = viewport;
    }
    this.updateHash();
  }

  getWMSPictureUrl (mime = 'jpeg') {
    const bounds = this.firstMap.getBounds();
    const { x, y } = this.firstMap.getSize();
    const layerName = 'cg44:ortho44-2016';

    return `${ALL_LAYERS.wms.url}/geoserver/wms/?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap`
      + `&BBOX=${bounds._southWest.lat},${bounds._southWest.lng},${bounds._northEast.lat},${bounds._northEast.lng}`
      + `&WIDTH=${Math.round(x * 3.125)}&HEIGHT=${Math.round(y * 3.125)}&LAYERS=${layerName}`
      + `&SRS=EPSG:4326&STYLES=&FORMAT=image/${mime}&DPI=96&MAP_RESOLUTION=96&FORMAT_OPTIONS=dpi:96&TRANSPARENT=TRUE`;
  }

  showMaps (...IDs) {
    let selection = IDs;
    const { selection: [firstSelection] } = this.state;

    if (IDs.length === 1 && IDs[0] === firstSelection) {
      selection = [DEFAULT_BASE];
    }

    this.setState({ selection });
  }

  toggleCadastre () {
    this.setState(prevState => ({ cadastre: !prevState.cadastre }));
  }

  toggleRoads () {
    this.setState(prevState => ({ roads: !prevState.roads }));
  }

  toggleBoundaries () {
    this.setState(prevState => ({ boundaries: !prevState.boundaries }));
  }

  toggleFullscreen () {
    this.setState(prevState => ({ fullscreen: !prevState.fullscreen }));
  }

  mapsFromSelection () {
    const {
      selection,
      roads,
      cadastre,
      bgLayer,
      boundaries,
      boundariesData,
      resultLayer,
    } = this.state;

    const maps = selection.map(item => {
      const map = {
        layers: [
          ALL_LAYERS[item],
        ],
      };

      if (bgLayer) {
        map.layers.push({
          ...ALL_LAYERS.background,
          zIndex: 0,
        });
      }
      return map;
    });

    if (cadastre) {
      maps[0].layers.push({
        ...ALL_LAYERS.cadastre,
        opacity: 0.6,
      });
    }

    if (roads) {
      maps[0].layers.push(ALL_LAYERS.roads);
    }

    if (boundaries) {
      if (boundariesData) {
        maps[0].layers.push({
          ...ALL_LAYERS.boundaries,
          data: boundariesData,
        });
      } else {
        (typeof window !== 'undefined') && fetch(ALL_LAYERS.boundaries.url)
          .then(res => res.json())
          .then(data => this.setState({ boundariesData: data }));
      }
    }

    if (resultLayer) {
      maps[0].layers.push({
        geojson: true,
        data: resultLayer,
        style: {
          fillColor: 'transparent',
          interactive: false,
        },
      });
    }

    return maps;
  }

  geolocate () {
    typeof window !== 'undefined'
      && window.navigator
      && window.navigator.geolocation.getCurrentPosition(({ coords }) => {
        this.firstMap.setView([coords.latitude, coords.longitude], 17);
      });
  }

  updateHash () {
    const { selection: [, secondSelection] } = this.state;

    const compareWith = secondSelection;
    setHash(serializeViewport(this.viewport) + (compareWith ? `!${compareWith}` : ''));
  }

  zoomIn () {
    this.firstMap.zoomIn();
  }

  zoomOut () {
    this.firstMap.zoomOut();
  }

  toggleDlNotice (visible) {
    this.setState(prevState => ({
      dlNotice: typeof visible === 'boolean' ? visible : !prevState.dlNotice,
    }));
  }

  render () {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const { selection, roads, boundaries, cadastre, fullscreen, dlNotice } = this.state;

    const isValidPoi = res => (res.node.frontmatter.templateKey === 'poi' && res.node.frontmatter.lat && res.node.frontmatter.lng);

    const markers = posts.filter(el => isValidPoi(el)).map(({ node }) => ({
      position: [node.frontmatter.lat, node.frontmatter.lng],
      title: node.frontmatter.title,
      slug: node.fields.slug,
      icon: node.frontmatter.marker_type,
    }));

    const downloadModalText = () => ({
      __html: data.allMarkdownRemark.edges.filter(el => (el.node.frontmatter.id === 'picture-export'))[0].node.html,
    });

    const carouselHeaderContent = () => ({
      __html: data.allMarkdownRemark.edges.filter(el => (el.node.frontmatter.id === 'carousel'))[0].node.html,
    });

    /**
     * Sort markdown posts according order key.
     */
    posts.sort((a, b) => +a.node.frontmatter.order < +b.node.frontmatter.order);

    const canDownload = this.firstMap && this.firstMap.getZoom() > 13;

    return (
      <React.Fragment>
        {isLive && (
          <CustomModal
            isOpen={dlNotice}
            handleClose={() => this.setState({ dlNotice: false })}
          >
            <div className="t-md">
              <div dangerouslySetInnerHTML={downloadModalText()} />
              <ul className="download-links">
                {Boolean(canDownload) && (
                  <React.Fragment>
                    <li>
                      <a href={this.getWMSPictureUrl('geotiff')} target="_blank" rel="noopener noreferrer">
                        Télécharger l'image haute résolution GeoTIFF
                      </a>
                    </li>

                    <li>
                      <a href={this.getWMSPictureUrl('jpeg')} target="_blank" rel="noopener noreferrer">
                        Télécharger l'image haute résolution JPG
                      </a>
                    </li>
                  </React.Fragment>
                )}

                {!canDownload && (
                  <li>La zone sélectionnée est trop importante, merci de la réduire.</li>
                )}
              </ul>
            </div>
          </CustomModal>
        )}

        <MapMenu
          selection={selection}
          showMaps={this.showMaps}
          cadastre={cadastre}
          toggleCadastre={this.toggleCadastre}
          toggleDlNotice={() => this.toggleDlNotice()}
          handleResult={this.handleResult}
          initialSearch={this.initialSearch}
          placeName={this.placeName}
        />

        <div className={classnames('c-map-layout', { 'c-map-layout--fullscreen': fullscreen })}>
          <MapActions
            geolocate={this.geolocate}
            roads={roads}
            toggleRoads={this.toggleRoads}
            boundaries={boundaries}
            toggleBoundaries={this.toggleBoundaries}
            fullscreen={fullscreen}
            toggleFullscreen={this.toggleFullscreen}
            zoomIn={this.zoomIn}
            zoomOut={this.zoomOut}
          />

          <div className="c-map-layout__synced-map">
            <SyncedMaps
              maps={this.mapsFromSelection()}
              markers={markers}
              updateMapRef={ref => { this.firstMap = ref; }}
              mapsProps={{
                minZoom: 9,
                attributionControl: false,
                viewport: this.viewport,
                onViewportChanged: this.handleViewportChange,
                wakeMessage: 'Toucher ou survoler pour activer le zoom',
                sleepOpacity: 1,
              }}
            />
          </div>

          <div className="c-map-layout__attributions">
            Source: Département de Loire-Atlantique - <span role="img" aria-label="copyright">©</span> IGN - clichés 2016 cofinancés par le Fonds Européen de développement régional
          </div>
        </div>

        <CarouselPOI
          className="c-carousel"
          posts={posts}
          headerContent={carouselHeaderContent()}
        />
      </React.Fragment>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          excerpt(pruneLength: 400)
          html
          id
          fields {
            slug
          }
          frontmatter {
            id
            templateKey
            order

            iframe
            lat
            link
            lng
            marker_type
            media_type
            picture
            promote
            title
          }
        }
      }
    }
  }
`;
