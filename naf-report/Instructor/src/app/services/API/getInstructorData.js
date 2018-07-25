// @flow weak

import { appConfig }  from '../../config';
import {
  defaultOptions,
  checkStatus,
  parseJSON,
  getLocationOrigin
}                     from '../fetchTools';

export const getEarningGraphData = () => {
  const url=`http://ec2-54-193-65-106.us-west-1.compute.amazonaws.com:8080/student/fetchStudentAnswers?sessionId=${sessionId}`;
  const options = {...defaultOptions};

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(error => error);
};
