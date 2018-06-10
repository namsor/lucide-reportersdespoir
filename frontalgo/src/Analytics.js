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

import { connectSearchBox, createConnector, connectStateResults } from 'react-instantsearch/connectors';

import _ from 'lodash';
import { HorizontalBar, Pie } from 'react-chartjs-2';

function Search() {
  return (
    <div>
      <SearchBox searchAsYouType={false}/>
    </div>
  );
}

function Product({ hit }) {
  return (
    <div style={{ marginTop: '10px' }}>
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

var Content = connectStateResults(
  ({ searchState, searchResults, setter }) => {
    var dataset = [];
    var legend = [];
    var datasource = {};

    if (searchState.query) {
      var hits = searchResults.hits;
      var test = _.keyBy(hits, 'Source');
      _.forEach(test, (item, key) => {
        var i = 0;
        _.forEach(hits, hit => {
          if (key === hit.Source) {
            test[key] = i++;
          }
        })
        dataset.push(test[key]);
        legend.push(key);
      })
      datasource = {
        labels: legend,
        datasets: [
          {
            label: 'Total',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            data: dataset
          }
        ]
      }
      var options = {
        legend: {
          display: false,
        },
      };

      var dataset2 = [];
      legend = [];
      var datalieu = {};
      test = _.keyBy(hits, 'Lieu');
      _.forEach(test, (item, key) => {
        var i = 0;
        _.forEach(hits, hit => {
          if (key === hit.Lieu) {
            test[key] = i++;
          }
        })
        if (test[key] > 0) {
          dataset2.push(test[key]);
          legend.push(key + ' - ' + test[key]);
        }
      })
      datalieu = {
        labels: legend,
        datasets: [
          {
            data: dataset2,
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
          }
        ]
      }
      console.log(datalieu)
      return (
        <div className='charts'>
          <div className='source'>
            <HorizontalBar data={datasource} options={options}/>
          </div>
          <div className='lieu'>
            <Pie data={datalieu} />
          </div>
        </div>
      )
    } else {
      return ''
    }
  }
);

class App extends Component {

  state = {
    results: false
  }

  setter = (event) => {
    this.setState({results: true})
    console.log(this.state)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <button>
          <Link to='/' > Articles search</Link>
        </button>
        <InstantSearch
          appId="89X1HYV9FR"
          apiKey="50b8887a34b8f6c7420ffe27fbb855e2"
          indexName="reportersdespoirs"
        >
          <Search />
          <Content />
        </InstantSearch>
      </div>
    );
  }
}

export default App;
