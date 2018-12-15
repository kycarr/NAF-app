import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import configureStore from './store/configureStore'
import './styles/index.css';
import App from './components/App';
import Cmi5AssignableUnit from './components/Cmi5AssignableUnit';
import registerServiceWorker from './utils/registerServiceWorker';
// import Cmi5 from './utils/cmi5.js';
import 'babel-polyfill';
import CmiQuestion from './components/CmiQuestion';

const store = configureStore();

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props
    return (
      <Route
        {...props}
        render={props => (
          store.getState().QuestionsOnAPage.isAuthenticated ?
            <Component {...props} /> :
            <Redirect to='/' />
        )}
      />
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={CmiQuestion} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
