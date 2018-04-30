import React from 'react';
import Link from 'gatsby-link';


const Footer = () => (
  <footer role="contentinfo" className="u-site__footer c-footer">
    <div className="u-site__content">
      <ul className="c-footer__menu-list">
        <li className="c-footer__menu-item"><Link to="/" className="c-footer__menu-link">À propos</Link></li>
        <li className="c-footer__menu-item"><Link to="/" className="c-footer__menu-link">Mention légales</Link></li>
        <li className="c-footer__menu-item"><Link to="/" className="c-footer__menu-link">Contact</Link></li>
        <li className="c-footer__menu-item"><Link to="/" className="c-footer__menu-link">Utiliser les photos</Link></li>
        <li className="c-footer__menu-item"><Link to="/" className="c-footer__menu-link">Accéder au serveur WMS</Link></li>
      </ul>
      <div className="c-footer__socials">
        <p>Suivez-nous</p>
        <ul className="c-footer__social-list">
          <li className="c-footer__social-item"><Link to="/" className="c-footer__social-link">Facebook</Link></li>
          <li className="c-footer__social-item"><Link to="/" className="c-footer__social-link">Twitter</Link></li>
          <li className="c-footer__social-item"><Link to="/" className="c-footer__social-link">Youtube</Link></li>
        </ul>
      </div>
      <div className="c-footer__footnote">
        <p>Un service du département <a href="https://www.loire-atlantique.fr/">Loire-Atlantique</a></p>
      </div>
    </div>
  </footer>
);

export default Footer;
