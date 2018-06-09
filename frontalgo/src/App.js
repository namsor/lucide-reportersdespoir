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

// const refine = (e) => {
//   console.log(e)
// }

function Search({setter, isSearching}) {
  return (
    <div className="container">
      {/* <ConnectedSearchBox setter={setter}/> */}
      {/* <MySearchBox /> */}
      {/* <RefinementList attribute="category" /> */}
      <Hits hitComponent={Product}/>
      {/* <RefinementList attribute="category" />
      <Hits hitComponent={Product} /> */}
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
// const ConnectedSearchBox = connectSearchBox(MySearchBox);

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
        {/* <RefinementList attribute="category" /> */}
        {(this.state.isSearching) ? <RefinementList attribute="category" /> : 'hello'}
        {(this.state.isSearching) ? <Hits hitComponent={Product}/> : 'hello'}
        {/* <Search /> */}
        {/* <ConnectedSearchBox /> */}
        {/* {(!this.state.isSearching) ? 'hello' : <Search setter={this.setter}/>} */}
    </InstantSearch>
      </div>
    );
  }
}

export default App;
