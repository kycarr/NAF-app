// flow weak

/* eslint no-console:0 */
/* eslint consistent-return:0 */

/*
  imports
 */
import moment               from 'moment';
import { appConfig }        from '../../config';
import {
  getTestHistoryData
}                           from '../../services/API';

import {
  fetchInstructorMockData
}                           from '../../services/fetchMocks';
import * as ReduxTypes      from '../types';

/*
  constants
 */
const REQUEST_TESTHISTORY_DATA   = 'REQUEST_TESTHISTORY_DATA';
const RECEIVED_TESTHISTORY_DATA  = 'RECEIVED_TESTHISTORY_DATA';
const ERROR_TESTHISTORY_DATA     = 'ERROR_TESTHISTORY_DATA';



type testHistoryState = {
  isFetching: boolean,
  testHistoryData: Array,
  testLogData: Array,
  time: string
};

export function chooseModule(_module) {
  console.log(_module);
  return {
    type: REQUEST_TESTHISTORY_DATA,
    module: _module
  }
}

/*
  reducer
 */
const initialState: MostRecentState = {
  isFetching: false,
  testHistoryData: [],
  testLogData: []
};

//reducer

export default function testHistory(state = initialState, action) {
  switch (action.type) {
  case 'REQUEST_TESTHISTORY_DATA':
    return {
      ...state,
      isFetching: action.isFetching,
      time:       action.time
    };
  case 'RECEIVED_TESTHISTORY_DATA':
    return {
      ...state,
      isFetching: action.isFetching,
      testHistoryData: action.testHistoryData,
      testLogData: action.testLogData,
      time:       action.time
    };
  case 'ERROR_TESTHISTORY_DATA':
    return {
      ...state,
      isFetching: action.isFetching,
      time:       action.time
    };
  default:
    return state;
  }
}


 //action

export function fetchTestHistoryDataIfNeeded() {
  return (
    dispatch, 
    getState
  ) => {
    if (shouldFetchTestHistoryData(getState())) {
      return dispatch(fetchTestHistoryData());
    }
  };
}


function requestTestHistoryData(time = moment().format()) {
  return {
    type: REQUEST_TESTHISTORY_DATA,
    isFetching: true,
    time
  };
}


function receivedTestHistoryData(data, time = moment().format()) {
  return {
    type:       RECEIVED_TESTHISTORY_DATA,
    isFetching: false,
    testHistoryData:     [...data.testLogs],
    testLogData:    [...data.logArray],
    time
  };
}

function errorFetchTestHistoryData(error, time = moment().format()) {
  return {
    type:       ERROR_TESTHISTORY_DATA,
    isFetching: false,
    error,
    time
  };
}



function fetchTestHistoryData() {
  return dispatch => {
    dispatch(requestTestHistoryData());
    if (!appConfig.DEV_MODE) {
      // DEV ONLY
      fetchInstructorMockData()
        .then(
          data => dispatch(receivedTestHistoryData(data))
        );
    } else {
      getTestHistoryData()
        .then(
          data => dispatch(receivedTestHistoryData(data))
        )
        .catch(

          error => dispatch(console.log(error))
        );
    }
  };
}


function shouldFetchTestHistoryData(state) {
  const testHistoryStore = state.testHistory;
  if (testHistoryStore.isFetching) {
    return false;
  } else {
    return true;
  }
}
