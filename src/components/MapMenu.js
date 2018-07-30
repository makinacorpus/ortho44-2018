import React, { Component } from 'react';
import classnames from 'classnames';
import { navigateTo } from 'gatsby-link';
import Icon from './Icon';

import './MapMenu.scss';

import { DEFAULT_BASE, COMPARE_WITH, ALL_LAYERS } from '../settings/layers';
import GeoSearch from './GeoSearch';

const buttonClasses = active => classnames('c-map-menu__button', { 'c-map-menu__button--active': active });

class MapMenu extends Component {
  constructor () {
    super();

    this.state = {
      open: true,
    };
  }

  render () {
    const {
      showMaps,
      selection,
      toggleCadastre,
      toggleDlNotice,
      cadastre,
      className,
      handleResult,
      initialSearch,
      placeName,
    } = this.props;
    const { open } = this.state;

    const displayPrintSelection = selection.length === 1 ? `Carte ${selection[0]} ${cadastre ? 'avec affichage du cadastre' : ''}` : `À gauche: carte ${selection[0]} ${cadastre ? 'avec affichage du cadastre' : ''}; À droite: carte ${selection[1]}`;

    return (
      <div className={className} data-print-selection={displayPrintSelection}>
        <button
          className="c-map-menu__toggle"
          aria-expanded={open}
          aria-controls="c-map-menu__collapsable"
          onClick={() => this.setState({ open: !this.state.open })}
        >
          <Icon name="menu" />
          <span className="u-visually-hidden">{ open ? 'Fermer' : 'Ouvrir' }</span>
        </button>

        <div id="c-map-menu__collapsable" className={classnames('c-map-menu__collapsable', { open })}>
          <div className="c-map-menu__col c-map-menu__col--first">
            <h2 className="c-map-menu__title">Rechercher</h2>
            <GeoSearch
              onSelect={handleResult}
              initialSearch={initialSearch}
              inputProps={{
                placeholder: placeName,
              }}
            />
          </div>
          <div className="c-map-menu__col c-map-menu__col--even">
            <h2 className="c-map-menu__title">Comparer 2016</h2>
            <div className="c-map-menu__row">
              <label className="c-map-menu__label" htmlFor="c-map-menu__year">avec</label>
              <div className="c-map-menu__select-container">
                <select
                  id="c-map-menu__year"
                  className="c-map-menu__select"
                  value={selection.join('-')}
                  onChange={event => showMaps(...event.target.value.split('-'))}
                >
                  <option disabled>-</option>
                  <option value={DEFAULT_BASE}>Aucun</option>
                  {COMPARE_WITH.map(layerID => (
                    <option
                      key={layerID}
                      value={[DEFAULT_BASE, layerID].join('-')}
                    >{ALL_LAYERS[layerID].label || layerID}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="c-map-menu__col">
            <h2 className="c-map-menu__title">Cartes historiques</h2>
            <ul>
              <li>
                <button className={buttonClasses(selection[0] === '1850')} onClick={() => showMaps('1850')}>
                  <span className="c-map-menu__button-content">
                    <Icon name="place-1850" />
                    <span className="c-map-menu__button-label">Cartes 1850</span>
                  </span>
                </button>
              </li>
              <li>
                <button className={buttonClasses(selection[0] === 'cassini')} onClick={() => showMaps('cassini')}>
                  <span className="c-map-menu__button-content">
                    <Icon name="place-cassini" />
                    <span className="c-map-menu__button-label">Cartes Cassini</span>
                  </span>
                </button>
              </li>
              <li>
                <button className={buttonClasses(selection[0] === 'napoleon')} onClick={() => showMaps('napoleon')}>
                  <span className="c-map-menu__button-content">
                    <Icon name="place-napoleon" />
                    <span className="c-map-menu__button-label">Cadastre Napoléonien</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
          <div className="c-map-menu__col c-map-menu__col--even c-map-menu__col--last">
            <h2 className="c-map-menu__title">Les plus</h2>
            <ul>
              <li>
                <button
                  className="c-map-menu__button"
                  onClick={toggleDlNotice}
                  title="Fonction permettant de télécharger les images en haute résolution, avec leurs coordonnées."
                >
                  <span className="c-map-menu__button-content">
                    <Icon name="export" />
                    <span className="c-map-menu__button-label">Exporter l'image</span>
                  </span>
                </button>
              </li>
              <li>
                <button className={buttonClasses(cadastre)} onClick={() => toggleCadastre()}>
                  <span className="c-map-menu__button-content">
                    <Icon name="cadastre" />
                    <span className="c-map-menu__button-label">Cadastre</span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  className="c-map-menu__button"
                  onClick={() => navigateTo('/serveur-wms')}
                  title="Fonction permettant d'accéder au serveur WMS du site."
                >
                  <span className="c-map-menu__button-content">
                    <Icon name="flux" />
                    <span className="c-map-menu__button-label">Flux WMS</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        { open ? (
          <div>
            <button
              className="c-map-menu__close"
              onClick={() => this.setState({ open: false })}
            >
              <Icon name="arrow-top" />
              <span className="u-visually-hidden">Fermer</span>
            </button>
            <button
              className="c-map-menu__close c-map-menu__close--right"
              onClick={() => this.setState({ open: false })}
            >
              <Icon name="arrow-top" />
              <span className="u-visually-hidden">Fermer</span>
            </button>
          </div>
        ) : null }
      </div>
    );
  }
}

export default MapMenu;
