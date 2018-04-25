import React, { Component } from 'react';

import { Map, TileLayer, WMSTileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet.sync';

import 'leaflet/dist/leaflet.css';
import './SyncedMaps.scss';

const DEFAULT_VIEWPORT = {
  center: [46.453, 2.153],
  zoom: 6,
};

const SYNC_OPTIONS = {
  syncCursor: true,
};

const syncMaps = maps => {
  maps.forEach(map => map.invalidateSize(false));

  maps.forEach(mapA =>
    maps.forEach(mapB => {
      if (mapA !== mapB && !mapA.isSynced(mapB)) {
        mapA.sync(mapB, SYNC_OPTIONS);
      }
    }));
};

const unsyncMaps = maps => {
  maps.forEach(mapA =>
    maps.forEach(mapB => {
      if (mapA !== mapB && mapA.isSynced(mapB)) {
        mapA.unsync(mapB);
      }
    }));
};

const AutoLayer = props => {
  let Layer = TileLayer;

  if (props.wms) {
    Layer = WMSTileLayer;
  }

  if (props.geojson) {
    Layer = GeoJSON;
  }

  return <Layer {...props} />;
};

class SyncedMaps extends Component {
  constructor (props) {
    super(props);
    this.mapRefs = [];

    this.viewport = props.viewport || DEFAULT_VIEWPORT;
  }

  componentDidMount () {
    syncMaps(this.mapRefs);
    if (typeof this.props.updateMapRef === 'function') {
      this.props.updateMapRef(this.mapRefs[0]);
    }
  }

  componentDidUpdate () {
    syncMaps(this.mapRefs);
    if (typeof this.props.updateMapRef === 'function') {
      this.props.updateMapRef(this.mapRefs[0]);
    }
  }

  componentWillUnmount () {
    unsyncMaps(this.mapRefs);
  }

  render () {
    unsyncMaps(this.mapRefs);
    this.mapRefs = [];

    const { maps, className } = this.props;

    return (
      <div className={className}>
        {maps.filter(map => !!map).map(map => (
          <Map
            key={JSON.stringify(map.layers && map.layers[0])}
            ref={ref => { ref && this.mapRefs.push(ref.leafletElement); }}
            viewport={this.viewport}
            attributionControl={false}
          >
            {map.layers && map.layers.map(layer => (
              <AutoLayer
                key={JSON.stringify(layer)}
                {...layer}
              />
            ))}
          </Map>
        ))}
      </div>
    );
  }
}

/**
 * Avoid calling SyncedMap component on html pre-rendering
 */
const SyncedMapsWrapper = props => (typeof window !== 'undefined' ? <SyncedMaps {...props} /> : null);

export default SyncedMapsWrapper;
