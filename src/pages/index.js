import React from 'react';
import Link from 'gatsby-link';
import bbox from '@turf/bbox';
import { debounce, isEqual } from 'lodash';

import SyncedMaps from '../components/SyncedMaps';
import MapMenu from '../components/MapMenu';

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
    this.geolocate = this.geolocate.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.handleViewportChange = debounce(this.handleViewportChange.bind(this), 100);
  }

  showMaps (...IDs) {
    this.setState({
      selection: IDs,
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
        opacity: .6,
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

  render () {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const { selection, roads, boundaries, cadastre } = this.state;

    return (
      <section className="section">
        <div className="container">

          <MapMenu
            selection={selection}
            showMaps={this.showMaps}
            handleResult={this.handleResult}
            className="map-menu"
          />

          <ul>
            <li><label><input type="checkbox" checked={roads}      onChange={() => this.setState({roads: !roads})}           />roads</label></li>
            <li><label><input type="checkbox" checked={boundaries} onChange={() => this.setState({boundaries: !boundaries})} />boundaries</label></li>
            <li><label><input type="checkbox" checked={cadastre}   onChange={() => this.setState({cadastre: !cadastre})}     />cadastre</label></li>
            <li><button onClick={this.geolocate}>Geolocate</button></li>
          </ul>


          <SyncedMaps
            maps={this.mapsFromSelection()}
            className="synced-maps"
            updateMapRef={ref => { this.firstMap = ref; }}
            mapsProps={{
              minZoom: 9,
              attributionControl: false,
              viewport: this.viewport,
              onViewportChanged: this.handleViewportChange,
            }}
          />

          {posts
            .filter(post => post.node.frontmatter.templateKey === 'poi')
            .map(({ node: post }) => (
              <div key={post.id}>
                <Link to={post.fields.slug}>
                  {post.frontmatter.title}
                </Link>
                <p>{post.excerpt}</p>
                <pre>
                  {JSON.stringify(post, null, 2)}
                </pre>
              </div>
            ))}
        </div>
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
          }
        }
      }
    }
  }
`;
