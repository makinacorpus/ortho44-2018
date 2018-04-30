import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from './Icon';

import './MapMenu.scss';

import { DEFAULT_BASE, COMPARE_WITH, ALL_LAYERS } from '../settings/layers';
import GeoSearch from './GeoSearch';

class MapMenu extends Component {
  constructor () {
    super();

    this.state = {
      open: false,
    };
  }

  render () {
    const { showMaps, selection, className, handleResult } = this.props;
    const { open } = this.state;

    return (
      <div className={className}>

        <button
          className="c-map-menu__toggle" 
          aria-expanded={ open }
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
              inputProps={{
                placeholder: 'Ex : 3 quai Ceineray, Nantes',
              }}
            />
          </div>
          <div className="c-map-menu__col c-map-menu__col--even">
            <h2 className="c-map-menu__title">Comparer 2016</h2>
            <div className="c-map-menu__row">
              <label className="c-map-menu__label" htmlFor="c-map-menu__year">avec</label>
              <select
                id="c-map-menu__year"
                className="c-map-menu__select"
                value={selection.join('-')}
                onChange={event => showMaps(...event.target.value.split('-'))}>
                <option disabled>-</option>
                <option value={DEFAULT_BASE}>Aucun</option>
                {COMPARE_WITH.map(layerID => (
                  <option
                    key={layerID}
                    value={[DEFAULT_BASE, layerID].join('-')}
                  >{ALL_LAYERS[layerID].label || layerID}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="c-map-menu__col">
            <h2 className="c-map-menu__title">Cartes historiques</h2>
            <ul>
              <li>
                <button className={selection.includes('1850') ? 'c-map-menu__button c-map-menu__button--active' : 'c-map-menu__button'} onClick={() => showMaps('1850')}>
                  <Icon name="place" /> 
                  <span className="c-map-menu__button-label">Cartes 1850</span>
                </button>
              </li>
              <li>
                <button className={selection.includes('cassini') ? 'c-map-menu__button c-map-menu__button--active' : 'c-map-menu__button'} onClick={() => showMaps('cassini')}>
                  <Icon name="place" /> 
                  <span className="c-map-menu__button-label">Cartes Cassini</span>
                </button>
              </li>
              <li>
                <button className={selection.includes('napoleon') ? 'c-map-menu__button c-map-menu__button--active' : 'c-map-menu__button'} onClick={() => showMaps('napoleon')}>
                  <Icon name="place" /> 
                  <span className="c-map-menu__button-label">Cadastre Napoléonien</span>
                </button>
              </li>
            </ul>
          </div>
          <div className="c-map-menu__col c-map-menu__col--even c-map-menu__col--last">
            <h2 className="c-map-menu__title">Les plus</h2>
            <ul>
              <li>
                <button className="c-map-menu__button">
                  <Icon name="place" /> 
                  <span className="c-map-menu__button-label">Exporter l'image</span>
                </button>
              </li>
              <li>
                <button className="c-map-menu__button">
                  <Icon name="place" /> 
                  <span className="c-map-menu__button-label">Cadastre</span>
                </button>
              </li>
              <li>
                <button className="c-map-menu__button">
                  <Icon name="place" /> 
                  <span className="c-map-menu__button-label">Flux WMS</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        { open == true ? (
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
