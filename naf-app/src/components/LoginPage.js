import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import Button from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { Redirect } from "react-router-dom";
import InsertCard from "../images/NAF_Icon_SlideCard.png";
import NAFLogo from "../images/NAF_Logo_Large.png";
import TAFLogo from "../images/TAF_Logo_Large.png";
import {TAF_SYMBOL} from '../constants';

const buttonStyle = {
  textTransform: 'none',
  fontSize: '18px',
  color: '#fff'
};

const loginButtonStyle = {
  textTransform: 'none',
  fontSize: '18px',
};


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    userid: state.auth.id,
    isAuthenticated: state.QuestionsOnAPage.isAuthenticated,
    loginFailed: state.auth.loginFailed

  };
}


class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      username: "",
      password: ""
    };
    this.togglePopup = this.togglePopup.bind(this);
    this.loginTrigger = this.loginTrigger.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }


  setUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  setPassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  togglePopup() {

    this.setState({
      open: !this.state.open
    });


  }

  loginTrigger() {
    this.props.loginUser(this.state.username, this.state.password);
  }

/*

        <Button
          label="OK"
          primary={true}
          labelStyle={loginButtonStyle}
          onClick={this.loginTrigger}
          data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Loading"

        />

*/
   render() {
    if(this.props.isAuthenticated){
      return (
      <Redirect to={`/instructionsPage`}>
      </Redirect>
      );
    }

    const buttons = [
      <Button label="CANCEL" primary={true} onClick={this.togglePopup} labelStyle={loginButtonStyle} />,
              <Button
          label="OK"
          primary={true}
          labelStyle={loginButtonStyle}
          onClick={this.loginTrigger}
        />
    ];

    return (
      <MuiThemeProvider>
        <div className="login-page">
          <div>
            <img className="app-logo" src={TAF_SYMBOL ? TAFLogo : NAFLogo} alt="AppLogo"/>
          </div>

          <div className="intro-instructions">
            This is the Navy Training Assessment Framework working prototype, which implements test delivery and reporting functionality for studying how to deploy future tests which may require more complex item types and/or statistical analysis. This prototype is unclassified and does not store FOUO data. Likewise, CAC access is currently not enabled. However, it should only be accessed by authorized users evaluating the system or participating in user studies. Data should not be stored on this system for permanent use and may be wiped at any time during prototype upgrades. If you have any feedback or problems, please email our support line at: TAFsupport@ict.usc.edu
          </div>

          <div className="outter-box" >
            <div className="card-instructions">
              <p className="header">CAC Users</p><br/>
              <p>This option is for CAC users with a computer configured for CAC use.</p>
              <img src={InsertCard} alt="InsertCard"/><br/>
              <p>Insert your CAC card to gain access<br/></p>
            </div>

            <div id="buttons" className="card-instructions">
              <p className="header">Non-CAC Users</p><br/>
              <p>This option is for users without a CAC Card<br/> or<br/> If your computer is not configured to read your CAC.</p>
              <div className="intro-buttons-div">
                <span className="intro-buttons">
                  <Button id="loginButton" onClick={this.togglePopup} label="Manual Login" labelStyle={buttonStyle}>
                  </Button>
                </span>
              </div>
            </div>
          </div>

          <div className="intro-buttons-div">
            <span className="intro-buttons">
              <Button id="demonstrationButton" label="Demonstration" labelStyle={buttonStyle}>
              </Button>
            </span>
            <span className="intro-buttons">
              <Button id="exitButton" label="Exit" labelStyle={buttonStyle}>
              </Button>
            </span>
          </div>

          <Dialog
            title="Non-CAC User Login"
            titleStyle = {{ fontFamily : 'Work Sans' }}
            actions={buttons}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >

            <TextField
              autoFocus
              margin="dense"
              id="name"
              floatingLabelText="User Name"
              type="text"
              onChange={this.setUsername}
              fullWidth
            />
            <TextField
              margin="dense"
              id="password"
              floatingLabelText="Password"
              type="password"
              onChange={this.setPassword}
              fullWidth
            />
            <p style={{color: 'red', font: 2}}>
              {this.props.loginFailed ?  "Incorrect username or password" : ""}
            </p>

          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
