import React, { Component } from 'react';
import classnames from 'classnames';

import Autosuggest from 'react-autosuggest';
import { debounce } from 'lodash';

import { getLabel } from '../helpers';

import './GeoSearch.scss';

const PLACES_URL = '/data/recherche/lieux.json';
const contourUrl = code => `/data/recherche/contours/${code}.json`;
const TYPE_RANK = { COMMUNE: 0, CANTON: 1, LIEUDIT: 2 };
const MAX_SUGGESTIONS = 10;

const renderSuggestion = suggestion => <span>{suggestion.label}</span>;

/** Words of a text, lowercased, without diacritics, ligatures spelled out (œ → oe). */
const toWords = text => text
  .toLowerCase()
  .replace(/œ/g, 'oe')
  .replace(/æ/g, 'ae')
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .split(/[^a-z0-9]+/)
  .filter(Boolean);

let placesPromise;

/** Loads the place list once (exported by scripts/export-recherche.py). */
const loadPlaces = () => {
  if (!placesPromise) {
    placesPromise = fetch(PLACES_URL)
      .then(res => res.json())
      .then(places => places.map(([nom, type, code, coordinates, commune]) => ({
        label: getLabel({ nom, type, commune }),
        type,
        code,
        coordinates,
        // A lieu-dit's commune is searchable, to tell homonyms apart.
        words: toWords(commune ? `${nom} ${commune}` : nom),
      })))
      .catch(error => {
        placesPromise = null;
        throw error;
      });
  }
  return placesPromise;
};

/** Places where each searched word starts a word of the name, communes first. */
const findPlaces = (places, value) => {
  const searched = toWords(value);
  if (!searched.length) {
    return [];
  }
  const matches = place => searched.every(word => place.words.some(w => w.startsWith(word)));
  return places
    .filter(matches)
    .sort((a, b) => (TYPE_RANK[a.type] - TYPE_RANK[b.type]) || (a.label.length - b.label.length))
    .slice(0, MAX_SUGGESTIONS);
};

/** GeoJSON geometry of a place: a point for a lieu-dit, else an outline fetched on demand. */
const loadGeometry = place => (place.coordinates
  ? Promise.resolve({ type: 'MultiPoint', coordinates: place.coordinates })
  : fetch(contourUrl(place.code)).then(res => res.json()));

class GeoSearch extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: '',
      isLoading: false,
      suggestions: [],
    };

    this.loadSuggestions = debounce(this.loadSuggestions, 200);

    if (props.initialSearch) {
      this.directSearch(props.initialSearch.split('=')[1]);
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    const { onSelect } = this.props;
    if (typeof onSelect !== 'function') {
      return;
    }
    loadGeometry(suggestion)
      .then(geometry => onSelect({ label: suggestion.label, geometry }))
      .catch(error => console.error('Place outline unavailable', error)); // eslint-disable-line no-console
  };

  getSuggestionValue = suggestion => suggestion.label;

  directSearch (code) {
    loadPlaces()
      .then(places => {
        const place = places.find(item => item.code === code);
        if (place) {
          this.onSuggestionSelected(null, { suggestion: place });
        }
      })
      .catch(error => console.error('Place list unavailable', error)); // eslint-disable-line no-console
  }

  loadSuggestions (value) {
    this.setState({
      isLoading: true,
    });

    loadPlaces()
      .then(places => this.setState({
        isLoading: false,
        suggestions: findPlaces(places, value),
      }))
      .catch(error => {
        console.error('Place list unavailable', error); // eslint-disable-line no-console
        this.setState({ isLoading: false });
      });
  }

  render () {
    const { value, suggestions, isLoading } = this.state;
    const { inputProps, className } = this.props;

    const customInputProps = {
      ...inputProps,
      value,
      onChange: this.onChange,
    };

    return (
      <div className={classnames(className, { loading: isLoading })}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={res => this.loadSuggestions(res.value)}
          onSuggestionsClearRequested={() => this.setState({ suggestions: [] })}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={customInputProps}
          highlightFirstSuggestion
        />
      </div>
    );
  }
}

export default GeoSearch;
