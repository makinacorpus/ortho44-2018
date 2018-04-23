import React from 'react';
import Link from 'gatsby-link';
import SyncedMaps from '../components/SyncedMaps';
import MapMenu from '../components/MapMenu';

import { ALL_LAYERS } from '../settings/layers';

const mapFromLayer = (layerSettings) => {
  if (!layerSettings) {
    return undefined;
  }

  const layers = [{ ...layerSettings }];

  return { tileLayers: layers };
};

export default class IndexPage extends React.Component {
  constructor () {
    super();

    this.state = {
      roads: false,
      maps: [mapFromLayer(ALL_LAYERS[2012])],
    };

    this.showMaps = this.showMaps.bind(this);
  }

  showMaps (...IDs) {
    this.setState({
      maps: IDs.map(id => mapFromLayer(ALL_LAYERS[id], this.state.roads))
    });
  }

  render () {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const { maps, roads } = this.state;

    return (
      <section className="section">
        <div className="container">

          <MapMenu showMaps={this.showMaps} />

          <input
            type="checkbox"
            checked={roads}
            onChange={() => this.setState({roads: !roads})}
          />

          <SyncedMaps maps={maps} className="synced-maps" />

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
