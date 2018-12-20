import React, {Component} from 'react';
import queryString from 'query-string'
import {connect} from 'react-redux';
// import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import {Link} from "react-router-dom";
import {fetchPal3Question} from '../actions';
import TableFillQuestion from './TableFillQuestion';
import '../styles/App.css';
import nimitz3 from "../images/nimitz3.jpg";
import TextField from 'material-ui/TextField';
import HotSpotQuestion from './HotSpotQuestion';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DragAroundCustomDragLayer from './CustomDragLayer';

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
    const queryParams = queryString.parse(window.location.search)
    const questionId = queryParams['questionId']
    if(!questionId) {
      console.error(`unable to find questionId in query string ${window.location.search}`)
    }
    
    // console.log(`questionId=${questionId}`)
    this.props.fetchPal3Question(questionId);

    this.state = {
      essayChanged: false,
      tableChanged: false,
      hotSpotChanged: false,
      dragDropChanged: false
    }
    this.optionSelected = this.optionSelected.bind(this);
    this.sendTableFillContent = this.sendTableFillContent.bind(this);
    this.onMultipleChoiceSubmit = this.onMultipleChoiceSubmit.bind(this);
    this.onEssaySubmit = this.onEssaySubmit.bind(this);
    this.onEssayChange = this.onEssayChange.bind(this);
    this.onTableSubmit = this.onTableSubmit.bind(this);
    this.hotSpotAnswered = this.hotSpotAnswered.bind(this);
    this.onHotSpotSubmit = this.onHotSpotSubmit.bind(this);
    this.sendDragAndDrop = this.sendDragAndDrop.bind(this);
    this.onDragDropSubmit = this.onDragDropSubmit.bind(this);
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

  onEssayChange() {
    this.setState({
      ...this.state,
      essayChanged: true
    });
  }

  hotSpotAnswered(questionId, coordsString) {
    //questionId unused
    this.setState({
      ...this.state,
      hotSpotChanged: true,
      coordsString: coordsString
    });
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
      question: question,
      anyOptionSelected: true
    });
  }

  renderQuestion(question) {
    let questionType = question.type;

    const submitDisabled = this.props.answered || 
      (question.type === MULTI_CHOICE && !this.state.anyOptionSelected)

    const essaySubmitDisabled = this.props.answered || !this.state.essayChanged;

    const tableSubmitDisabled = this.props.answered || !this.state.tableChanged;

    const hotSpotDisabled = this.props.answered || !this.state.hotSpotChanged; 

    const dragDropDisabled = this.props.answered || !this.state.tableChanged; 


    switch (questionType) {
      case MULTI_CHOICE:
        return (
          <div>
            {
              question.optionList.map((option) => {
                return  <div key={question.id + option.option} className={option.selected ? "test-option-selected" : "test-option-unselected"}
                          onClick={() => this.optionSelected(option)}>
                          {option.option}
                        </div>
              })
            }
            <span className="intro-buttons" style={{float: "right"}}>
              <FlatButton style={submitDisabled ? disabledButtonStyle : buttonStyle} disabled={submitDisabled} label="Submit Answer"  onClick={this.onMultipleChoiceSubmit}/>
            </span>
          </div>
        );
      case ESSAY:
        return (
          <form onSubmit={this.onEssaySubmit}>
          <TextField id={'TextField' + question.id} ref="essayField" style={{backgroundColor : 'rgba(256,256,256,0.4)', border: '2px solid rgba(256,256,256,0.7)'}}
          textareaStyle={{padding : '0px 15px', margin: '6px 0px'}} className="text-field" rows={4} rowsMax={25} multiLine={true}
          underlineStyle={{display: 'none'}} inputStyle={{ textAlign: 'center', verticalAlign: 'text-top'}}
          hintStyle={{ width: 'inherit', textAlign: 'left', margin: '0px 15px', marginBottom: '74px'}}
          fullWidth={true} hintText={ question.answered ? "Type your answer here" : question.answer} onChange={this.onEssayChange}  />
          <span className="intro-buttons" style={{float: "right"}}>
            <FlatButton style={essaySubmitDisabled ? disabledButtonStyle : buttonStyle} disabled={essaySubmitDisabled} label="Submit Answer"  onClick={this.onEssaySubmit}/>
          </span>
          </form>
        );
      case TABLE_FILL:
        return (
          <div>
            <TableFillQuestion data={question.data} columns={question.columns}  id={question.id} sendTableFillContent={this.sendTableFillContent}/>
            <span className="intro-buttons" style={{float: "right"}}>
              <FlatButton style={tableSubmitDisabled ? disabledButtonStyle : buttonStyle} disabled={tableSubmitDisabled} label="Submit Answer"  onClick={this.onTableSubmit}/>
            </span>
          </div>
        );
      case HOTSPOT:
        return (
          <div>
            <HotSpotQuestion limit={question.limit} imageURL={question.imageURL} id={question.id} answerQuestion={this.hotSpotAnswered}/>
            <span className="intro-buttons" style={{float: "right"}}>
              <FlatButton style={hotSpotDisabled ? disabledButtonStyle : buttonStyle} disabled={hotSpotDisabled} label="Submit Answer"  onClick={this.onHotSpotSubmit}/>
            </span>
          </div>
        );
      case DRAG_DROP:
        return (
          <div>
            <DragAroundCustomDragLayer triggerMark={id => this.hotspotBookMark.bind(this)(id)} id={question.id} sendDragAndDrop={this.sendDragAndDrop}/>
            <span className="intro-buttons" style={{float: "right"}}>
              <FlatButton style={dragDropDisabled ? disabledButtonStyle : buttonStyle} disabled={dragDropDisabled} label="Submit Answer"  onClick={this.onDragDropSubmit}/>
            </span>
          </div>
        );
      default:
        break;
    }
  }

  sendTableFillContent(questionId, index, column, content) {
    let tableContent = this.state.tableContent;
    if(tableContent == null) {
      tableContent = [];
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
    let answers = tableContent.map(ele => {
      return ele[0].toString() + ':' + ele[1].toString() + ':' + ele[2].toString();
    });

    this.setState({
      ...this.state,
      tableAnswers: answers,
      tableChanged: true,
      tableContent: tableContent
    })
    console.log(answers);
  }

  sendDragAndDrop(questionId, index, top, left) {
    let tableContent = this.state.tableContent;
      if(tableContent == null) {
      tableContent = [];
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
    let answers = tableContent.map(ele => {
      return ele[0].toString() + ':' + ele[1].toString() + ':' + ele[2].toString();
    });
    this.setState({
      ...this.state,
      tableAnswers: answers,
      tableChanged: true,
      tableContent: tableContent
    })
    console.log(answers);
  }


  compareAnswers(type, answer) {
    let correctAnswers = this.state.question.correctAnswer;
    console.log(correctAnswers);
    let pass = true;
    if(type === TABLE_FILL) {
      if(correctAnswers.length !== answer.length) {
        pass = false; 
      }
      else {
        for(let i =0; i<correctAnswers.length; i++) {
          if(!answer.includes(correctAnswers[i])) {
            pass = false;
            break;
          }
        }
      }
      console.log("table fill result is :" + pass);
    }
    else if(type === HOTSPOT) {
      if(correctAnswers.length !== answer.length) {
        pass = false; 
      }
      else {
        for(let i =0; i < correctAnswers.length; i++) {
          let found = false;
          for(let j = 0; j < answer.length; j++) {
            let target = correctAnswers[i].split(':');
            let source = answer[j].split(':');
            let x_source = +source[0] + (+source[2] - +source[0]) / 2;
            let y_source = +source[1] + (+source[3] - +source[1]) / 2;
            if(x_source > +target[0] && x_source < +target[2] && y_source > +target[1] && y_source < +target[3]) {
              found = true;
              break;
            }
          }
          if(found === false) {
            pass = false;
            break;
          }
        }
      }
      console.log("hot spot result is :" + pass);
    }
    else if(type === DRAG_DROP) {
      if(correctAnswers.length !== answer.length) {
        pass = false; 
      }
      else {
        let source = {};
        for(let j = 0; j < answer.length; j++) {
          let temp = answer[j].split(':');
          source[temp[0]] = temp.slice(1);
        }
        console.log(source);
        for(let i =0; i < correctAnswers.length; i++) {
          let target = correctAnswers[i].split(':');
          if(source[target[0]] == null) {
            pass = false;
            break;
          }
          else {
            let x_source = +source[target[0]][0];
            let y_source = +source[target[0]][1];
            let x_left = +target[1] - 40;
            let x_right = +target[1] + 40;
            let y_top = +target[2] - 40;
            let y_bottom = +target[2] + 40;
            if(x_source < x_left || x_source > x_right || y_source < y_top || y_source > y_bottom) {
              pass = false;
              break;
            }
          }
        }
      }
      console.log("hot spot result is :" + pass);
    }
    return pass;
  }


  onEssaySubmit() {
      let correctAnswers = this.state.question.correctAnswer;
      let score = 0.0;
      let answer = this.refs.essayField.getValue();
      if(answer === correctAnswers[0]) {
        this.props.passed(1.0);
      }
      else {
        this.props.passed(0.0);
      }
      this.props.terminate();
  }

  onTableSubmit() {
    let result = this.compareAnswers(TABLE_FILL, this.state.tableAnswers);
    if(result == true) {
      this.props.passed(1.0);
    }
    else {
      this.props.passed(0.0);
    }
    this.props.terminate();
  }

  onHotSpotSubmit() {
    let result = this.compareAnswers(HOTSPOT, this.state.coordsString);
    if(result == true) {
      this.props.passed(1.0);
    }
    else {
      this.props.passed(0.0);
    }
    this.props.terminate();
  }

  onDragDropSubmit() {
    let result = this.compareAnswers(DRAG_DROP, this.state.tableAnswers);
    if(result == true) {
      this.props.passed(1.0);
    }
    else {
      this.props.passed(0.0);
    }
    this.props.terminate();
  }


  onMultipleChoiceSubmit() {
      // const score = this.state.score // score was set when user chose a radio-button answer

      let answers = [];
      let correctAnswers = this.state.question.correctAnswer;
      let score = 0.0;
      this.state.question.optionList.forEach((element) => {
        if(element['selected'] === true) {
          answers.push(element.option);
        }
      });

      let userCorrectCount = 0

      if(correctAnswers.length === answers.length) {
          for(let i =0; i<correctAnswers.length; i++) {
            if(!answers.includes(correctAnswers[i])){
              break
            } 
            userCorrectCount++
          }
      }
      
      if(userCorrectCount === correctAnswers.length) {
        this.props.passed(1.0)
      }
      else {
        this.props.failed(0.0) // should score be (userCorrectCount/correctAnswers.length)?
      }

      this.props.terminate()
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.question !== prevProps.question) {
      this.setState({
        ...this.state,
        question: this.props.question[0]
      });
    }
  }

  render() {
    if(this.props.loading || this.props.isFetchingQuestions || !this.state.question) {
      return (
        <div>
        Loading...
        </div>
        )
    }
    const question = this.state.question;

    // console.log(`render question=${JSON.stringify(question, null, 2)}`)

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
          {question.type === HOTSPOT ? <div className="test-question-filler"><strong>Click on the image to select a region. Click again to cancel the selection.</strong></div> : null}
          {question.videoURL !== undefined ? Pal3Page.renderVideo(question.videoURL) : null}
          {question.type === TABLE_FILL ? <div className="test-question-filler"> <strong> Please Write '1' if Single and '2' if Double </strong> </div> : null }
          {question.imageURL !== undefined ? Pal3Page.renderImage(question.imageURL) : null}
            {this.renderQuestion.bind(this)(question)}

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
