import React from 'react';
import Helmet from 'react-helmet';
import { HTMLContent } from '../components/Content';
import { getLocationHref } from '../helpers';

export const PoiPageTemplate = ({
  description,
  title,
  picture,
  helmet,
  link,
  iframe,
}) => (
  <section className="u-site__page">
    {helmet || ''}

    {iframe
      && <HTMLContent content={iframe} className="u-site__iframe" />}
    {!iframe
      && <img className="u-site__picture" src={picture} alt="" />}

    <h1 className="u-site__title">
      {title}
    </h1>

    <p className="u-site__excerpt">{description}</p>

    {link && (
      <p className="u-site__readmore">
        <a href={link} target="_blank" rel="noopener noreferrer">
          En savoir +
        </a>
      </p>
    )}
  </section>
);

const PoiPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <PoiPageTemplate
      {...post.frontmatter}
      helmet={(
        <Helmet>
          <html lang="fr" prefix="og: http://ogp.me/ns#" />
          <title>{post.frontmatter.title} | Point d'intérêt</title>
          <meta property="og:title" content={`${post.frontmatter.title} | Point d'intérêt`} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={getLocationHref()} />
        </Helmet>
      )}
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
        picture
        iframe
        link
      }
    }
  }
`;
