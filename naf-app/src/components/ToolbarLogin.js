import React, {Component} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import {Link} from "react-router-dom";
import FlatButton from 'material-ui/FlatButton';
import {resetToDefaultState} from '../actions/index';
import {connect} from 'react-redux';

// import FlatButton from 'material-ui/FlatButton';
// import {Link} from "react-router-dom";

import '../styles/App.css';
// import eye from '../images/NAF_Icon_EyeOn.png';
// import imgBookmarkOff from '../images/NAF_Icon_BookmarkOff.png';
import TAF_Logo_Small from '../images/TAF_Logo_Small.png';
import NAF_Logo_Small from '../images/NAF_Logo_Small.png';
import NAF_Icon_User from '../images/NAF_Icon_User.png';
import {TAF_SYMBOL} from '../constants';

import MediaQuery from 'react-responsive';


class ToolbarLoginComponent extends Component {


	render() {
		return (
			<MuiThemeProvider>
  			<Toolbar className="toolbar">

  				<ToolbarGroup>
            <MediaQuery minDeviceWidth={768} >
  					     <img className="app-logo-small" src={TAF_SYMBOL ? TAF_Logo_Small : NAF_Logo_Small} alt="app_Logo" />
            </MediaQuery >
  					<div style = {{marginLeft: '20px'}} className="toolbar-text">
  						Rate : FC
  					</div>
  				</ToolbarGroup>

  				<ToolbarGroup>
  					<div className="toolbar-text">
  						{this.props.name}
  					</div>
  					<img className="icon-user" src={NAF_Icon_User} alt="NAF_Logo" />
  					<Link to={`/`}>
  				    	<FlatButton className="logout-button" label="Log out" labelStyle={{padding: '0px'}} onClick={this.props.resetToDefaultState}/>
  				    </Link>
  				</ToolbarGroup>
  			</Toolbar>
			</MuiThemeProvider>
		)
	}

}

export default connect(null, {resetToDefaultState})(ToolbarLoginComponent);
