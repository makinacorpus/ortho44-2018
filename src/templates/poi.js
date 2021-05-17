import React from 'react';
import Helmet from 'react-helmet';
import { ButtonInverted } from '../components/cd44';
import { HTMLContent } from '../components/Content';
import { getLocationHref } from '../helpers';

import classes from './poi.module.scss';

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

    <h2>{title}</h2>

    {iframe
      && <HTMLContent content={iframe} className="u-site__iframe" />}

    {!iframe
      && <img className="u-site__picture" src={picture} alt="" />}

    <p className="u-site__excerpt">
      {description}

      {link && (
        <div>
          <ButtonInverted
            component="a"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.readmore}
          >
            En savoir plus
          </ButtonInverted>
        </div>
      )}
    </p>

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
