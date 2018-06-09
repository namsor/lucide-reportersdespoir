import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  RefinementList
} from 'react-instantsearch/dom';

function Search() {
  return (
    <div className="container">
      <SearchBox />
      <RefinementList attribute="category" />
      <Hits hitComponent={Product} />
    </div>
  );
}

function Product({ hit }) {
  return (
    <div style={{ marginTop: '10px' }}>
      <span className="hit-name">
        <Highlight attribute="name" hit={hit} />
      </span>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <InstantSearch
          appId="latency"
          apiKey="3d9875e51fbd20c7754e65422f7ce5e1"
          indexName="bestbuy"
        >
        <Search />
    </InstantSearch>
  yoyo
      </div>
    );
  }
}

export default App;
