import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { getLocationHref } from '../helpers';

import Header from '../components/Header';
import Footer from '../components/Footer';
import './main.scss';

const TemplateWrapper = ({ data, children }) => (
  <div className="u-site">
    <Helmet>
      <html lang="fr" prefix="og: http://ogp.me/ns#" />
      <title>{data.site.siteMetadata.title}</title>
      <meta property="og:title" content={data.site.siteMetadata.title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={getLocationHref()} />
    </Helmet>
    <Header />
    <main role="main">{children()}</main>
    <Footer />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
  `;
