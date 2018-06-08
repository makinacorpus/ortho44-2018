import React, { Component } from 'react';

import Autosuggest from 'react-autosuggest';
import { debounce } from 'lodash';

import { parseSuggestions } from '../helpers';

import './GeoSearch.scss';

const renderSuggestion = suggestion => <span>{suggestion.label}</span>;

const buildJSONQuery = (
  value,
  fields = ['nom', 'type'],
  querySuffix = 'AND COMMUNE',
) => JSON.stringify({
  query: {
    query_string: {
      fields,
      query: `${value} ${querySuffix}`,
      default_operator: 'AND',
    },
  },
});

class GeoSearch extends Component {
  constructor () {
    super();

    this.state = {
      value: '',
      isLoading: false,
      suggestions: [],
    };

    this.loadSuggestions = debounce(this.loadSuggestions, 500);
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionSelected = (event, selection) => {
    // const { suggestion, suggestionValue, suggestionIndex, sectionIndex, method } = selection;
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(selection);
    }
  };

  getSuggestionValue = suggestion => suggestion.label;

  loadSuggestions (value) {
    this.setState({
      isLoading: true,
    });

    const nameLookup = buildJSONQuery(value);

    fetch(`https://es.makina-corpus.net/cg44/address/_search?source=${nameLookup}`)
      .then(res => res.json())
      .then(data => {
        if (data.hits.total === 0) {
          fetch(`https://es.makina-corpus.net/cg44/address/_search?default_operator=AND&q=${value}`)
            .then(res => res.json())
            .then(data2 => {
              this.setState({
                isLoading: false,
                suggestions: parseSuggestions(data2.hits.hits),
              });
            });
        } else {
          this.setState({
            isLoading: false,
            suggestions: parseSuggestions(data.hits.hits),
          });
        }
      });
  }

  render () {
    const { value, suggestions } = this.state;
    const inputProps = {
      ...this.props.inputProps,
      value,
      onChange: this.onChange,
    };

    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={({ val }) => this.loadSuggestions(val)}
          onSuggestionsClearRequested={() => this.setState({ suggestions: [] })}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          highlightFirstSuggestion
        />
      </div>
    );
  }
}

export default GeoSearch;
