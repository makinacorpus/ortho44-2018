import React from 'react';
import Link from 'gatsby-link';

import logo from '../img/logo.svg';
import Icon from './Icon';

import './Header.scss';

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
          <button className="c-header__action-button" type="button">
            <span className="c-header__action-button-label">Imprimer</span>
            <Icon name="print" />
          </button>
        </li>
        <li className="c-header__action-item">
          <button className="c-header__action-button" type="button">
            <span className="c-header__action-button-label">Partager</span>
            <Icon name="share" />
          </button>
        </li>
      </ul>
    </div>
  </header>
);

export default Header;
