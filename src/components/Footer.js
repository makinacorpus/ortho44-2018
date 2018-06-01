import React from 'react';
import Link from "gatsby-link";

import logo from '../img/logo-loire-atlantique.svg';
import Icon from './Icon';

import './Footer.scss';

const Footer = props => (
  <footer role="contentinfo" className="u-site__footer c-footer">
    <div className="u-site__content c-footer__content">
      <ul className="c-footer__menu-list">
        <li className="c-footer__menu-item">
          <Link to="/a-propos" className="c-footer__menu-link">À propos</Link>
        </li>
        <li className="c-footer__menu-item">
          <Link to="/mentions-legales" className="c-footer__menu-link">Mention légales</Link>
        </li>
        <li className="c-footer__menu-item">
          <Link to="/contact" className="c-footer__menu-link">Contact</Link>
        </li>
        <li className="c-footer__menu-item">
          <Link to="/utiliser-les-photos" className="c-footer__menu-link">Utiliser les photos</Link>
        </li>
        <li className="c-footer__menu-item">
          <Link to="/serveur-wms" className="c-footer__menu-link">Accéder au serveur WMS</Link>
        </li>
      </ul>
      <div className="c-footer__socials">
        <p className="c-footer__socials-label">Suivez-nous</p>
        <ul className="c-footer__social-list">
          <li className="c-footer__social-item">
            <a href="https://www.facebook.com/loireatlantique" className="c-footer__social-link">
              <Icon name="network-facebook" />
              <span className="u-visually-hidden">Facebook</span>
            </a>
          </li>
          <li className="c-footer__social-item">
            <a href="https://twitter.com/loireatlantique" className="c-footer__social-link">
              <Icon name="network-twitter" />
              <span className="u-visually-hidden">Twitter</span>
            </a>
          </li>
          <li className="c-footer__social-item">
            <a href="http://loire-atlantique.tv" className="c-footer__social-link">
              <Icon name="network-youtube" />
              <span className="u-visually-hidden">Youtube</span>
            </a>
          </li>
        </ul>
      </div>
      <p className="c-footer__footnote">
        <span>Un service du Département </span><a href="https://www.loire-atlantique.fr/"><img className="c-footer__footnote-img" src={logo} alt="Loire-Atlantique" /></a>
      </p>
    </div>
  </footer>
);

export default Footer;
