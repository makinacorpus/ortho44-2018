import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { getLocationHref } from '../helpers';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/modal';
import './main.scss';

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
  getChildContext = () => {
    return {
      setPosts: posts => {
        this.posts = posts;
      },
    }
  }

  componentDidMount = () => {
    // Create references to html/body elements
    this.htmlElement = document.querySelector('html');
    this.bodyElement = document.querySelector('body');

    // Cache the window width.
    this.windowWidth = window.innerWidth;
  }

  componentWillReceiveProps = (nextProps) => {
    // if we're changing to a non-homepage page, put things in
    // a modal (unless we're on mobile).
    if (
      nextProps.location.pathname !== '/' &&
      this.windowWidth > 750
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
    const { location, data } = this.props;

    let isModal = false;
    if (
      this.props.location.pathname !== '/' &&
      this.windowWidth > 750
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
        </Helmet>
        <Header />
        <main role="main">
          <div>
            {isModal
              ? this.props.children({
                  ...this.props,
                  location: { pathname: '/' },
                })
              : this.props.children()}
          </div>

          <div>
            {isModal && (
              <Modal isOpen location={location}>
                {this.props.children}
              </Modal>
            )}
          </div>
        </main>
        <Footer />
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
