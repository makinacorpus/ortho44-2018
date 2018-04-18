import React from 'react';
import Link from 'gatsby-link';
import SyncedMaps from '../components/SyncedMaps';

import ALL_LAYERS from '../settings/layers';

const mapFromLayer = layerSettings => ({ tileLayers: [{ ...layerSettings }] });

export default class IndexPage extends React.Component {
  constructor () {
    super();

    this.state = {
      maps: [mapFromLayer(ALL_LAYERS.default)],
    };
  }

  showMaps (...IDs) {
    this.setState({
      maps: IDs.map(id => mapFromLayer(ALL_LAYERS[id]))
    });
  }

  render () {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const { maps } = this.state;

    return (
      <section className="section">
        <div className="container">
          <ul>
            <li>
              <button onClick={() => this.showMaps('default')}>Show only default</button>
            </li>
            <li>
              <button onClick={() => this.showMaps('default', '1850')}>Compare with 1850</button>
              <button onClick={() => this.showMaps('1850')}>Show only 1850</button>
            </li>
            <li>
              <button onClick={() => this.showMaps('default', '1949')}>Compare with 1949</button>
              <button onClick={() => this.showMaps('1949')}>Show only 1949</button>
            </li>
            <li>
              <button onClick={() => this.showMaps('default', '1999')}>Compare with 1999</button>
              <button onClick={() => this.showMaps('1999')}>Show only 1999</button>
            </li>
            <li>
              <button onClick={() => this.showMaps('default', '2004')}>Compare with 2004</button>
              <button onClick={() => this.showMaps('2004')}>Show only 2004</button>
            </li>
            <li>
              <button onClick={() => this.showMaps('default', '2009')}>Compare with 2009</button>
              <button onClick={() => this.showMaps('2009')}>Show only 2009</button>
            </li>
            <li>
              <button onClick={() => this.showMaps('default', '2012')}>Compare with 2012</button>
              <button onClick={() => this.showMaps('2012')}>Show only 2012</button>
            </li>
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
