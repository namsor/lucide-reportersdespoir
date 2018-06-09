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

import {connectSearchBox} from 'react-instantsearch/connectors';

const MySearchBox = ({currentRefinement, refine, setter}) =>
<input
  type="text"
  value={currentRefinement}
  onChange={e => {
    setter(e);
    refine(e.target.value)
    }}
/>;

const ConnectedSearchBox = connectSearchBox(MySearchBox);

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

  state = {
    isSearching: ''
  }

  setter = (event) => {
    this.setState({isSearching: event.target.value})
    console.log('state coming')
    console.log(this.state.isSearching);
  }

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
        <ConnectedSearchBox setter={this.setter} />
        {(this.state.isSearching) ? <RefinementList attribute="category" /> : ''}
        {(this.state.isSearching) ? <Hits hitComponent={Product}/> : ''}
    </InstantSearch>
      </div>
    );
  }
}

export default App;
