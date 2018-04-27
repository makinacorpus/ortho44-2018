import React from 'react';
import PropTypes from 'prop-types';
import Content, { HTMLContent } from '../components/Content';

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section>
      <h2>
        {title}
      </h2>
      <PageContent content={content} />
    </section>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <AboutPageTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      content={post.html}
    />
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
