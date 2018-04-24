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
      boundaries,
    } = this.state;

    let maps = selection.map(item => {
      return {
        layers: [
          ALL_LAYERS[item],
        ],
      };
    });

    if (roads) {
      maps[0].layers.push(ALL_LAYERS.roads);
    }

    if (boundaries) {
      maps[0].layers.push(ALL_LAYERS.boundaries);
    }

    return maps;
  }

  render () {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const { selection, roads, boundaries } = this.state;

    return (
      <section className="section">
        <div className="container">

          <MapMenu selection={selection} showMaps={this.showMaps} />

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

          <SyncedMaps maps={this.mapsFromSelection()} className="synced-maps" />

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
