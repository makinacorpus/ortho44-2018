import React from 'react';
import Link from 'gatsby-link';
import { getLocationHref } from '../helpers';

import logo from '../img/logo.svg';
import Icon from './Icon';

import './Header.scss';

export const getCurrentUrl = () =>
  encodeURIComponent(getLocationHref());

const Header = () => (
  <header role="banner" className="u-site__header c-header">
    <div className="u-site__content c-header__top-nav">
      <a className="c-header__top-nav-link" href="https://www.loire-atlantique.fr/">Département de Loire-Atlantique</a>
    </div>
    <div className="u-site__content c-header__banner">
      <figure className="c-header__logo">
        <Link to="/" rel="home" className="c-logo">
          <img className="c-logo__img" src={logo} alt="Vuduciel.loireatlantique.fr" />
        </Link>
      </figure>
      <ul className="c-header__action-list">
        <li className="c-header__action-item">
          <button className="c-header__action-button" type="button" onClick={() => typeof window !== 'undefined' && window.print()}>
            <span className="c-header__action-button-content">
              <span className="c-header__action-button-label">Imprimer</span>
              <Icon name="print" />
            </span>
          </button>
        </li>
        <li className="c-header__action-item c-header__action-item--share">
          <button className="c-header__action-button" type="button">
            <span className="c-header__action-button-content">
              <span className="c-header__action-button-label">Partager</span>
              <Icon name="share" />
            </span>
          </button>
          <ul className="c-header__share-list">
            <li className="c-header__share-item">
              <a className="c-header__share-link" href={`https://www.facebook.com/sharer.php?u=${getCurrentUrl()}`}>
                <Icon name="network-facebook" />
                Facebook
              </a>
            </li>
            <li className="c-header__share-item">
              <a className="c-header__share-link" href={`https://twitter.com/intent/tweet?url=${getCurrentUrl()}`}>
                <Icon name="network-twitter" />
                Twitter
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </header>
);

export default Header;
