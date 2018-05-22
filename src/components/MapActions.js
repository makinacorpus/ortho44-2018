import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from './Icon';

import './MapActions.scss';


class MapActions extends Component {
  constructor () {
    super();

    this.state = {
      displayRoadsAndBoundaries: false,
    };
  }

  onMouseEnter = () => {
    this.setState({ displayRoadsAndBoundaries: true });
  }

  onMouseLeave = () => {
    this.setState({ displayRoadsAndBoundaries: false });
  }

  render() {
    const { className, geolocate, roads, toggleRoads, boundaries, toggleBoundaries, fullscreen, toggleFullscreen } = this.props;
    const { displayRoadsAndBoundaries } = this.state;
    return (
      <ul className={className}>
        <li className={`${className}__item`}>
          <button className={`${className}__button`} type="button" onClick={() => geolocate()} title="Géolocaliser">
            <Icon name="gps" />
            <span className="u-visually-hidden">Géolocaliser</span>
          </button>
        </li>
        
        <li className={`${className}__item`}>
          { fullscreen ? (
            <button className={`${className}__button`} type="button" onClick={() => toggleFullscreen()} title="Enlever le plein écran">
              <Icon name="fullscreen-out" />
              <span className="u-visually-hidden">Enlever plein écran</span>
            </button>
          ) : (
            <button className={`${className}__button`} type="button" onClick={() => toggleFullscreen()} title="Mettre en plein écran">
              <Icon name="fullscreen" />
              <span className="u-visually-hidden">Mettre en plein écran</span>
            </button>
          )}
        </li>
        <li className={`${className}__item`}>
          <button className={`${className}__button`} type="button" title="Zoomer">
            <Icon name="zoom-in" />
            <span className="u-visually-hidden">Zoomer</span>
          </button>
        </li>
        <li className={`${className}__item`}>
          <button className={`${className}__button`} type="button" title="Dézoomer">
            <Icon name="zoom-out" />
            <span className="u-visually-hidden">Dézoomer</span>
          </button>
        </li>
        <li className={`${className}__item`}>
          <button
            className={`${className}__button`}
            type="button"
            title="Afficher les limites départementales et routes"
            onMouseEnter={this.onMouseEnter}
          >
            <Icon name="map" />
          </button>
          <ul
            className={classnames(`${className}__sub`, { 'is-expanded': displayRoadsAndBoundaries })}
            onMouseLeave={this.onMouseLeave}
          >
            <li className={`${className}__sub-item`}>
              <input id={`${className}__sub-boudaries`} className={`${className}__sub-input`} type="checkbox" checked={boundaries} onChange={() => toggleBoundaries()} />
              <label htmlFor={`${className}__sub-boudaries`} className={`${className}__sub-label`}>Afficher les limites départementales</label>
            </li>
            <li className={`${className}__sub-item`}>
              <input id={`${className}__sub-roads`} className={`${className}__sub-input`} type="checkbox" checked={roads} onChange={() => toggleRoads()} />
              <label htmlFor={`${className}__sub-roads`} className={`${className}__sub-label`}>Afficher les rues</label>
            </li>
          </ul>
        </li>
      </ul>
    )
  }
};

export default MapActions;

