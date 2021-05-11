import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { navigateTo } from 'gatsby-link';

import { getLocationHref } from '../helpers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Icons from '../components/Icons';
import CustomModal from '../components/CustomModal';
import './main.scss';

import favicon from '../img/favicon.ico';

export default class TemplateWrapper extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.func,
    data: PropTypes.shape({
      site: PropTypes.object,
    }),
  }

  static childContextTypes = {
    setPosts: PropTypes.func,
  }

  getChildContext = () => ({
    setPosts: posts => {
      this.posts = posts;
    },
  })

  componentDidMount = () => {
    // Create references to html/body elements
    this.htmlElement = document.querySelector('html');
    this.bodyElement = document.querySelector('body');

    // Cache the window width.
    this.windowWidth = window.innerWidth;
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps = nextProps => {
    // if we're changing to a non-homepage page, put things in
    // a modal (unless we're on mobile).
    if (
      nextProps.location.pathname !== '/'
      && this.windowWidth > 750
    ) {
      // Freeze the background from scrolling.
      this.htmlElement.style.overflow = 'hidden';
      this.bodyElement.style.overflow = 'hidden';

      // Always set overflow-y to scroll so the scrollbar stays visible avoiding
      // weird jumping.
      this.htmlElement.style.overflowY = 'scroll';
    } else {
      // Otherwise we're navigating back home so delete old home so the
      // modal can be destroyed.
      delete this.modalBackgroundChildren;
      this.htmlElement.style.overflow = 'visible';
      this.bodyElement.style.overflow = 'visible';

      // Always set overflow-y to scroll so the scrollbar stays visible avoiding
      // weird jumping.
      this.htmlElement.style.overflowY = 'scroll';
    }
  }

  render () {
    const { location, data, children } = this.props;

    let isModal = false;
    if (
      typeof window !== 'undefined'
      && location.pathname !== '/'
      && this.windowWidth > 750
    ) {
      isModal = true;
    }

    return (
      <div className="u-site">
        <Helmet>
          <html lang="fr" prefix="og: http://ogp.me/ns#" />
          <title>{data.site.siteMetadata.title}</title>
          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={getLocationHref()} />
          <link rel="shortcut icon" type="image/png" href={favicon} />

          <link rel="stylesheet" href="https://design.loire-atlantique.fr/css/cd44.css" />
          <link rel="stylesheet" href="https://design.loire-atlantique.fr/css/icons.css" />
        </Helmet>

        <Header />

        <main role="main" style={{ paddingTop: '1rem' }}>
          <div>
            {isModal
              ? children({ ...this.props, location: { pathname: '/' } })
              : children()}
          </div>

          <div>
            {isModal && (
              <CustomModal isOpen handleClose={() => navigateTo('/')}>
                {children({ location: { pathname: location.pathname } })}
              </CustomModal>
            )}
          </div>
        </main>

        <Footer />

        <Icons />
      </div>
    );
  }
}

export const query = graphql`
  query siteQuery {
    site {
      siteMetadata {
        title
      }
    }
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
            picture
          }
        }
      }
    }
  }
  `;
