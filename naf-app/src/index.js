import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import reducers from './reducers';
import {createStore} from 'redux';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import './styles/index.css';
import InstructionsPage from './components/InstructionsPage';
import App from './components/App';
import LoginPage from './components/LoginPage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/instructionsPage" component={InstructionsPage}/>
          <Route path="/testPage" component={App}/>
          <Route path="/" component={LoginPage}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
