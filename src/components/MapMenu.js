import React, { Component } from 'react';

import { ORTHO_LAYERS_IDS } from '../settings/layers';

class MapMenu extends Component {
  render () {
    return (
      <div>
        <select value={this.props.selection.join('-')} onChange={event => this.props.showMaps(...event.target.value.split('-'))}>
          {['Aucun', ...ORTHO_LAYERS_IDS].map(layerID =>
            <option key={layerID} value={[2012, layerID].join('-')}>Compare with {layerID}</option>
          )}
        </select>

        <ul>
          <li><button onClick={() => this.props.showMaps('1850')}>Cartes 1850</button></li>
          <li><button onClick={() => this.props.showMaps('1850')}>Cartes Cassini</button></li>
          <li><button onClick={() => this.props.showMaps('1850')}>Cadastre Napoléonien</button></li>
        </ul>
      </div>
    );
  }
}

export default MapMenu;
