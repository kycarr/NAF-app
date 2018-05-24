import React, {Component} from 'react';
import {connect} from 'react-redux';
import {optionSelected, goToPage, questionAnswered} from '../actions';
import {
  NUM_QUESTIONS_ON_A_PAGE,
  SCROLL_SPEED,
  MULTI_CHOICE,
  SHORT_ANSWER,
  ESSAY,
  MULTIPLE_ANSWER
} from '../utils/Utils';
import scrollTo from 'scroll-to';
import TextField from 'material-ui/TextField';
import Waypoint from 'react-waypoint';
import Dragula from 'react-dragula';
import nextPage from "../images/NAF_Icon_CircleRight.png";
import prevPage from "../images/NAF_Icon_CircleLeft.png";

class TestQuestions extends Component {

  static renderVideo(videoURL) {
    if (null != videoURL) {
      return (
        <video className="video-type" controls controlsList="nodownload">
          <source src={videoURL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
  }

  static renderImage(imageURL) {
    if (null != imageURL) {
      return (
      <div>
        <a data-fancybox="gallery" href={imageURL}><img className="image-type" src={imageURL} alt="Test Loading"/></a>
      </div>
      )
    }
  }

  static renderFlowChar() {
    let dragulaDecorator = (componentBackingInstance) => {
      if (componentBackingInstance) {
        let options = { };
        Dragula([componentBackingInstance], options);
      }
    };
    return (
      <div className='container' ref={dragulaDecorator}>
        <div>Swap me around</div>
        <div>Swap her around</div>
        <div>Swap him around</div>
        <div>Swap them around</div>
        <div>Swap us around</div>
        <div>Swap things around</div>
        <div>Swap everything around</div>
      </div>
    );
  }

  static onAnswerChanged(id, answer) {
    this.props.questionAnswered(id, answer);
  }
  
  WayPoint(lineNum) {
      if(lineNum % 1 === 0) {
      const onWayPointChild = this.props.onWayPointChild;
               
          return  (
              <Waypoint
                onEnter = {function(props) {
                console.log('onEnter ' + lineNum);
                  onWayPointChild(lineNum-1);
                }}
              />);
      }
  }

  renderQuestion(question) {
    let questionType = question.type;
    switch (questionType) {
      case MULTI_CHOICE:
        return question.optionList.map((option) => {
          return  <div key={question.id + option.option} className={option.selected ? "test-option-selected" : "test-option-unselected"} 
                    onClick={() => this.props.optionSelected(question.id, option)}>
                    {option.option}
                  </div>
        });
      case SHORT_ANSWER:
        return (
          <TextField style={{backgroundColor : 'rgba(256,256,256,0.4)', border: '2px solid rgba(256,256,256,0.7)'}} 
          textareaStyle={{padding : '0px 15px', margin: '6px 0px'}} className="text-field" rows={2} rowsMax={4} multiLine={true} 
          underlineStyle={{display: 'none'}}  inputStyle={{ textAlign: 'center' }}
          hintStyle={{ width: 'inherit', textAlign: 'left', margin: '0px 15px', marginBottom: '26px' }}
          fullWidth={true} hintText="Type your answer here" value={question.answer} onChange={(event) => TestQuestions.onAnswerChanged.bind(this)(question.id, event.target.value)}/>
        );
      case ESSAY:
        return (
          <TextField style={{backgroundColor : 'rgba(256,256,256,0.4)', border: '2px solid rgba(256,256,256,0.7)'}} 
          textareaStyle={{padding : '0px 15px', margin: '6px 0px'}} className="text-field" rows={4} rowsMax={25} multiLine={true}
          underlineStyle={{display: 'none'}} inputStyle={{ textAlign: 'center', verticalAlign: 'text-top'}}
          hintStyle={{ width: 'inherit', textAlign: 'left', margin: '0px 15px', marginBottom: '74px'}}
          fullWidth={true} hintText="Type your answer here" value={question.answer} onChange={(event) => TestQuestions.onAnswerChanged.bind(this)(question.id, event.target.value)}/>
        );
      default:
        break;
    }

  }

  renderList() {
    let pageNum = this.props.pageNumber;
    let lineNum = pageNum * NUM_QUESTIONS_ON_A_PAGE + 1;
    let questions = this.props.allQuestions.slice(pageNum * NUM_QUESTIONS_ON_A_PAGE, pageNum * NUM_QUESTIONS_ON_A_PAGE + NUM_QUESTIONS_ON_A_PAGE);
    return questions.map((question) => {
      return (
        <div key={question.id} className="test-question" ref="questionNode5" id={"question" + question.id}>
          <div className="test-question-num"> {lineNum++} </div>
          <div className="test-question-question"> {question.question}</div>
          {question.type === MULTI_CHOICE && question.choiceType === MULTIPLE_ANSWER ? <div className="test-question-filler">Select all that apply.</div> : null}
          {TestQuestions.renderVideo(question.videoURL)}
          {TestQuestions.renderImage(question.imageURL)}
          {this.renderQuestion.bind(this)(question)}
          {this.WayPoint.bind(this)(lineNum)}
        </div>
      );
      }
    )
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

  goToSpecificPage(pageIndex) {
    this.props.goToPage(pageIndex);
    scrollTo(0, 0, {
      duration: SCROLL_SPEED
    });
  }

  render() {
    let totalPageNum = Math.ceil(this.props.allQuestions.length / NUM_QUESTIONS_ON_A_PAGE);
    let pageNum = this.props.pageNumber;
    let pageNumArray = [];
    for (let i = 0; i < totalPageNum; i++) {
      pageNumArray.push(i);
    }
    return (
      <div>
        <div className="test-qlist">
          {this.renderList()}
        </div>
        <div>
          <img src={prevPage} className={pageNum === 0 ? "page-navigation-inactive" : "page-navigation-active"}
               alt="prevPage"
               onClick={() => this.goToPrevPage.bind(this)(pageNum - 1)}
          />
          {pageNumArray.map((index) => {
            return (<span key={index + pageNum} className={index === pageNum ? "page-current" : "page-not-current"}
                          onClick={() => this.goToSpecificPage.bind(this)(index)}/>)
          })}

          <img src={nextPage}
               className={pageNum === totalPageNum - 1 ? "page-navigation-inactive" : "page-navigation-active"}
               alt="nextPage"
               onClick={() => this.goToNextPage.bind(this)(pageNum + 1, totalPageNum - 1)}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allQuestions: state.QuestionsOnAPage.questionsArray,
    allQuestionsAnswered: state.QuestionsOnAPage.allQuestionsAnswered,
    pageNumber: state.QuestionsOnAPage.page
  }
}

export default connect(mapStateToProps, {optionSelected, goToPage, questionAnswered})(TestQuestions);