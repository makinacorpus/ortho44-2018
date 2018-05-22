import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from './Icon';

import './MapActions.scss';

const MapActions = props => {
  const { className, geolocate, roads, toggleRoads, boundaries, toggleBoundaries } = props;
  return (
    <ul className={className}>
      <li className={`${className}__item`}>
        <button type="button" onClick={() => geolocate()}>Geolocate</button>
      </li>
      <li className={`${className}__item`}>
        <label><input type="checkbox" checked={roads} onChange={() => toggleRoads()} />roads</label>
      </li>
      <li className={`${className}__item`}>
        <label><input type="checkbox" checked={boundaries} onChange={() => toggleBoundaries()} />boundaries</label>
      </li>
    </ul>
  );
};

export default MapActions;

