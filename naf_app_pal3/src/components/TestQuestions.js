import React, {Component} from 'react';
import {connect} from 'react-redux';
import {optionSelected, goToPage, questionAnswered, changeBookmark} from '../actions';
import {
  NUM_QUESTIONS_ON_A_PAGE,
  SCROLL_SPEED,
  MULTI_CHOICE,
  SHORT_ANSWER,
  ESSAY,
  MULTIPLE_ANSWER,
  HOTSPOT,
  TABLE_FILL,
  DRAG_DROP
} from '../constants';
import scrollTo from 'scroll-to';
import TextField from 'material-ui/TextField';
import Waypoint from 'react-waypoint';
import Dragula from 'react-dragula';
import nextPage from "../images/NAF_Icon_CircleRight.png";
import prevPage from "../images/NAF_Icon_CircleLeft.png";
import nimitz3 from "../images/nimitz3.jpg";
import Button from 'material-ui/FlatButton';
import HotSpotQuestion from './HotSpotQuestion';
import imgBookmarkOn from '../images/NAF_Icon_BookmarkOn.png';
import imgBookmarkOff from '../images/NAF_Icon_BookmarkOff.png';
import TableFillQuestion from './TableFillQuestion';
import MediaQuery from 'react-responsive';
import DragAroundCustomDragLayer from './CustomDragLayer';
class TestQuestions extends Component {


  constructor(props) {
    super(props);
    this.state = {
      tableAnswers: {}
    };
    this.sendTableFillContent = this.sendTableFillContent.bind(this);
    this.sendDragAndDrop = this.sendDragAndDrop.bind(this);

  }
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
        <a data-fancybox="gallery" ><img className="image-type" src={nimitz3} alt="Test Loading"/></a>
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
    console.log('id: ' + id + "answer" + answer);
    this.props.questionAnswered(id, answer);
  }

  WayPoint(lineNum) {
      if(lineNum % 1 === 0) {
      const onWayPointChild = this.props.onWayPointChild;

          return  (
              <Waypoint
                onEnter = {function(props) {
                // console.log('onEnter ' + lineNum);
                  onWayPointChild(lineNum-1);
                }}
              />);
      }
  }

  sendTableFillContent(questionId, index, column, content) {
    let mark = false;
    let tableContent = this.state.tableAnswers[questionId];
    if(tableContent == null) {
      tableContent = [];
      mark = true;
    }
    let i = 0;
    for(i = 0; i < tableContent.length; i++) {
      if(tableContent[i][0] === index && tableContent[i][1] === column) {
        tableContent[i][2] = content;
        break;
      }
    }
    if(i == tableContent.length) {
      tableContent.push([index, column, content.toString()]);
    }
    let tableAnswers = Object.assign({}, this.state.tableAnswers);
    tableAnswers[questionId] = tableContent;
    this.setState({tableAnswers});
    let answers = tableContent.map(ele => {
      return ele[0].toString() + ':' + ele[1].toString() + ':' + ele[2].toString();
    });
    this.props.questionAnswered(questionId, answers);
    console.log(answers);
  }


  sendDragAndDrop(questionId, index, top, left) {
    let tableContent = this.state.tableAnswers[questionId];
    let mark = false;
      if(tableContent == null) {
      tableContent = [];
      mark = true;
    }
      let i = 0;
    for(i = 0; i < tableContent.length; i++) {
      if(tableContent[i][0] === index) {
        tableContent[i][1] = top;
        tableContent[i][2] = left;
        break;
      }
    }
    if(i == tableContent.length) {
      tableContent.push([index, top, left]);
    }
    let tableAnswers = Object.assign({}, this.state.tableAnswers);
    tableAnswers[questionId] = tableContent;
    this.setState({tableAnswers});
    let answers = tableContent.map(ele => {
      return ele[0].toString() + ':' + ele[1].toString() + ':' + ele[2].toString();
    });
    this.props.questionAnswered(questionId, answers);
    console.log(answers);
  }

  renderQuestion(question) {
    let questionType = question.type;
    switch (questionType) {
      case MULTI_CHOICE:
        return question.optionList.map((option) => {
          return  <div key={question.id + option.option} className={option.selected ? "test-option-selected" : "test-option-unselected"}
                    onClick={() => this.props.optionSelected(this.props.userId, this.props.sectionNumber, question.id, option)}>
                    {option.option}
                  </div>
        });
      case SHORT_ANSWER:
        return (
          <TextField id={'TextField' + question.id} style={{backgroundColor : 'rgba(256,256,256,0.4)', border: '2px solid rgba(256,256,256,0.7)'}}
          textareaStyle={{padding : '0px 15px', margin: '6px 0px'}} className="text-field" rows={2} rowsMax={4} multiLine={true}
          underlineStyle={{display: 'none'}}  inputStyle={{ textAlign: 'center' }}
          hintStyle={{ width: 'inherit', textAlign: 'left', margin: '0px 15px', marginBottom: '26px' }}
          fullWidth={true} hintText={ question.answered ? "Type your answer here" : question.answer } onBlur={(event) => TestQuestions.onAnswerChanged.bind(this)(question.id, event.target.value)}/>
        );
      case ESSAY:
        return (
          <TextField id={'TextField' + question.id} style={{backgroundColor : 'rgba(256,256,256,0.4)', border: '2px solid rgba(256,256,256,0.7)'}}
          textareaStyle={{padding : '0px 15px', margin: '6px 0px'}} className="text-field" rows={4} rowsMax={25} multiLine={true}
          underlineStyle={{display: 'none'}} inputStyle={{ textAlign: 'center', verticalAlign: 'text-top'}}
          hintStyle={{ width: 'inherit', textAlign: 'left', margin: '0px 15px', marginBottom: '74px'}}
          fullWidth={true} hintText={ question.answered ? "Type your answer here" : question.answer } onBlur={(event) => TestQuestions.onAnswerChanged.bind(this)(question.id, event.target.value)} />
        );
      case HOTSPOT:
        return (
          <HotSpotQuestion limit={question.limit} imageURL={question.imageURL} id={question.id} answerQuestion={this.props.questionAnswered}/>
        );
      case TABLE_FILL:
        return (
          <TableFillQuestion data={question.data} columns={question.columns}  id={question.id} sendTableFillContent={this.sendTableFillContent}/>
        );
      case DRAG_DROP:
        return (
          <DragAroundCustomDragLayer triggerMark={id => this.hotspotBookMark.bind(this)(id)} id={question.id} sendDragAndDrop={this.sendDragAndDrop}/>
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

          <span className = "image-bookmark" style={{float: 'left', marginRight: '10px'}} >
            <MediaQuery minDeviceWidth={768} > <img src = {question.bookmarked ? imgBookmarkOn : imgBookmarkOff} alt = "bookmark"
              onClick = {() => this.props.changeBookmark(question.id)}/>
              <span onClick = {() => this.props.changeBookmark(question.id)}> </span> </MediaQuery>
          </span>
          <span className="test-question-num"> {lineNum++} </span>


          <div className="test-question-question"> &nbsp; {question.question}</div>

          {question.type === MULTI_CHOICE && question.choiceType === MULTIPLE_ANSWER ? <div className="test-question-filler"><strong><em>This question may have mulitple answers possible. Select all that apply.</em></strong></div> : null}
          {question.type === HOTSPOT ? <div className="test-question-filler"><strong>Click on the image to select a region. Click again to cancel the selection.</strong></div> : null}

          {question.videoURL !== undefined ? TestQuestions.renderVideo(question.videoURL) : null}
          {question.type === TABLE_FILL ? <div className="test-question-filler"> <strong> Please Write '1' if Single and '2' if Double </strong> </div> : null }
          {question.imageURL !== undefined ? TestQuestions.renderImage(question.imageURL) : null}
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
    if(this.props.isFetchingQuestions) {
      return (<div>  Loading... </div>);
    }
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
          {/*<img src={prevPage} className={pageNum === 0 ? "page-navigation-inactive" : "page-navigation-active"}
               alt="prevPage"
               onClick={() => this.goToPrevPage.bind(this)(pageNum - 1)}
          />*/}


            <Button className={pageNum === 0 ? "page-navigation-inactive" : "page-navigation-active"}
                onClick={() => this.goToPrevPage.bind(this)(pageNum - 1)} >
                <img src={prevPage} alt="" />
                <span className="pagination-button-label"> Previous Page </span>
            </Button>


          {pageNumArray.map((index) => {
            return (<span key={index + pageNum} className={index === pageNum ? "page-current" : "page-not-current"}
                          onClick={() => this.goToSpecificPage.bind(this)(index)}/>)
          })}

          {/*
            <img src={nextPage}
                className={pageNum === totalPageNum - 1 ? "page-navigation-inactive" : "page-navigation-active"}
                alt="nextPage"
                onClick={() => this.goToNextPage.bind(this)(pageNum + 1, totalPageNum - 1)}
              />
          */}

          <Button className={pageNum === totalPageNum - 1 ? "page-navigation-inactive" : "page-navigation-active"}
              onClick={() => this.goToNextPage.bind(this)(pageNum + 1, totalPageNum - 1)} >
            <span className="pagination-button-label">Next Page </span>
            <img src={nextPage} />
          </Button>
        </div>

      </div>
    );
  }

  // componentDidMount() {
  //   console.log('will enable debug...')
  //   Cmi5.enableDebug(true)
  //   const cmi = new Cmi5(window.location.href);
  // }
}

function mapStateToProps(state) {
  return {
    allQuestions: state.QuestionsOnAPage.questionsArray,
    allQuestionsAnswered: state.QuestionsOnAPage.allQuestionsAnswered,
    pageNumber: state.QuestionsOnAPage.page,
    isFetchingQuestions: state.QuestionsOnAPage.isFetchingQuestions,
    sectionNumber: state.QuestionsOnAPage.section,
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps, {optionSelected, goToPage, questionAnswered, changeBookmark})(TestQuestions);
