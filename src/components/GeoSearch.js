import React, { Component } from 'react';
import classnames from 'classnames';

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
  constructor (props) {
    super(props);

    this.state = {
      value: '',
      isLoading: false,
      suggestions: [],
    };

    this.loadSuggestions = debounce(this.loadSuggestions, 500);

    if (props.initialSearch) {
      this.directSearch(props.initialSearch.split('=')[1]);
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionSelected = (event, selection) => {
    // const { suggestion, suggestionValue, suggestionIndex, sectionIndex, method } = selection;
    const { onSelect } = this.props;
    if (typeof onSelect === 'function') {
      onSelect(selection);
    }
  };

  getSuggestionValue = suggestion => suggestion.label;

  directSearch (value) {
    const lookup = buildJSONQuery(value, ['code_insee', 'type'], 'AND COMMUNE OR CANTON');

    fetch(`https://es.makina-corpus.net/cg44/address/_search?source=${lookup}`)
      .then(res => res.json())
      .then(data => {
        const suggestion = {
          suggestion: {
            label: 'noname',
            data: data.hits.hits[0],
          },
        };
        this.onSuggestionSelected(null, suggestion);
      });
  }

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
