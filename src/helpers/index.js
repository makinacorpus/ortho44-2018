const roundShift = (num, precision, reverseShift) => {
  const prec = reverseShift ? -precision : precision;
  const numArray = `${num}`.split('e');
  return +(`${numArray[0]}e${(numArray[1] ? (+numArray[1] + prec) : prec)}`);
};

export const round = (number, precision) =>
  roundShift(Math.round(roundShift(number, precision, false)), precision, true);

export const getLabel = (hit, mode) => {
  let label = '';
  if (hit.nom) {
    label += hit.nom;

    if (hit.type === 'LIEUDIT') {
      label += ' (Lieu-dit)';
      label += hit.commune ? ` ${hit.commune}` : '';
    }
  } else {
    label += (mode === 'POPUP' && hit.numero) ? `${hit.numero} ` : '';
    label += hit.nom_voie ? `${hit.nom_voie} - ` : '';
    label += hit.nom_ld ? `${hit.nom_ld}, ` : '';
    label += `(${hit.commune ? hit.commune : ''})`;
  }
  return label;
};

export const parseSuggestions = hits => {
  return hits.map(hit => ({
    label: getLabel(hit._source, 'LISTING'),
    data: hit,
  }));
};

export const getRandomPlace = () => {
  const places = [
    ['Le Terril, Abbaretz', { center: [47.56142, -1.54120], zoom: 18 }],
    ['La Bôle de Merquel, Mesquer', { center: [47.4179, -2.4539], zoom: 16 }],
    ['La Brière, Saint-Joachim', { center: [47.3734, -2.2223], zoom: 16 }],
    ['Marais de Lyarne, Les Moutiers-en-Retz', { center: [47.04490, -1.97523], zoom: 17 }],
    ['Château de Clisson et Domaine de la Garenne Lemot, Clisson', { center: [47.08590, -1.27772], zoom: 18 }],
    ['Estuaire de la Loire', { center: [47.2907, -1.9411], zoom: 15 }],
    ['Château, Châteaubriant', { center: [47.71958, -1.37327], zoom: 18 }],
    ['La Loire, Ancenis', { center: [47.3705, -1.0800], zoom: 16 }],
    ['Le Pont de Saint-Nazaire', { center: [47.2789, -2.1653], zoom: 14 }],
    ['Lac de Vioreau, Joué-sur-Erdre', { center: [47.5232, -1.4230], zoom: 15 }],
  ];

  return places[Math.floor(Math.random() * places.length)];
};

export const serializeViewport = ({ center: [lat, lng], zoom }) => [zoom, round(lat, 5), round(lng, 5)].join('/');

export const unserializeViewport = (serial = '') => {
  const [zoom, latitude, longitude] = serial.split('/').map(value => +value);
  const sum = zoom + latitude + longitude;
  if (typeof sum === 'number' && !Number.isNaN(sum)) {
    return { zoom, center: [latitude, longitude] };
  }
  return false;
};

export const setHash = value => {
  typeof window !== 'undefined'
    && window.location
    && (window.location.hash = value);
};

export const getHash = () => typeof window !== 'undefined' && window.location && window.location.hash.substr(1);
