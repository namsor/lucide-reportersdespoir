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

const ConnectedSearchBox = connectSearchBox(MySearchBox);

function Product({ hit }) {
  console.log(hit);
  return (
    <div style={{ marginTop: '10px' }}>
      {/* <span className="hit-name">
        <Highlight attribute="name" hit={hit} />
      </span> */}
      <a href={hit.url} target='_blank'>
        <span className='hit-img'>
          <img src={(hit.main_pic.includes('http', 0)) ? hit.main_pic : 'https://images-na.ssl-images-amazon.com/images/I/513ni1h94wL._SX331_BO1,204,203,200_.jpg'}></img>
        </span>
        <span className='hit-title'>
        {/* <Highlight attribute="title" hit={hit} /> */}
          <h1>{hit.title}</h1>
        </span>
        <span className='hit-content'>
          <p>{hit.content}</p>
        </span>
        <span className='hit-author'>
          <p>{hit.author}</p>
        </span>
        <span className='hit-src'>
          <p>{hit.source}</p>
        </span>
      </a>
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
