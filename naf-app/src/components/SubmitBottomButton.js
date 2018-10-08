import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {Link} from "react-router-dom";
import arrowUp from '../images/NAF_Icon_ArrowUp.png';
import warning from '../images/NAF_Icon_Warning.png';
import '../styles/App.css';
import {NUM_QUESTIONS_ON_A_PAGE, SCROLL_SPEED} from '../constants';
import {submitSectionAnswers, sendTestFinishAction} from '../actions';
import scrollTo from "scroll-to";

const buttonStyle = {
  textTransform: 'none',
  fontSize: '18px'
};

const loginButtonStyle = {
  textTransform: 'none',
  fontSize: '15px',
};

 class SubmitBottomButton extends React.Component {
    constructor(props, context) {
    super(props, context);
    this.state = {openWarning: false, timerTime: 0};
    this.togglePopupWarning = this.togglePopupWarning.bind(this);
    this.onClickNextSection = this.onClickNextSection.bind(this);
    this.onClickFinishTest = this.onClickFinishTest.bind(this);
  }

  static getToolbarTimer() {
    let time = document.getElementById("toolbar-time").innerText;
    console.log(time);
    return time;
  }

  static handleOnClickBackToTop() {
    scrollTo(0, 0, {
      duration: SCROLL_SPEED
    });
  }

  togglePopupWarning() {
    this.setState({
      openWarning: !this.state.openWarning
    });
  }


  onClickNextSection() {
    if (this.props.sectionNum < this.props.totalSectionNum) {
      this.props.submitSectionAnswers(this.props.userId, this.props.sectionNum, SubmitBottomButton.getToolbarTimer());
      this.togglePopupWarning()
      scrollTo(0, 0, {
        duration: SCROLL_SPEED
      });
    }
  }

  onClickFinishTest() {
    this.props.sendTestFinishAction(this.props.userId, this.props.sessionId, this.props.sectionNum, SubmitBottomButton.getToolbarTimer());
    this.togglePopupWarning();
    scrollTo(0, 0, {
      duration: SCROLL_SPEED
    });
  }

  render() {
      const nextSectionOrFinishButton = this.props.sectionNum === this.props.totalSectionNum - 1 ?
        <Link to={'/reviewTestPage'}>
        <FlatButton label="Finish Test" primary={true} labelStyle={loginButtonStyle} onClick={this.onClickFinishTest}/>
        </Link> :
        <FlatButton label="Go to Next Section" primary={true} labelStyle={loginButtonStyle} onClick={this.onClickNextSection}/>;

      const warningButtons = [
        <FlatButton label="Return to Section" primary={true} onClick={this.togglePopupWarning} labelStyle={loginButtonStyle} />,
        nextSectionOrFinishButton
      ];

      let totalPageNum = Math.ceil(this.props.allQuestions.length / NUM_QUESTIONS_ON_A_PAGE);
      let pageNum = this.props.pageNumber;
      let lineNum = pageNum * NUM_QUESTIONS_ON_A_PAGE + 1;
      let pageNumArray = [];
      for (let i = 0; i < totalPageNum; i++) {
        pageNumArray.push(i);
      }
      return (
        <div>
          {pageNum === totalPageNum - 1 ? (  <FlatButton className="nav-button" onClick={this.togglePopupWarning} label= {this.props.sectionNum + 1 === this.props.totalSectionNum ? "Finish Test"
          : "Submit Section"} id="submitBtn" labelStyle={buttonStyle}/> ) : null}
          {/* <FlatButton className="nav-button" onClick={this.togglePopupWarning} label= {this.props.sectionNum + 1 === this.props.totalSectionNum ? "Finish Test" : "Submit Section"} id="submitBtn" labelStyle={buttonStyle}/> */}
          <Dialog
            style = {{ fontFamily : 'Work Sans', textAlign : 'center' }}
            actions={warningButtons}
            modal={false}
            open={this.state.openWarning}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
            >
            <img className="image-warning" src={warning} alt="warning"/>
            <div className="dialog-title">Warning</div>
            <p className="dialog-text">
            {this.props.allQuestionsAnswered ?
              <span>You have completed this section. <br />You have answered {this.props.numAnsweredQuestions} out of {this.props.allQuestions.length} questions in this section.
               If you proceed, you will not be able to return to this section. <br /><br /></span> :

              <span>You have not completed this section. You have <span style={{'color': 'red'}}> <b>{this.props.allQuestions.length - this.props.numAnsweredQuestions} unanswered </b>  {this.props.allQuestions.length - this.props.numAnsweredQuestions === 1 ? 'question' : 'questions' } </span>
               out of {this.props.allQuestions.length} questions.
               <br />If you submit, you will not be able to return to this section. Any unanswered questions will be graded as incomplete.<br /><br /></span>}
            </p>
          </Dialog>
      </div>
      )
  }

}

/*

          <FlatButton className="nav-button" label="Back to Top" id="toTopBtn" labelStyle={buttonStyle}
                      onClick={SubmitBottomButton.handleOnClickBackToTop}>
            <img className="image" src={arrowUp} alt="arrowUp"/>
          </FlatButton>
*/

function mapStateToProps(state) {
  return {
    allQuestions: state.QuestionsOnAPage.questionsArray,
    sectionNum: state.QuestionsOnAPage.section,
    pageNumber: state.QuestionsOnAPage.page,
    totalSectionNum : state.QuestionsOnAPage.totalSections,
    allQuestionsAnswered: state.QuestionsOnAPage.allQuestionsAnswered,
    isFetchingQuestions: state.QuestionsOnAPage.isFetchingQuestions,
    userId: state.auth.userId,
    sessionId: state.QuestionsOnAPage.sessionId,
    numAnsweredQuestions: state.QuestionsOnAPage.numAnsweredQuestions
  }
}

export default connect(mapStateToProps, {sendTestFinishAction, submitSectionAnswers})(SubmitBottomButton);
