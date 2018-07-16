import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import configureStore from './store/configureStore'
import './styles/index.css';
import InstructionsPage from './components/InstructionsPage';
import App from './components/App';
import LoginPage from './components/LoginPage';
import ReviewTestPage from './components/ReviewTestPage';
import registerServiceWorker from './utils/registerServiceWorker';

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
          <ProtectedRoute exact path="/instructionsPage" component={InstructionsPage} />
          <ProtectedRoute exact path="/reviewTestPage" component={ReviewTestPage} />
          <ProtectedRoute exact path="/testPage" component={App} />
          <ProtectedRoute exact path ="/testResultPage" component={() => window.location.href = `http://usc-taf-student-reporting.s3-website-us-west-1.amazonaws.com`} />


          <Route path="/" component={LoginPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
