import React from 'react';
import classnames from 'classnames';

import { navigateTo } from 'gatsby-link';

import { DEFAULT_BASE, COMPARE_WITH, ALL_LAYERS } from '../settings/layers';
import GeoSearch from './GeoSearch';

import { Box, Button, ButtonContextual, Icon } from './cd44';

import classes from './MapMenu.module.scss';

const MapMenu = ({
  showMaps,
  selection,
  toggleCadastre,
  toggleDlNotice,
  handleResult,
  initialSearch,
  placeName,
  cadastre,
}) => (
  <React.Fragment>
    <Box className={classes.searchBox}>
      <div className={classes.left}>
        <p>Rechercher</p>

        <GeoSearch
          className={classes.geoSearch}
          onSelect={handleResult}
          initialSearch={initialSearch}
          inputProps={{ placeholder: placeName }}
        />
      </div>
      <div className={classes.right}>
        <p>Comparer 2016 avec</p>

        <div className={classes.selectWrapper}>
          <select
            value={selection.join('-')}
            onChange={event => showMaps(...event.target.value.split('-'))}
            className={classes.select}
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
          <i className="icon icon-down" aria-hidden="true" />
        </div>
      </div>
    </Box>

    <Box className={classes.mapMenu}>
      <div className={classes.title}>
        Cartes historiques
      </div>

      <Button onClick={() => showMaps('1850')}>Cartes 1850</Button>
      <Button onClick={() => showMaps('cassini')}>Cartes Cassini</Button>
      <Button onClick={() => showMaps('napoleon')}>Cadastre Napoléonien</Button>

      <ButtonContextual
        className={classnames(classes.cadastre, { [classes.cadastreEnabled]: cadastre })}
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
