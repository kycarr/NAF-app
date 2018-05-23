import React from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {resetToDefaultState} from '../actions'

import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import {Link} from "react-router-dom";

import '../styles/App.css';
import eye from '../images/NAF_Icon_EyeOn.png';
import closeEye from '../images/NAF_Icon_EyeOff.png';
import imgBookmarkOff from '../images/NAF_Icon_BookmarkOff.png';
import warning from '../images/NAF_Icon_Warning.png';
import {MIN_TIME, TOTAL_TIME, SCROLL_SPEED} from '../Utils';
import scrollTo from "scroll-to";


const buttonStyle = {
  textTransform: 'none',
  fontSize: '18px'
};

class ToolbarComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {showTimer: true, time: {}, seconds: TOTAL_TIME, openInstructions: false, openSectionWarning: false, openTimeoutWarning: false};
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.setTimerState = this.setTimerState.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.togglePopupWarning = this.togglePopupWarning.bind(this);
    this.resetTimerTime = this.resetTimerTime.bind(this);
  }

  static secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    return {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.sectionNum !== this.props.sectionNum){
      this.state.seconds = nextProps.sectionTime;
    }
  }

  componentDidMount() {
    let timeLeftVar = ToolbarComponent.secondsToTime(this.state.seconds);
    this.setState({time: timeLeftVar});
    this.startTimer();
  }

  startTimer() {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: ToolbarComponent.secondsToTime(seconds),
      seconds: seconds,
      showTimer: seconds < MIN_TIME ? true : this.state.showTimer,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      this.setState({
        openTimeoutWarning: true
      });
      clearInterval(this.timer);
    }
  }

  setTimerState() {
    if (this.state.seconds > MIN_TIME) {
      this.setState({
        showTimer: !this.state.showTimer
      });
    }
  }

  resetTimerTime(newTime) {
      let timeLeftVar = ToolbarComponent.secondsToTime(newTime);
      this.setState({time: timeLeftVar});
      this.startTimer();
  }
  
  togglePopup() {
    this.setState({
      openInstructions: !this.state.openInstructions
    });
  }

  togglePopupWarning() {
    this.setState({
      openSectionWarning: !this.state.openSectionWarning
    });
  }

  onClickExitTest() {
    this.props.resetToDefaultState();
    scrollTo(0, 0, {
      duration: SCROLL_SPEED
    });
  }

  render() {
    const instructionButtons = [
      <FlatButton label="Return to Test" primary={true} onClick={this.togglePopup} labelStyle={buttonStyle}/>,
    ];

    const warningButtons = [
      <FlatButton label="Return to Test" primary={true} onClick={this.togglePopupWarning}
                  labelStyle={buttonStyle}/>,
      <Link to={`/`}>
        <FlatButton label="Exit Test" primary={true} labelStyle={buttonStyle} onClick={() => this.onClickExitTest.bind(this)()}/>
      </Link>
    ];

    const exitButtons = [
      <Link to={`/`}>
        <FlatButton label="Exit Test" primary={true} labelStyle={buttonStyle}/>
      </Link>
    ];

    return (
      <MuiThemeProvider>
        <Toolbar className="toolbar">
          <ToolbarGroup className="col-lg-1">
          </ToolbarGroup>
          <ToolbarGroup className="toolbar-time col-lg-8">
            <IconButton className="toolbar-eye" onClick={this.setTimerState}>
              <img src={this.state.showTimer ? eye : closeEye} alt="eye"/>
            </IconButton>
            {this.state.showTimer ?
              <div className="toolbar-fixed-width-div">
                <span className="toolbar-title">Time Remaining :</span>
                <div className={this.state.seconds < MIN_TIME ? "toolbar-timer-min-time" : "toolbar-timer"}>
                  {this.state.time.h >= 10 ? "" : "0"}{this.state.time.h}:{this.state.time.m >= 10 ? "" : "0"}{this.state.time.m}:{this.state.time.s >= 10 ? "" : "0"}{this.state.time.s}</div>
              </div>
              : <div className="toolbar-fixed-width-div"></div>}
          </ToolbarGroup>
          <ToolbarGroup className="col-lg-3">
            <div className="toolbar-options">
              <FlatButton style={{minWidth : '40px'}} className="toolbar-button-instructions" onClick={this.togglePopup} label="?"
                          labelStyle={buttonStyle}/>
              <FlatButton className="toolbar-button-exit" onClick={this.togglePopupWarning} label="Exit Test"
                          labelStyle={buttonStyle}/>
            </div>
          </ToolbarGroup>
        </Toolbar>

        <Dialog
          title="Instructions"
          titleStyle={{fontFamily: 'Work Sans', textAlign: 'center'}}
          actions={instructionButtons}
          modal={false}
          open={this.state.openInstructions}
          autoScrollBodyContent={true}
        >
        <p className="toolbar-dialog-text">
          <span style ={{fontWeight : 'bold'}}>Course Name / Section Technical Administration</span> <br /><br />
          This test has two sections. <br /><br />
          You have exactly 15 minutes to complete Section 1; and 17 minutes for Section 2. <br /><br />
          Each section may have multiple pages, with each page containing a maximum of 10 questions. <br /><br />
          Click the bookmark <span><img src={imgBookmarkOff} alt="bookmarkOff"/></span> next to any question, answered or unanswered, as a reminder for yourself. The bookmarks will not be submitted nor will they be recorded or effect your test score. <br /><br />
          Use your mouse to scroll up or down to review previous questions. <br /><br />
          You can also click on any question in the Navigation bar to go to the respective question. <br /><br />
          You may not return to a section once you have moved on to the next section. <br /><br />
          You may hide the timer by clicking on the eye <span><img src={eye} alt="eye"/></span> <br /><br />
          If you choose to hide the timer, it will reappear at the 2 minute warning. <br /><br />
          The timer will stop the test, if you have not finished in the allotted time. <br /><br />
          All your work is automatically saved and submitted when the timer stops the test. <br />
        </p>
      </Dialog>

      <Dialog
          style = {{ fontFamily : 'Work Sans', textAlign : 'center' }}
          actions={warningButtons}
          modal={false}
          open={this.state.openSectionWarning}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <img className="image-warning" src={warning} alt="warning"/>
          <p className="dialog-text">
            <div className="dialog-title">Warning</div>
            {this.props.allQuestionsSelected ?
              <span>You have completed this section. If you submit, you will not be able to return to this section. <br/><br/></span> :
              <span><b>You have unanswered questions.</b> If you submit, you will not be able to return to this section. Any unanswered questions will be graded as incomplete.<br/><br/></span>}
          </p>
        </Dialog>

        <Dialog
          style = {{ fontFamily : 'Work Sans', textAlign : 'center' }}
          actions={exitButtons}
          modal={false}
          open={this.state.openTimeoutWarning}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <img className="image-warning" src={warning} alt="warning"/>
          <p className="dialog-text">
            <div className="dialog-title">Warning</div>
              <span>Your time is over. All your work has been automatically saved and submitted.<br/><br/></span> 
          </p>
        </Dialog>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    allQuestionsAnswered : state.questionsOnAPage.allQuestionsAnswered,
    sectionNum: state.questionsOnAPage.section,
    sectionTime: state.questionsOnAPage.time
  }
}

export default connect(mapStateToProps, {resetToDefaultState})(ToolbarComponent);
