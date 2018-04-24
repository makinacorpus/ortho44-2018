import React, { Component } from 'react';

import { DEFAULT_BASE, COMPARE_WITH, ALL_LAYERS } from '../settings/layers';

class MapMenu extends Component {
  render () {
    const { showMaps, selection } = this.props;
    return (
      <div>
        <select
          value={selection.join('-')}
          onChange={event => showMaps(...event.target.value.split('-'))}>
          <option>-</option>
          <option value={DEFAULT_BASE}>Aucun</option>
          {COMPARE_WITH.map(layerID => (
            <option
              key={layerID}
              value={[DEFAULT_BASE, layerID].join('-')}
            >{ALL_LAYERS[layerID].label || layerID}</option>
          ))}
        </select>

        <ul>
          <li><button onClick={() => showMaps('1850')}>Cartes 1850</button></li>
          <li><button onClick={() => showMaps('cassini')}>Cartes Cassini</button></li>
          <li><button onClick={() => showMaps('napoleon')}>Cadastre Napoléonien</button></li>
        </ul>
      </div>
    );
  }
}

export default MapMenu;
