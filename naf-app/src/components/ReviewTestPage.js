import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import {Link} from "react-router-dom";

import '../styles/App.css';
import ToolbarLoginComponent from './ToolbarLogin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const buttonStyle = {
  textTransform: 'none',
  fontSize: '18px'
};

class ReviewTestPage extends Component {
    render() {
        return (
            <div className="ReviewTestPage">
                <MuiThemeProvider>
                    <div>
                        <ToolbarLoginComponent firstname={this.props.firstname} lastname={this.props.lastname}/>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        	<div className="reviewtest-box">
                                <p className="reviewtest-text">
                                    <span style ={{fontSize:'24px', textAlign:'center'}}>Test Finished</span>
                                </p>
				              	<p className="dialog-text-center" align="center">
						          You can now either go to review your test result or go back to home page.<br /><br />
						        </p>
						        <Link to={`/testResultPage`}>
					            	<FlatButton className="reviewtest-button" label="Review Test Result" labelStyle={buttonStyle}/>
					            </Link>
                                <div></div>
                                <Link to={`/`}>
                                    <FlatButton className="reviewtest-button" label="Go Back Home" labelStyle={buttonStyle}/>
                                </Link>
				            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}



function mapStateToProps(state) {
  return {
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps, {})(ReviewTestPage);
