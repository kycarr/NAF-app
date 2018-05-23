export const OPTION_SELECTED = "option_selected";
export const GO_TO_PAGE = "goToPage";
export const GO_TO_SECTION = "goToSection";
export const QUESTION_ANSWERED = "question_answered";
export const SET_TO_DEFAULT = "set_to_default";
export const CHANGE_BOOKMARK = "change_bookmark";
export const LINE_NUMBER = "lineNumber";
export const RESET_TIMER_TIME = "reset_timer_time";

export function optionSelected(questionId, option) {
  return {
    type: OPTION_SELECTED,
    payload: {questionId: questionId, option: option}
  };
}

export function goToPage(pageNumber) {
  return {
    type: GO_TO_PAGE,
    payload: pageNumber
  }
}

export function goToSection(sectionNumber) {
  return {
    type: GO_TO_SECTION,
    payload: sectionNumber
  }
}

export function questionAnswered(questionId, answer) {
  return {
    type: QUESTION_ANSWERED,
    payload: {questionId: questionId, answer: answer}
  };
}

export function changeBookmark(questionId) {
  return {
    type: CHANGE_BOOKMARK,
    payload: {questionId: questionId},
  }
}

export function resetToDefaultState() {
  return {
    type: SET_TO_DEFAULT,
  }
}

export function resetTimerTime() {
  return {
    type: RESET_TIMER_TIME,
  }
}

export function WayPointSection(lineNumber) {

   console.log("lineNumber: " + lineNumber);
  return {
    type: LINE_NUMBER,
    payload: lineNumber
  }
}