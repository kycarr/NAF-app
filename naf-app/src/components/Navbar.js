import React, {Component} from 'react';
import {connect} from 'react-redux';

import FlatButton from 'material-ui/FlatButton';
import NavbarQuestion from './NavbarQuestions';
import Dialog from 'material-ui/Dialog';
import {Link} from "react-router-dom";

import arrowUp from '../images/NAF_Icon_ArrowUp.png';
import nextPage from "../images/NAF_Icon_CircleRight.png";
import prevPage from "../images/NAF_Icon_CircleLeft.png";
import warning from '../images/NAF_Icon_Warning.png';

import '../styles/App.css';
import {NUM_QUESTIONS_ON_A_PAGE, SCROLL_SPEED} from '../constants';
import {goToPage, goToSection, resetToDefaultState, submitSectionAnswers, sendTestFinishAction} from '../actions';
import scrollTo from "scroll-to";

const buttonStyle = {
  textTransform: 'none',
  fontSize: '18px'
};

const loginButtonStyle = {
  textTransform: 'none',
  fontSize: '18px',
};

class NavbarComponent extends Component {

  constructor(props) {
    super(props);
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

  togglePopupWarning() {
    this.setState({
      openWarning: !this.state.openWarning
    });
  }

  static handleOnClickBackToTop() {
    scrollTo(0, 0, {
      duration: SCROLL_SPEED
    });
  }

  goToNextPage(nextPageNum, maxPageNum) {
    if (nextPageNum <= maxPageNum) {
      this.props.goToPage(nextPageNum);
      scrollTo(0, 0, {
        duration: SCROLL_SPEED
      });
    }
  }

  goToPrevPage(prevPageNum) {
    if (prevPageNum >= 0) {
      this.props.goToPage(prevPageNum);
      scrollTo(0, 0, {
        duration: SCROLL_SPEED
      });
    }
  }

  onClickNextSection() {
    if (this.props.sectionNum < this.props.totalSectionNum) {
      this.props.submitSectionAnswers(this.props.userId, this.props.sectionNum, NavbarComponent.getToolbarTimer());
      // this.props.goToSection(this.props.sectionNum + 1);
      this.togglePopupWarning()
      scrollTo(0, 0, {
        duration: SCROLL_SPEED
      });
    }
  }

  onClickFinishTest() {
    this.props.sendTestFinishAction(this.props.userId, this.props.sectionNum, NavbarComponent.getToolbarTimer());
    // this.props.resetToDefaultState();
    this.togglePopupWarning();
    scrollTo(0, 0, {
      duration: SCROLL_SPEED
    });
  }


  render() {
    if(this.props.isFetchingQuestions) {
      return (<div> </div>);
    }
    const nextSectionOrFinishButton = this.props.sectionNum === this.props.totalSectionNum - 1 ?
      <Link to={'/'}>
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
    let questions = this.props.allQuestions.slice(pageNum * NUM_QUESTIONS_ON_A_PAGE, pageNum * NUM_QUESTIONS_ON_A_PAGE + NUM_QUESTIONS_ON_A_PAGE);
    let pageNumArray = [];
    for (let i = 0; i < totalPageNum; i++) {
      pageNumArray.push(i);
    }
    return (
      <div>
      <div className="nav-component">
        <div className="nav-header">
          <span style={{fontSize: '22px'}}>Navigation</span><br></br>
          <span style={{fontSize: '14px'}}>Section {this.props.sectionNum + 1} <br/> Page {this.props.pageNumber + 1}</span>
        </div>
        <div className="nav-questions">
          <FlatButton className="nav-button" onClick={this.togglePopupWarning} label="Submit Section" id="submitBtn" labelStyle={buttonStyle}/>
          <div className="nav-qlist">
            {questions.map((question) => {
                return <NavbarQuestion key={question.id} question={question} lineNum={lineNum++} 
                        bookmarked={question.bookmarked} answered={question.answered} 
                        wayPointNum={this.props.lineNumber}/>
              }
            )}
          </div>
          <div className="nav-button-page">
            <img src={prevPage} className={pageNum === 0 ? "page-navigation-inactive" : "page-navigation-active"}
                 alt="prevPage"
                 onClick={() => this.goToPrevPage.bind(this)(pageNum - 1)}
            />

            <img src={nextPage}
                 className={pageNum === totalPageNum - 1 ? "page-navigation-inactive" : "page-navigation-active"}
                 alt="nextPage"
                 onClick={() => this.goToNextPage.bind(this)(pageNum + 1, totalPageNum - 1)}
            />
          </div>
          <FlatButton className="nav-button" label="Back to Top" id="toTopBtn" labelStyle={buttonStyle}
                      onClick={NavbarComponent.handleOnClickBackToTop}>
            <img className="image" src={arrowUp} alt="arrowUp"/>
          </FlatButton>
        </div>
      </div>
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
            <span>You have completed this section. If you proceed, you will not be able to return to this section. <br /><br /></span> :
            <span><b>You have unanswered questions.</b> If you submit, you will not be able to return to this section. Any unanswered questions will be graded as incomplete.<br /><br /></span>}
        </p>
      </Dialog>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    allQuestions: state.QuestionsOnAPage.questionsArray,
    sectionNum: state.QuestionsOnAPage.section,
    pageNumber: state.QuestionsOnAPage.page,
    totalSectionNum : state.QuestionsOnAPage.totalSections,
    allQuestionsAnswered: state.QuestionsOnAPage.allQuestionsAnswered,
    isFetchingQuestions: state.QuestionsOnAPage.isFetchingQuestions,
    userId: state.auth.userId
  }
}



export default connect(mapStateToProps, {sendTestFinishAction, goToPage, goToSection, resetToDefaultState, submitSectionAnswers})(NavbarComponent);