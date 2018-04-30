import React from 'react';
import Link from 'gatsby-link';
import Icon from './Icon';

import './Footer.scss';

const Footer = () => (
  <footer role="contentinfo" className="u-site__footer c-footer">
    <div className="u-site__content c-footer__content">
      <ul className="c-footer__menu-list">
        <li className="c-footer__menu-item"><Link to="/" className="c-footer__menu-link">À propos</Link></li>
        <li className="c-footer__menu-item"><Link to="/" className="c-footer__menu-link">Mention légales</Link></li>
        <li className="c-footer__menu-item"><Link to="/" className="c-footer__menu-link">Contact</Link></li>
        <li className="c-footer__menu-item"><Link to="/" className="c-footer__menu-link">Utiliser les photos</Link></li>
        <li className="c-footer__menu-item"><Link to="/" className="c-footer__menu-link">Accéder au serveur WMS</Link></li>
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
      <div className="c-footer__footnote">
        <p>Un service du Département <a href="https://www.loire-atlantique.fr/">Loire-Atlantique</a></p>
      </div>
    </div>
  </footer>
);

export default Footer;
