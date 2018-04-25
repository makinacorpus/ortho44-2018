export const _getLabel = (hit, mode) => {
  var label = '';
  if (hit.nom) {
    label = hit.nom;
    if (hit.type && hit.type == 'LIEUDIT') {
      label += ' (Lieu-dit)'
      if (hit.commune) {
        label += ` (${hit.commune})`;
      }
    } else {
      label = `(${label})`;
    }
  } else {
    label = (mode == 'POPUP' && hit.numero ? hit.numero + ' ' : '') + (hit.nom_voie ? hit.nom_voie + ' - ' : '') + (hit.nom_ld ? hit.nom_ld + ', ' : '') + '(' + (hit.commune ? hit.commune : '') + ')';
  }
  return label;
};

export const parseSuggestions = hits => {
  return hits.map(hit => ({
    label: _getLabel(hit._source, 'LISTING'),
    data: hit,
  }));
};
