import React from 'react';
import Link from 'gatsby-link';
import SyncedMaps from '../components/SyncedMaps';

export default class IndexPage extends React.Component {
  constructor () {
    super();
    this.addLayer = this.addLayer.bind(this);
    this.state = {
      maps: [
        {
          tileLayers: [
            {
              url: 'https://dummyimage.test/wms.php?z={z}&x={x}&y={y}&text={z}-{x}-{y}',
            },
          ],
        },
        {
          tileLayers: [
            {
              url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            },
          ],
        },
      ],
    };
  }

  addLayer () {
    this.setState({
      maps: [
        ...this.state.maps,
        {
          tileLayers: [
            {
              url: 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
            },
          ],
        },
      ],
    });
  }

  render () {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const { maps } = this.state;

    return (
      <section className="section">
        <div className="container">
          <button onClick={this.addLayer}>addLayer</button>
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
