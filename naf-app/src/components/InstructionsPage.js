import React, {Component} from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import {Link} from "react-router-dom";

import '../styles/App.css';
import eye from '../images/NAF_Icon_EyeOn.png';
import imgBookmarkOff from '../images/NAF_Icon_BookmarkOff.png';
import ToolbarLoginComponent from './ToolbarLogin';
import { fetchQuestions } from '../actions'


const buttonStyle = {
  textTransform: 'none',
  fontSize: '18px'
};

class Instructions extends Component {
    render() {
        return (
            <div className="InstructionsPage">
                <MuiThemeProvider>
                    <div>
                        <ToolbarLoginComponent name={this.props.name} />
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        	<div className="instructions-box">
                                <p className="instructions-text">
                                    <span style ={{fontSize:'24px', textAlign:'center'}}>Instructions</span>
                                </p>
				              	<p className="dialog-text">
						          <span style ={{fontWeight : 'bold'}}>Course Name / Section Technical Administration</span> <br /><br />
						          This test has two sections. <br /><br />
						          You have exactly 15 minutes to complete Section 1; and 17 minutes for Section 2. <br /><br />
						          Each section may have multiple pages, with each page containing a maximum of 10 questions. <br /><br />
						          Click the bookmark <span><img src={imgBookmarkOff} alt="bookmarkOff"/></span> next to any question, answered or unanswered, as a reminder for yourself. The bookmarks will not be submitted nor will they be recorded or effect your test score. <br /><br />
						          Use your mouse to scroll up or down to review previous questions. <br /><br />
						          You can also click on any question in the Navigation bar to go to the respective question. <br /><br />
						          You may not return to a section once you have moved on to the next section. <br /><br />
						          You may hide the timer by clicking on the eye. <span><img src={eye} alt="eye"/></span> <br /><br />
						          If you choose to hide the timer, it will reappear at the 2 minute warning. <br /><br />
						          The timer will stop the test, if you have not finished in the allotted time. <br /><br />
						          All your work is automatically saved and submitted when the timer stops the test. <br />
						        </p>
						        <Link to={`/testPage`}>
					            	<FlatButton className="instructions-button" label="Start Test" labelStyle={buttonStyle} onClick={() => this.props.fetchQuestions(this.props.userId)}/>
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
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps, {fetchQuestions})(Instructions);
