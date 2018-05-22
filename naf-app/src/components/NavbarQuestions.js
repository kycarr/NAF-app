import React, {Component} from 'react';
import imgBookmarkOn from '../images/NAF_Icon_BookmarkOn.png';
import imgBookmarkOff from '../images/NAF_Icon_BookmarkOff.png';
import {TOOLBAR_HEIGHT, SCROLL_SPEED} from '../Utils';
import {connect} from 'react-redux';
import {changeBookmark} from '../actions'
import PropTypes from 'prop-types';
import scrollToElement from "scroll-to-element";

class NavbarQuestions extends Component {
  constructor(props) {
    super(props);
    NavbarQuestions.handleScrollToElement = NavbarQuestions.handleScrollToElement.bind(this);
  }

  static handleScrollToElement(questionId) {
    let ele = document.getElementById("question" + questionId);
    scrollToElement(ele, {
      offset: -TOOLBAR_HEIGHT,
      duration: SCROLL_SPEED
    });
  }

  render() {
    const waypointNumber = this.props.wayPointNum;

    return (
      <div>
        <div className={((this.props.lineNum > 0) && (this.props.lineNum === waypointNumber)) ? "arrow-right" : "arrow-spacing-right"}></div>
        <div className="nav-question">
          <div className = "image-bookmark">
            <div key = {this.props.question.id} 
              className = {this.props.answered ? "nav-question-selected" : "nav-question-unselected"}
              onClick = {() => NavbarQuestions.handleScrollToElement(this.props.question.id)}>
                {this.props.lineNum}
            </div>
          </div>
          <div className = "image-bookmark">
            <img src = {this.props.bookmarked ? imgBookmarkOn : imgBookmarkOff} alt = "bookmark"
              onClick = {() => this.props.changeBookmark(this.props.question.id)}/>
          </div>
        </div>
        <div className={((this.props.lineNum > 0) && (this.props.lineNum === waypointNumber)) ? "arrow-left" : "arrow-spacing-left"}></div>
      </div>
    )
  }
}

export default connect(null, {changeBookmark})(NavbarQuestions);
