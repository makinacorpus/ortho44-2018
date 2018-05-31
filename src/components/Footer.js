import React from 'react';
import Modal from './Modal';

import logo from '../img/logo-loire-atlantique.svg';
import Icon from './Icon';

import './Footer.scss';

const Footer = props => (
  <footer role="contentinfo" className="u-site__footer c-footer">
    <div className="u-site__content c-footer__content">
      <ul className="c-footer__menu-list">
        <li className="c-footer__menu-item">
          <Modal
            query={props.query}
            to="/a-propos"
            link={{
              className: 'c-footer__menu-link',
              label: 'À propos',
            }}
          />
        </li>
        <li className="c-footer__menu-item">
          <Modal
            query={props.query}
            to="/mentions-legales"
            link={{
              className: 'c-footer__menu-link',
              label: 'Mention légales',
            }}
          />
        </li>
        <li className="c-footer__menu-item">
          <Modal
            query={props.query}
            to="/contact"
            link={{
              className: 'c-footer__menu-link',
              label: 'Contact',
            }}
          />
        </li>
        <li className="c-footer__menu-item">
          <Modal
            query={props.query}
            to="/utiliser-les-photos"
            link={{
              className: 'c-footer__menu-link',
              label: 'Utiliser les photos',
            }}
          />
        </li>
        <li className="c-footer__menu-item">
          <Modal
            query={props.query}
            to="/serveur-wms"
            link={{
              className: 'c-footer__menu-link',
              label: 'Accéder au serveur WMS',
            }}
          />
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
