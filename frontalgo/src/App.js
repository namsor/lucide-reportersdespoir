import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header';
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
      <a href={hit.URL} target='_blank'>
        <div className='hit-img'>
          <img src={(hit.MainPIC.includes('http', 0)) ?
          hit.MainPIC : '/placeholder/' + String(hello % 7 + 1) + ".jpg" }></img>
        </div>
        <div className='hit-title'>
        <span>{hit.Title}</span>
        </div>
      </a>
      <span className='hit-content'>
        <p>{hit.Content}</p>
      </span>
      <span className='hit-author'>
        <p>{hit.Author}</p>
      </span>
      <span className='hit-src'>
        <p>{hit.Source}</p>
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
      <Header />
        <InstantSearch
          appId="89X1HYV9FR"
          apiKey="50b8887a34b8f6c7420ffe27fbb855e2"
          indexName="reportersdespoirs"
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
