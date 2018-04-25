import React, { Component } from 'react';

import Autosuggest from 'react-autosuggest';
import { debounce } from 'lodash';

import { parseSuggestions } from '../helpers';

import './GeoSearch.scss';

const renderSuggestion = (suggestion, { isHighlighted }) => {
  return (
    <span>{suggestion.label}</span>
  );
};

class GeoSearch extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };

    this.loadSuggestions = debounce(this.loadSuggestions, 500);
  }


  loadSuggestions(value) {
    this.setState({
      isLoading: true,
    });

    const nameLookup = JSON.stringify({
      query: {
        query_string: {
          fields: ['nom', 'type'],
          query: `${value} AND COMMUNE`,
          default_operator: 'AND',
        },
      },
    });

    fetch(`https://es.makina-corpus.net/cg44/address/_search?source=${nameLookup}`)
      .then(res => res.json())
      .then(data => {
        if (data.hits.total === 0) {
          fetch(`https://es.makina-corpus.net/cg44/address/_search?default_operator=AND&q=${value}`)
            .then(res => res.json())
            .then(data => {
              this.setState({
                isLoading: false,
                suggestions: parseSuggestions(data.hits.hits),
              });
            })
        } else {
          this.setState({
            isLoading: false,
            suggestions: parseSuggestions(data.hits.hits),
          });
        }
      });
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  getSuggestionValue = suggestion => {
    return suggestion.label;
  };

  onSuggestionSelected = (event, selection) => {
    // const { suggestion, suggestionValue, suggestionIndex, sectionIndex, method } = selection;
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(selection);
    }
  };

  render() {
    const { value, suggestions, isLoading } = this.state;
    const inputProps = {
      ...this.props.inputProps,
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={({ value }) => this.loadSuggestions(value)}
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
