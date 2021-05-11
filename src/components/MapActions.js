import React from 'react';

import { IconButton } from './cd44';

import classes from './MapActions.module.scss';

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
  <div className={classes.root}>
    <IconButton
      type="fullscreen"
      onClick={() => toggleFullscreen()}
      title={fullscreen ? 'Enlever plein écran' : 'Mettre en plein écran'}
    /><br />
    <IconButton
      type="plus"
      onClick={() => zoomIn()}
      title="Zoomer"
    /><br />
    <IconButton
      type="minus"
      onClick={() => zoomOut()}
      title="Dézoomer"
    /><br />
    <IconButton
      type="position"
      onClick={() => geolocate()}
      title="Géolocaliser"
    /><br />

    <div className={classes.toggles}>
      <div className={classes.cbWrapper}>
        <label>
          Afficher les limites départementales
          <input
            type="checkbox"
            checked={boundaries}
            onChange={() => toggleBoundaries()}
            className={classes.cb}
          />
        </label><br />
        <label>
          Afficher les rues
          <input
            type="checkbox"
            onChange={() => toggleRoads()}
            checked={roads}
            className={classes.cb}
          />
        </label>
      </div>

      <IconButton
        className={classes.togglesButton}
        type="map"
        title="Afficher les limites départementales et routes"
      />
    </div>
  </div>
);

export default MapActions;
