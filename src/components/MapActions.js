import React from 'react';
import classnames from 'classnames';
import Icon from './Icon';

import './MapActions.scss';


const MapActions = ({
  className,
  geolocate,
  roads,
  toggleRoads,
  boundaries,
  toggleBoundaries,
  fullscreen,
  toggleFullscreen,
  zoomIn,
  zoomOut,
}) => {
  const [displayRoadsAndBoundaries, setDisplayRoadsAndBoundaries] = React.useState(false);
  const handleMouseEnter = () => setDisplayRoadsAndBoundaries(true);
  const handleMouseLeave = () => setDisplayRoadsAndBoundaries(false);

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
        <button className={`${className}__button`} type="button" onClick={() => zoomIn()} title="Zoomer">
          <Icon name="zoom-in" />
          <span className="u-visually-hidden">Zoomer</span>
        </button>
      </li>
      <li className={`${className}__item`}>
        <button className={`${className}__button`} type="button" onClick={() => zoomOut()} title="Dézoomer">
          <Icon name="zoom-out" />
          <span className="u-visually-hidden">Dézoomer</span>
        </button>
      </li>
      <li className={`${className}__item`}>
        <button
          className={`${className}__button`}
          type="button"
          title="Afficher les limites départementales et routes"
          onMouseEnter={handleMouseEnter}
        >
          <Icon name="map" />
        </button>
        <ul
          className={classnames(`${className}__sub`, { 'is-expanded': displayRoadsAndBoundaries })}
          onMouseLeave={handleMouseLeave}
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
  );
};

export default MapActions;

