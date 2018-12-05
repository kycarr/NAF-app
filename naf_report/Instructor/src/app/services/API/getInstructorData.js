// @flow weak

import { appConfig }  from '../../config';
import {
  defaultOptions,
  checkStatus,
  parseJSON,
  getLocationOrigin
}                     from '../fetchTools';
import "isomorphic-fetch";

export const getInstructorData = () => {
  const url=`http://ec2-54-193-65-106.us-west-1.compute.amazonaws.com:8080/instructor/fetchInstructorData`;
  // const url=`http://localhost:8080/instructor/fetchInstructorData`;

  const options = {...defaultOptions};

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(error => error);
};

export const getTestHistoryData = () => {
    const url=`http://ec2-54-193-65-106.us-west-1.compute.amazonaws.com:8080/instructor/fetchTestHistory`;

  // const url=`http://localhost:8080/instructor/fetchTestHistory`;
  const options = {...defaultOptions};

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(error => error);
};