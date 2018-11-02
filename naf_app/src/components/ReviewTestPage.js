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
  constructor(props) {
    super(props);
    this.openNewPage = this.openNewPage.bind(this);
  }

  openNewPage() {
    window.open(`http://localhost:3001?results=${this.props.sessionId}`);
  }

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
                      Your score is {this.props.score == undefined ? 'loading' : this.props.score}. <br />
                      Your result is {this.props.pass == undefined ? 'loading' : this.props.pass}. <br />
						          You can now either go to review your test result or go back to home page.<br /><br />
						        </p>
					            	{<FlatButton className="reviewtest-button" label="Review Test Result" labelStyle={buttonStyle} onClick={this.openNewPage}/>
                          /* <div className="btn btn-info"> Review Test Result </div> */
                        }
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
    sessionId: state.QuestionsOnAPage.sessionId,
    pass: state.QuestionsOnAPage.pass,
    score: state.QuestionsOnAPage.score
  }
}

export default connect(mapStateToProps, {})(ReviewTestPage);
