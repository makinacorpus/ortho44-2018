import React from 'react';
import Link from 'gatsby-link';

import { getLocationHref } from '../helpers';

import classes from './Footer.module.scss';
import Icon from './cd44/Icon';

export const getCurrentUrl = () =>
  encodeURIComponent(getLocationHref());

const Footer = () => {
  const currentUrl = encodeURIComponent(getLocationHref());

  return (
    <React.Fragment>
      <section className="ds44-partage ds44-flex-container ds44-flex-align-center pal">
        <h2 className="h4-like" id="idPartageRS">Partagez cette page :</h2>
        <ul className="ds44-list ds44-flex-container ds44-flex-align-center ds44-fse">
          <li>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
              className="ds44-rsLink"
              title="Partager cette page sur Facebook - nouvelle fenêtre"
              target="_blank"
              rel="noreferrer"
            >
              <i className="icon icon-facebook icon--sizeL" aria-hidden="true" /><span className="visually-hidden">Partager cette page sur Facebook</span>
            </a>
          </li>
          <li>
            <a
              href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
              className="ds44-rsLink"
              title="Partager cette page sur Twitter - nouvelle fenêtre"
              target="_blank"
              rel="noreferrer"
            >
              <i className="icon icon-twitter icon--sizeL" aria-hidden="true" /><span className="visually-hidden">Partager cette page sur Twitter</span>
            </a>
          </li>
          <li>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&source=Loire-Atlantique&url=${currentUrl}`}
              className="ds44-rsLink"
              title="Partager cette page sur Linkedin - nouvelle fenêtre"
              target="_blank"
              rel="noreferrer"
            >
              <i className="icon icon-linkedin icon--sizeL" aria-hidden="true" /><span className="visually-hidden">Partager cette page sur Linkedin</span>
            </a>
          </li>
        </ul>
      </section>
      <footer className={classes.footer}>
        <div className={classes.follow}>
          <a href="https://www.loire-atlantique.fr/" className={classes.logoLink}>
            <img src="/img/logo-loire-atlantique.svg" alt="La Loire-atlantique" className={classes.logo} />
          </a>

          <div className={classes.followCenter}>

            <p role="heading" aria-level="2" className="h4-like mbs txtcenter" id="idTitreFooter2">
              Suivez-nous sur les réseaux sociaux :
            </p>

            <ul className="ds44-list ds44-flex-container ds44-flex-align-center">
              <li>
                <a
                  href="https://www.facebook.com/loireatlantique"
                  target="_blank"
                  className="ds44-rsFootLink"
                  title="Le Département de Loire-Atlantique sur Facebook - nouvelle fenêtre"
                  rel="noreferrer"
                >
                  <i className="icon icon-facebook" aria-hidden="true" />
                  <span className="visually-hidden">Le Département de Loire-Atlantique sur Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/loireatlantique"
                  target="_blank"
                  className="ds44-rsFootLink"
                  title="Le Département de Loire-Atlantique sur Twitter - nouvelle fenêtre"
                  rel="noreferrer"
                >
                  <i className="icon icon-twitter" aria-hidden="true" />
                  <span className="visually-hidden">Le Département de Loire-Atlantique sur Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/loireatlantique/"
                  target="_blank"
                  className="ds44-rsFootLink"
                  title="Le Département de Loire-Atlantique sur Instagram - nouvelle fenêtre"
                  rel="noreferrer"
                >
                  <i className="icon icon-instagram" aria-hidden="true" />
                  <span className="visually-hidden">Le Département de Loire-Atlantique sur Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/user/LoireAtlantiqueTV"
                  target="_blank"
                  className="ds44-rsFootLink"
                  title="Le Département de Loire-Atlantique sur Youtube - nouvelle fenêtre"
                  rel="noreferrer"
                >
                  <i className="icon icon-youtube" aria-hidden="true" />
                  <span className="visually-hidden">Le Département de Loire-Atlantique sur Youtube</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.loire-atlantique.fr/magweb"
                  target="_blank"
                  className="ds44-rsFootLink"
                  title="Le Département de Loire-Atlantique sur Mag Web - nouvelle fenêtre"
                  rel="noreferrer"
                >
                  <i className="icon icon-magweb" aria-hidden="true" />
                  <span className="visually-hidden">Le Département de Loire-Atlantique sur Magweb</span>
                </a>
              </li>
            </ul>
          </div>

          <button
            type="button"
            className={classes.up}
            onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }}
          >
            <Icon type="arrow-up" /><br />
            haut de<br />page
          </button>
        </div>

        <nav className={classes.nav}>
          <Link to="/contact">Nous écrire</Link>
          <Link to="/mentions-legales">Mention légales</Link>
          <Link to="/a-propos">À propos</Link>
          <Link to="/utiliser-les-photos">Utiliser les photos</Link>
          <Link to="/serveur-wms">Accéder au serveur WMS</Link>
          <Link
            to="#"
            onClick={() => {
              window
              && window.orejimeInstance
              && window.orejimeInstance.show
              && window.orejimeInstance.show();
            }}
          >
            Cookies
          </Link>
        </nav>

        <img src="https://api-adserver.adikteev.com/api/track.gif?tag=1724" alt="" style={{ visibility: 'hidden' }} />
      </footer>
    </React.Fragment>
  );
};

export default Footer;
