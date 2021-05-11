import React from 'react';
import Icon from './Icon';

const MapActions = ({
  geolocate,
  roads,
  toggleRoads,
  boundaries,
  toggleBoundaries,
  fullscreen,
  toggleFullscreen,
  zoomIn,
  zoomOut,
}) => (
  <React.Fragment>
    <button type="button" onClick={() => geolocate()} title="Géolocaliser">
      <Icon name="gps" />
      <span className="u-visually-hidden">Géolocaliser</span>
    </button>

    {fullscreen && (
      <button type="button" onClick={() => toggleFullscreen()} title="Enlever le plein écran">
        <Icon name="fullscreen-out" />
        <span className="u-visually-hidden">Enlever plein écran</span>
      </button>
    )}
    {!fullscreen && (
      <button type="button" onClick={() => toggleFullscreen()} title="Mettre en plein écran">
        <Icon name="fullscreen" />
        <span className="u-visually-hidden">Mettre en plein écran</span>
      </button>
    )}

    <button type="button" onClick={() => zoomIn()} title="Zoomer">
      <Icon name="zoom-in" />
      <span className="u-visually-hidden">Zoomer</span>
    </button>

    <button type="button" onClick={() => zoomOut()} title="Dézoomer">
      <Icon name="zoom-out" />
      <span className="u-visually-hidden">Dézoomer</span>
    </button>

    <button type="button" title="Afficher les limites départementales et routes">
      <Icon name="map" />
    </button>

    <ul>
      <li>
        <input id="__sub-boudaries" type="checkbox" checked={boundaries} onChange={() => toggleBoundaries()} />
        <label htmlFor="__sub-boudaries">Afficher les limites départementales</label>
      </li>
      <li>
        <input id="__sub-roads" type="checkbox" checked={roads} onChange={() => toggleRoads()} />
        <label htmlFor="__sub-roads">Afficher les rues</label>
      </li>
    </ul>
  </React.Fragment>
);

export default MapActions;
