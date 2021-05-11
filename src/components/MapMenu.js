import React from 'react';
import { navigateTo } from 'gatsby-link';

import { DEFAULT_BASE, COMPARE_WITH, ALL_LAYERS } from '../settings/layers';
import GeoSearch from './GeoSearch';

import { Box, Button, ButtonContextual, Icon } from './cd44';

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
    <Box>
      <p>Rechercher</p>

      <GeoSearch
        onSelect={handleResult}
        initialSearch={initialSearch}
        inputProps={{ placeholder: placeName }}
      />

      <p>Comparer avec</p>

      <select
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
    </Box>

    <Box>
      Cartes historiques

      <Button onClick={() => showMaps('1850')}>Cartes 1850</Button>
      <Button onClick={() => showMaps('cassini')}>Cartes Cassini</Button>
      <Button onClick={() => showMaps('napoleon')}>Cadastre Napoléonien</Button>

      <ButtonContextual
        iconBefore={<Icon type="map" />}
        iconAfter={false}
        onClick={() => toggleCadastre()}
      >
        Cadastre
      </ButtonContextual>

      <ButtonContextual
        iconBefore={<Icon type="flux" />}
        iconAfter={false}
        onClick={() => navigateTo('/serveur-wms')}
        title="Fonction permettant d'accéder au serveur WMS du site."
      >
        Flux WMS
      </ButtonContextual>

      <ButtonContextual
        iconBefore={<Icon type="file" />}
        iconAfter={false}
        onClick={toggleDlNotice}
        title="Fonction permettant de télécharger les images en haute résolution, avec leurs coordonnées."
      >
        Exporter l'image
      </ButtonContextual>
    </Box>
  </React.Fragment>
);

export default MapMenu;
