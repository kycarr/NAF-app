import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import {Link} from "react-router-dom";

import '../styles/App.css';
import ToolbarLoginComponent from './ToolbarLogin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const buttonStyle = {
  textTransform: 'none'
};

class ReviewTestPage extends Component {
    render() {
        return (
            <div className="ReviewTestPage">
                <MuiThemeProvider>
                    <div>
                        <ToolbarLoginComponent name={this.props.name} />
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        	<div className="reviewtest-box">
                                <p className="reviewtest-text">
                                    <span style ={{fontSize:'24px', textAlign:'center'}}>Test Completed</span>
                                </p>
				              	<p className="dialog-text-center" align="center">
                      You have completed the test {this.props.name}. <br />
						          You can now either go to review your test result or go back to home page.<br /><br />
						        </p>
						        <Link to={`/testResultPage`}>
					            	{/*<FlatButton className="reviewtest-button" label="Review Test Result" labelStyle={buttonStyle}/> */}
                        <div className="btn btn-info"> Review Test Result </div>
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
    name: state.auth.name,
    userId: state.auth.userId,
    sessionId: state.QuestionsOnAPage.sessionId
  }
}

export default connect(mapStateToProps, {})(ReviewTestPage);
