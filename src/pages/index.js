import React from 'react';
import Link from 'gatsby-link';
import SyncedMaps from '../components/SyncedMaps';
import MapMenu from '../components/MapMenu';

import { DEFAULT_BASE, ALL_LAYERS } from '../settings/layers';

export default class IndexPage extends React.Component {
  constructor () {
    super();

    this.state = {
      selection: [DEFAULT_BASE],
      roads: false,
      boundaries: true,
      boundariesData: null,
      cadastre: false,
    };

    this.showMaps = this.showMaps.bind(this);
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
      boundaries,
      boundariesData,
    } = this.state;

    let maps = selection.map(item => {
      return {
        layers: [
          ALL_LAYERS[item],
        ],
      };
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

    return maps;
  }

  render () {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const { selection, roads, boundaries, cadastre } = this.state;

    return (
      <section className="section">
        <div className="container">

          <MapMenu selection={selection} showMaps={this.showMaps} className="map-menu" />

          <label><input
            type="checkbox"
            checked={roads}
            onChange={() => this.setState({roads: !roads})}
          />roads</label>
          <label><input
            type="checkbox"
            checked={boundaries}
            onChange={() => this.setState({boundaries: !boundaries})}
          />boundaries</label>
          <label><input
            type="checkbox"
            checked={cadastre}
            onChange={() => this.setState({cadastre: !cadastre})}
          />cadastre</label>

          <SyncedMaps
            maps={this.mapsFromSelection()}
            viewport={{ center: [47.2254, -1.5487], zoom: 15 }}
            className="synced-maps"
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
