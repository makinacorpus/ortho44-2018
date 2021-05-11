import React from 'react';
import { navigateTo } from 'gatsby-link';

import classes from './MapMenu.module.scss';

import { DEFAULT_BASE, COMPARE_WITH, ALL_LAYERS } from '../settings/layers';
import GeoSearch from './GeoSearch';

const MapMenu = ({
  showMaps,
  selection,
  toggleCadastre,
  toggleDlNotice,
  handleResult,
  initialSearch,
  placeName,
}) => (
  <React.Fragment>
    <div className={classes.searchPrimary}>
      <h2>Rechercher</h2>

      <GeoSearch
        onSelect={handleResult}
        initialSearch={initialSearch}
        inputProps={{ placeholder: placeName }}
      />

      <h2>Comparer avec</h2>

      <select
        id="c-map-menu__year"
        className="c-map-menu__select"
        value={selection.join('-')}
        onChange={event => showMaps(...event.target.value.split('-'))}
      >
        <option disabled>-</option>
        <option value={DEFAULT_BASE}>Aucun</option>
        {COMPARE_WITH.map(layerID => (
          <option
            key={layerID}
            value={[DEFAULT_BASE, layerID].join('-')}
          >{ALL_LAYERS[layerID].label || layerID}
          </option>
        ))}
      </select>
    </div>

    <div className={classes.searchSecondary}>
      Cartes historiques

      <button type="button" onClick={() => showMaps('1850')}>
        Cartes 1850
      </button>
      <button type="button" onClick={() => showMaps('cassini')}>
        Cartes Cassini
      </button>
      <button type="button" onClick={() => showMaps('napoleon')}>
        Cadastre Napoléonien
      </button>

      <button type="button" onClick={() => toggleCadastre()}>
        Cadastre
      </button>

      <button
        type="button"
        onClick={() => navigateTo('/serveur-wms')}
        title="Fonction permettant d'accéder au serveur WMS du site."
      >
        Flux WMS
      </button>

      <button
        type="button"
        onClick={toggleDlNotice}
        title="Fonction permettant de télécharger les images en haute résolution, avec leurs coordonnées."
      >
        Exporter l'image
      </button>
    </div>
  </React.Fragment>
);

export default MapMenu;
