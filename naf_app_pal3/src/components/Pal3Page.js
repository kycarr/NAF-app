import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import {Link} from "react-router-dom";
import {fetchPal3Question} from '../actions';
import '../styles/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  SCROLL_SPEED,
  MULTI_CHOICE,
  SINGLE_ANSWER,
  SHORT_ANSWER,
  ESSAY,
  MULTIPLE_ANSWER,
  HOTSPOT,
  TABLE_FILL,
  DRAG_DROP
} from '../constants';

const question = {
      id: 15,
      type: MULTI_CHOICE,
      choiceType: MULTIPLE_ANSWER,
      question: "What are the terms used to describe an open or closed telegraph circuit?",
      topicId: 2,
      bookmarked: false,
      optionList: [{option: "Dot and dash", selected: false},
        {option: "Start and stop", selected: false},
        {option: "Hack and slash", selected: false},
        {option: "Space and mark", selected: false}],
      correctAnswer: ["Space and mark"]
};

const buttonStyle = {
  textTransform: 'none',
  fontSize: '24px',
  color: '#fff'
};

const disabledButtonStyle = {
  textTransform: 'none',
  fontSize: '24px',
  color: 'gray'
};
class Pal3Page extends Component {

  constructor(props) {
    super(props);
    var queryString = window.location.search.slice(1);
    var questionId = queryString.split('=')[1];
    this.props.fetchPal3Question(questionId);
    this.state = {
      question: question
    }
    this.optionSelected = this.optionSelected.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  optionSelected(option) {
    let question = this.state.question;
    let _optionList = question.optionList.map((_option) => {
          if (option === _option) {
            _option.selected = !option.selected;
          }
          else if (question.choiceType === SINGLE_ANSWER) {
            _option.selected = false;
          }
          return _option;
        });
    question.optionList = _optionList;
    this.setState({
      ...this.state,
      question: question
    });
  }

  renderQuestion(question) {
    let questionType = question.type;
    switch (questionType) {
      case MULTI_CHOICE:
        return question.optionList.map((option) => {
          return  <div key={question.id + option.option} className={option.selected ? "test-option-selected" : "test-option-unselected"}
                    onClick={() => this.optionSelected(option)}>
                    {option.option}
                  </div>
        });      
      default:
        break;
    }
  }

  onSubmit() {
      // const score = this.state.score // score was set when user chose a radio-button answer

      let answers = [];
      let correctAnswers = this.state.question.correctAnswer;
      let score = 0.0;
      this.state.question.optionList.forEach((element) => {
        if(element['selected'] === true) {
          answers.push(element.option);
        }
      });
     if(correctAnswers.length !== answers.length) {
        this.props.failed(score);
      } 
      else {
          for(let i =0; i<correctAnswers.length; i++) {
            if(!answers.includes(correctAnswers[i])){
              this.props.failed(score)
              this.props.terminate()
              return;
            } 
          }
      }
      score = 1.0;
      this.props.passed(score)
      this.props.terminate()
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    // 
    if (this.props.question !== prevProps.question) {
      this.setState({
        ...this.state,
        question: this.props.question[0]
      });
    }
  }

  render() {
    if(this.props.loading || this.props.isFetchingQuestions) {
      return (
        <div>
        Loading...
        </div>
        )
    }
    const question = this.state.question;
  	return (
      <MuiThemeProvider>
  		  <div className="container" style={{marginTop: "20px"}}>

            <div className="test-question-question">{question.question}</div>
            {question.type === MULTI_CHOICE && question.choiceType === MULTIPLE_ANSWER ? 
              <div className="test-question-filler">
                <strong>
                  <em>This question may have mulitple answers possible. Select all that apply.</em>
                </strong>
              </div> : null}
            {this.renderQuestion.bind(this)(question)}
            <span className="intro-buttons" style={{float: "right"}}>

            <FlatButton style={this.props.answered ? disabledButtonStyle : buttonStyle} disabled={this.props.answered} label="Submit Answer"  onClick={this.onSubmit}/>
            </span>
  		  </div>
      </MuiThemeProvider>
  		);
  }

}


function mapStateToProps(state) {
  return {
    isFetchingQuestions: state.QuestionsOnAPage.isFetchingQuestions,
    question: state.QuestionsOnAPage.question
  }
}

export default connect(mapStateToProps, {fetchPal3Question})(Pal3Page);
