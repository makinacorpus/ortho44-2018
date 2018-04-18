import React from 'react';
import Link from 'gatsby-link';
import SyncedMaps from '../components/SyncedMaps';

import { ALL_LAYERS, ORTHO_LAYERS_IDS } from '../settings/layers';

const mapFromLayer = layerSettings => (layerSettings ? { tileLayers: [{ ...layerSettings }] } : undefined);

export default class IndexPage extends React.Component {
  constructor () {
    super();

    this.state = {
      maps: [mapFromLayer(ALL_LAYERS[2012])],
    };

    this.handleLayerChange = this.handleLayerChange.bind(this);
  }

  showMaps (...IDs) {
    this.setState({
      maps: IDs.map(id => mapFromLayer(ALL_LAYERS[id]))
    });
  }

  handleLayerChange (event) {
    const value = ORTHO_LAYERS_IDS.indexOf(event.target.value) > 0 ? event.target.value : null;
    this.showMaps('2012', event.target.value);
  }

  render () {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const { maps } = this.state;

    return (
      <section className="section">
        <div className="container">

          <select onChange={this.handleLayerChange}>
            {['Aucun', ...ORTHO_LAYERS_IDS].map(layerID =>
              <option key={layerID} value={layerID}>{layerID}</option>
            )}
          </select>

          <ul>
            <li><button onClick={() => this.showMaps('1850')}>Cartes 1850</button></li>
            <li><button onClick={() => this.showMaps('1850')}>Cartes Cassini</button></li>
            <li><button onClick={() => this.showMaps('1850')}>Cadastre Napoléonien</button></li>
          </ul>

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
