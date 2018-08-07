// flow weak

/* eslint no-console:0 */
/* eslint consistent-return:0 */

/*
  imports
 */
import moment               from 'moment';
import { appConfig }        from '../../config';
import {
  getInstructorData
}                           from '../../services/API';
import {
  fetchInstructorMockData
}                           from '../../services/fetchMocks';
import * as ReduxTypes      from '../types';

/*
  constants
 */
const REQUEST_INSTRUCTOR_DATA   = 'REQUEST_INSTRUCTOR_DATA';
const RECEIVED_INSTRUCTOR_DATA  = 'RECEIVED_INSTRUCTOR_DATA';
const ERROR_INSTRUCTOR_DATA     = 'ERROR_INSTRUCTOR_DATA';

type MostRecentState = {
  isFetching: boolean,
  topics:     Array,
  trainees:   Array,
  results:    Object,
  byTopics:   Array,
  byTrainee:  Array,
  time:       string
};
/*
  reducer
 */
const initialState: MostRecentState = {
  isFetching: false,
  results:    {},
  topics:     [],
  time:       null,
  trainees:   [],
  byTopics:   [],
  byTrainee:  []
};

export default function mostRecent(state = initialState, action) {
  switch (action.type) {
  case 'REQUEST_INSTRUCTOR_DATA':
    return {
      ...state,
      isFetching: action.isFetching,
      time:       action.time
    };
  case 'RECEIVED_INSTRUCTOR_DATA':
    return {
      ...state,
      isFetching: action.isFetching,
      results:    action.results,
      topics:     action.topics,
      trainees:   action.trainees,
      byTopics:   action.byTopics,
      byTrainee:  action.byTrainee,
      time:       action.time
    };
  case 'ERROR_INSTRUCTOR_DATA':
    return {
      ...state,
      isFetching: action.isFetching,
      time:       action.time
    };
  default:
    return state;
  }
}


/*
  action creators
 */
export function fetchInstructorDataIfNeeded() {
  return (
    dispatch, 
    getState
  ) => {
    if (shouldFetchInstructorData(getState())) {
      return dispatch(fetchInstructorData());
    }
  };
}
function requestInstructorData(time = moment().format()) {
  return {
    type:       REQUEST_INSTRUCTOR_DATA,
    isFetching: true,
    time
  };
}
function receivedInstructorData(data, time = moment().format()) {
  console.log(data.results);
  return {
    type:       RECEIVED_INSTRUCTOR_DATA,
    isFetching: false,
    topics:     [...data.results.topics],
    results:    data.results,
    trainees:   [...data.trainees],
    byTopics:   [...data.byTopics],
    byTrainee:  [...data.byTrainee],
    time
  };
}

/*


 */
function errorFetchInstructorData(error, time = moment().format()) {
  return {
    type:       ERROR_INSTRUCTOR_DATA,
    isFetching: false,
    error,
    time
  };
}
function fetchInstructorData() {
  return dispatch => {
    dispatch(requestInstructorData());
    if (!appConfig.DEV_MODE) {
      // DEV ONLY
      fetchInstructorMockData()
        .then(
          data => dispatch(receivedInstructorData(data))
        );
    } else {
      getInstructorData()
        .then(
          data => dispatch(receivedInstructorData(data))
        )
        .catch(

          error => dispatch(console.log(error))
        );
    }
  };
}
function shouldFetchInstructorData(state) {
  const mostRecentStore = state.mostRecent;
  // just check wether fetching (assuming data could be refreshed and should not persist in store)
  if (mostRecentStore.isFetching) {
    return false;
  } else {
    return true;
  }
}
