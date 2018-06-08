import L from 'leaflet';

import markerUrl from '../img/marker-icon.png';
import markerShadowUrl from '../img/marker-shadow.png';
import markerRetinaUrl from '../img/marker-icon-2x.png';

const inRealBrowser = typeof window !== 'undefined';

const colorIconsUrl = inRealBrowser && [
  'black',
  'blue',
  'green',
  'grey',
  'orange',
  'red',
  'violet',
  'yellow',
].reduce((acc, color) => ({
  ...acc,
  [color]: new L.Icon({
    ...L.Icon.Default.prototype.options,
    /* eslint-disable import/no-dynamic-require, global-require */
    iconUrl: require(`../img/marker-icon-${color}.png`),
    iconRetinaUrl: require(`../img/marker-icon-2x-${color}.png`),
    /* eslint-enable */
    shadowUrl: markerShadowUrl,
  }),
}), {});

const markerIcons = inRealBrowser && {
  default: new L.Icon({
    ...L.Icon.Default.prototype.options,
    iconUrl: markerUrl,
    shadowUrl: markerShadowUrl,
    iconRetinaUrl: markerRetinaUrl,
  }),
  ...colorIconsUrl,
};

export default markerIcons;
