import React from 'react';
import Helmet from 'react-helmet';
import Content, { HTMLContent } from '../components/Content';

export const PoiPageTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="u-site__content">
      {helmet || ''}
      <h1 className="u-site__title">
        {title}
      </h1>
      <p className="u-site__excerpt">{description}</p>
      <PageContent className="t-md" content={content} />
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
      helmet={<Helmet title={`${post.frontmatter.title} | Point d'intérêt`} />}
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
