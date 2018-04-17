import React, { Component } from 'react';

import { Map, TileLayer } from 'react-leaflet';
import 'leaflet.sync';

import 'leaflet/dist/leaflet.css';

const DEFAULT_VIEWPORT = {
  center: [47.2254, -1.5487],
  zoom: 15,
};

class Maps extends Component {
  constructor (props) {
    super(props);
    this.state = {
      viewport: { ...DEFAULT_VIEWPORT },
    };
  }

  componentDidMount () {
    this.map.sync(this.map2);
    this.map2.sync(this.map);
  }


  render () {
    return (
      <div>

        <Map
          ref={ref => { this.map = ref && ref.leafletElement; }}
          viewport={this.state.viewport}
          // onViewportChanged={this.onViewportChanged}
          style={{ height: '250px' }}
        >
          <TileLayer url="https://dummyimage.test/wms.php?z={z}&x={x}&y={y}&text={z}-{x}-{y}" />
        </Map>

        <Map
          ref={ref => { this.map2 = ref && ref.leafletElement; }}
          viewport={this.state.viewport}
          // onViewportChanged={this.onViewportChanged}
          style={{ height: '250px' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </Map>

      </div>
    );
  }
}

export default Maps;