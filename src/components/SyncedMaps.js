import React, { Component } from 'react';
import { navigateTo } from 'gatsby-link';

import { Map, TileLayer, WMSTileLayer, GeoJSON, Marker, Tooltip, ScaleControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.sync';
import 'leaflet-sleep';
import 'leaflet-minimap';
import 'leaflet-minimap/src/Control.MiniMap.css';

import 'leaflet/dist/leaflet.css';
import './SyncedMaps.scss';

import ALL_LAYERS from '../settings/layers';

import markerIcons from '../helpers/markerIcons';

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

    this.miniMap = new L.Control.MiniMap(
      new L.TileLayer(ALL_LAYERS.osm.url),
      {
        position: 'bottomleft',
        mapOptions: {
          sleep: false,
        },
      },
    );
  }

  componentDidMount () {
    this.bindMiniMap();
    syncMaps(this.mapRefs);
    if (typeof this.props.updateMapRef === 'function') {
      this.props.updateMapRef(this.mapRefs[0]);
    }
  }

  componentDidUpdate () {
    this.bindMiniMap();
    syncMaps(this.mapRefs);
    if (typeof this.props.updateMapRef === 'function') {
      this.props.updateMapRef(this.mapRefs[0]);
    }
  }

  componentWillUnmount () {
    unsyncMaps(this.mapRefs);
  }

  bindMiniMap () {
    if (this.miniMap) {
      this.miniMap.remove();

      if (this.mapRefs.length === 1) {
        this.miniMap.addTo(this.mapRefs[0]);
      }
    }
  }

  render () {
    unsyncMaps(this.mapRefs);
    this.mapRefs = [];

    const { maps, className, mapsProps, markers } = this.props;

    return (
      <div className={className}>
        {maps.filter(map => !!map).map((map, index) => (
          <Map
            key={JSON.stringify(map.layers && map.layers[0])}
            ref={ref => { ref && this.mapRefs.push(ref.leafletElement); }}
            {...mapsProps}
            zoomControl={false}
          >
            {map.layers && map.layers.map(layer => (
              <AutoLayer
                key={JSON.stringify(layer)}
                {...layer}
              />
            ))}
            {markers.map(({ position, title, slug, icon }) => (
              <Marker
                key={JSON.stringify(position)}
                position={position}
                icon={markerIcons[icon] || markerIcons.default}
                onClick={() => (slug && navigateTo(slug))}
              >
                {title && <Tooltip><span>{title}</span></Tooltip>}
              </Marker>
            ))}
            {index === 0 && <ScaleControl position="bottomright" imperial={false} />}
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
