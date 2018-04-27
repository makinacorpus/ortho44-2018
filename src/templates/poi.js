import React from 'react';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Content, { HTMLContent } from '../components/Content';

export const PoiPageTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section>
      {helmet || ''}
      <div>
        <h1>
          {title}
        </h1>
        <p>{description}</p>
        <PostContent content={content} />
        {tags && tags.length ? (
          <div style={{ marginTop: '4rem' }}>
            <h4>Tags</h4>
            <ul>
              {tags.map(tag => (
                <li key={`${tag}tag`}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
};

const PoiPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <PoiPageTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
    />
  );
};

export default PoiPage;

export const pageQuery = graphql`
  query PoiPageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
      }
    }
  }
`;
