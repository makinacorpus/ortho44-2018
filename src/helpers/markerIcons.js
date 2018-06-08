import L from 'leaflet';

import markerUrl from '../img/marker-icon.png';
import markerShadowUrl from '../img/marker-shadow.png';
import markerRetinaUrl from '../img/marker-icon-2x.png';

const icons = {
  default: new L.Icon({
    ...L.Icon.Default.prototype.options,
    iconUrl: markerUrl,
    shadowUrl: markerShadowUrl,
    iconRetinaUrl: markerRetinaUrl,
  }),
};

export default icons;
