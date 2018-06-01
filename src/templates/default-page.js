import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Content, { HTMLContent } from '../components/Content';
import { getLocationHref } from '../helpers';

export const DefaultPageTemplate = ({
  title,
  content,
  contentComponent,
  helmet,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="u-site__page">
      {helmet || ''}
      <h2 className="u-site__title">
        {title}
      </h2>
      <PageContent className="t-md" content={content} />
    </section>
  );
};

DefaultPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const DefaultPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <DefaultPageTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      helmet={
        <Helmet>
          <html lang="fr" prefix="og: http://ogp.me/ns#" />
          <title>{post.frontmatter.title} | La Loire-Atlantique vue du ciel</title>
          <meta property="og:title" content={`${post.frontmatter.title} | La Loire-Atlantique vue du ciel`} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={getLocationHref()} />
        </Helmet>
      }
      content={post.html}
    />
  );
};

DefaultPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DefaultPage;

export const defaultPageQuery = graphql`
  query DefaultPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
