import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/Header';
import Footer from '../components/Footer';
import './main.scss';

const TemplateWrapper = ({ children }) => (
  <div className="u-site">
    <Helmet title="Home | Gatsby + Netlify CMS" />
    <Header />
    <main role="main">{children()}</main>
    <Footer />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
