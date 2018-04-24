import React, { Component } from 'react';

import { ORTHO_LAYERS_IDS } from '../settings/layers';

class MapMenu extends Component {
  render () {
    const { showMaps, selection } = this.props;
    return (
      <div>
        <select value={selection.join('-')} onChange={event => showMaps(...event.target.value.split('-'))}>
          <option>------------</option>
          <option value="2012">2012 uniquement</option>
          {ORTHO_LAYERS_IDS.map(layerID =>
            <option key={layerID} value={[2012, layerID].join('-')}>Compare with {layerID}</option>
          )}
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
