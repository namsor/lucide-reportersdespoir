import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import Analytics from './Analytics';

import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App}></Route>
        <Route exact path='/analytics' component={Analytics}></Route>
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
