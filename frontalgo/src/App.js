import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Link } from 'react-router-dom'

import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  RefinementList
} from 'react-instantsearch/dom';

import { connectSearchBox } from 'react-instantsearch/connectors';

const MySearchBox = ({currentRefinement, refine, setter}) => {
  return (
    <div className='ais-inputbox'>
      <input
      type="text"
      value={currentRefinement}
      onChange={e => {
        setter(e);
        refine(e.target.value)
        }}
      />
    </div>
  )
};
var hello = 0;
const ConnectedSearchBox = connectSearchBox(MySearchBox);

function Product({ hit }) {
  console.log(hit);
  hello++;
  return (
    <div>
      {/* <span className="hit-name">
        <Highlight attribute="name" hit={hit} />
      </span> */}
      <a href={hit.url} target='_blank'>
        <div className='hit-img'>
          <img src={(hit.main_pic.includes('http', 0)) ?
          hit.main_pic : '/placeholder/' + String(hello % 7 + 1) + ".jpg" }></img>
        </div>
        <div className='hit-title'>
        {/* <Highlight attribute="title" hit={hit} /> */}
        <span>{hit.title}</span>
        </div>
      </a>
      <span className='hit-content'>
        <p>{hit.content}</p>
      </span>
      <span className='hit-author'>
        <p>{hit.author}</p>
      </span>
      <span className='hit-src'>
        <p>{hit.source}</p>
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
          <h1 className="App-title">App</h1>
        </header>
        <button>
          <Link to='/analytics'>Analytic search</Link>
        </button>
        <InstantSearch
          appId="FT8DVN3K2H"
          apiKey="7f8130dd9dd898a6646c9eb80a968b60"
          indexName="corpus"

          // appId="latency"
          // apiKey="3d9875e51fbd20c7754e65422f7ce5e1"
          // indexName="bestbuy"
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
