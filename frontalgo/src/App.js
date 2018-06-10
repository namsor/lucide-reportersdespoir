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
  // Author:Katia Barillot
  // Source:Le Marais Mood
  // Title:Journée du grand nettoyage
  // Year:2017
  // likelyGender:female
  // rankingGendered:0.9683116233525264
  // objectID:1476381941
  // URL:http://www.lemaraismood.fr/journee-grand-nettoyage/
  // Lieu:Le Marais
  // Content:Chaque jour dans les rues de Paris 3,5 millions de personnes se déplacent, forcément cela entraine une certaine quantité de saleté. 30 000 corbeilles de rues sont collectées et 234 tournées de ramassage d’ordures ménagères sont effectuées. C’est dire s’il y a à faire. C’est pourquoi tous les ans, fin septembre, pour sensibiliser les parisiens, la capitale organise la Journée du Grand Nettoyage. Le 30 septembre, coachés par les cantonniers, vous pourrez donner un coup de balai et enrayer la saleté qui a envahi nos rues. Car ces poubelles qui débordent, ces détritus jetés à même le sol font très mauvais effet dans l’une des villes les plus visitées au monde. Benjamin Djiane, l’Adjoint au Maire du 3ème arrondissement chargé de la démocratie locale, de la sécurité, de la prévention, de la propreté et de la prévention des nuisances nous explique par quelle action citoyenne des maraisiens vont redonner à nos rues une apparence impeccable.
  // MainPIC:http://www.lemaraismood.fr/wp-content/uploads/2017/09/DSC09154-960x500.jpg
  // Date:29/09/2017
  // genderScale:1
  // solutionRating:0.404385147012253
  // problemRating:0.4229664595374781
  // impactJournalismScore:0.9683116233525264


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
          {(this.state.isSearching) ? <RefinementList attribute="Year" /> : ''}
          {(this.state.isSearching) ? <RefinementList attribute="likelyGender" /> : ''}
          {(this.state.isSearching) ? <RefinementList attribute="Source" /> : ''}
          {(this.state.isSearching) ? <Hits hitComponent={Product}/> : ''}
        </InstantSearch>
      </div>
    );
  }
}

export default App;
