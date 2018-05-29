import React from 'react';
import bbox from '@turf/bbox';
import { debounce, isEqual } from 'lodash';
import classnames from 'classnames';

import SyncedMaps from '../components/SyncedMaps';
import MapMenu from '../components/MapMenu';
import MapActions from '../components/MapActions';
import CarouselPOI from '../components/CarouselPOI';

import { DEFAULT_BASE, ALL_LAYERS } from '../settings/layers';

import { getRandomPlace, serializeViewport, unserializeViewport, setHash, getHash } from '../helpers';

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
    };

    [this.placeName, this.viewport] = getRandomPlace();

    const hash = getHash();
    if (hash) {
      const [viewportSerial, layer] = hash.split('!');
      if (ALL_LAYERS[layer]) {
        this.state.selection = [DEFAULT_BASE, layer];
      }
      this.viewport = unserializeViewport(viewportSerial) || this.viewport;
    }

    this.showMaps = this.showMaps.bind(this);
    this.toggleCadastre = this.toggleCadastre.bind(this);
    this.geolocate = this.geolocate.bind(this);
    this.toggleRoads = this.toggleRoads.bind(this);
    this.toggleBoundaries = this.toggleBoundaries.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.handleViewportChange = debounce(this.handleViewportChange.bind(this), 100);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
  }

  showMaps (...IDs) {
    this.setState({
      selection: IDs,
    });
  }

  toggleCadastre () {
    this.setState({
      cadastre: !this.state.cadastre,
    });
  }

  toggleRoads () {
    this.setState({
      roads: !this.state.roads,
    });
  }

  toggleBoundaries () {
    this.setState({
      boundaries: !this.state.boundaries,
    });
  }

  toggleFullscreen () {
    this.setState({
      fullscreen: !this.state.fullscreen,
    });
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
        }
      });
    }

    return maps;
  }

  handleResult (selection) {
    const geojson = {
      type: 'Feature',
      properties: {
        name: selection.suggestion.label,
      },
      geometry: selection.suggestion.data._source.geometry,
    };

    const [ minX, minY, maxX, maxY ] = bbox(geojson);

    this.setState({
      resultLayer: geojson,
    });

    this.firstMap
      && this.firstMap.fitBounds
      && this.firstMap.fitBounds([[minY, minX], [maxY, maxX]]);
  }

  geolocate () {
    typeof window !== 'undefined'
      && window.navigator
      && window.navigator.geolocation.getCurrentPosition(({ coords }) => {
        this.firstMap.setView([coords.latitude, coords.longitude], 17);
      });
  }

  handleViewportChange (viewport) {
    if (!isEqual(this.viewport, viewport)) {
      this.viewport = viewport;
      setHash(serializeViewport(viewport));
    }
  }

  zoomIn () {
    this.firstMap.zoomIn();
  }

  zoomOut () {
    this.firstMap.zoomOut();
  }

  render () {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const { selection, roads, boundaries, cadastre, fullscreen } = this.state;

    return (
      <section>

        <MapMenu
          selection={selection}
          showMaps={this.showMaps}
          cadastre={cadastre}
          toggleCadastre={this.toggleCadastre}
          handleResult={this.handleResult}
          className="c-map-menu"
        />

        <div className={classnames('c-map-layout', { 'c-map-layout--fullscreen': fullscreen })}>
          <div className="c-map-layout__actions">
            <MapActions
              className="c-map-actions"
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
          </div>
          <div className="c-map-layout__synced-map">
            <SyncedMaps
              maps={this.mapsFromSelection()}
              className="c-synced-maps"
              updateMapRef={ref => { this.firstMap = ref; }}
              mapsProps={{
                minZoom: 9,
                attributionControl: false,
                viewport: this.viewport,
                onViewportChanged: this.handleViewportChange,
              }}
            />
          </div>
        </div>

        <CarouselPOI
          posts={posts}
          className="c-carousel" 
        />


      </section>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            picture
          }
        }
      }
    }
  }
`;
