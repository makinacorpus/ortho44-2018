import React from 'react';
import Link from 'gatsby-link';
import { getLocationHref } from '../helpers';
import './Footer.scss';

export const getCurrentUrl = () =>
  encodeURIComponent(getLocationHref());

const Footer = () => (
  <footer>
    <p>Partager cette page :</p>
    <a href={`https://www.facebook.com/sharer.php?u=${getCurrentUrl()}`}>Facebook</a>
    <a href={`https://twitter.com/intent/tweet?url=${getCurrentUrl()}`}>Twitter</a>

    <p>Suivez-nous sur les réseaux sociaux</p>
    <a href="https://www.facebook.com/loireatlantique">Facebook</a>
    <a href="https://twitter.com/loireatlantique">Twitter</a>
    <a href="http://loire-atlantique.tv">Youtube</a>

    <Link to="/a-propos">À propos</Link>
    <Link to="/mentions-legales">Mention légales</Link>
    <Link to="/contact">Contact</Link>
    <Link to="/utiliser-les-photos">Utiliser les photos</Link>
    <Link to="/serveur-wms">Accéder au serveur WMS</Link>

    <img src="https://api-adserver.adikteev.com/api/track.gif?tag=1724" alt="" style={{ visibility: 'hidden' }} />
  </footer>
);

export default Footer;
