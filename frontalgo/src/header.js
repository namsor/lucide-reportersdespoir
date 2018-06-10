import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component {
  render () {
    return (
      <div className='MyHeader'>
        <header className="App-header">
          <h1 className="App-title">App</h1>
        </header>
        <button>
          <Link to='/analytics'>Analytic search</Link>
        </button>
      </div>
    )
  }
}

export default Header;
