import React, { Component } from 'react';
import classnames from 'classnames';

import { DEFAULT_BASE, COMPARE_WITH, ALL_LAYERS } from '../settings/layers';
import GeoSearch from './GeoSearch';

class MapMenu extends Component {
  constructor () {
    super();

    this.state = {
      open: true,
    };
  }

  render () {
    const { showMaps, selection, className, handleResult } = this.props;
    const { open } = this.state;

    return (
      <div className={className}>

        <button
          className="collapse-toggle"
          onClick={() => this.setState({ open: !this.state.open })}
        >
          Toggle menu
        </button>

        <div className={classnames('collapsable', { open })}>
          <GeoSearch
            onSelect={handleResult}
            inputProps={{
              placeholder: 'exemple : 3 quai Ceineray, Nantes',
            }}
          />

          <select
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

          <ul>
            <li><button onClick={() => showMaps('1850')}>Cartes 1850</button></li>
            <li><button onClick={() => showMaps('cassini')}>Cartes Cassini</button></li>
            <li><button onClick={() => showMaps('napoleon')}>Cadastre Napoléonien</button></li>
          </ul>
        </div>

      </div>
    );
  }
}

export default MapMenu;
