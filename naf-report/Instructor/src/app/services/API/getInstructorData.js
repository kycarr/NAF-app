// @flow weak

import { appConfig }  from '../../config';
import {
  defaultOptions,
  checkStatus,
  parseJSON,
  getLocationOrigin
}                     from '../fetchTools';

export const getInstructorData = () => {
  const url=`http://ec2-54-193-65-106.us-west-1.compute.amazonaws.com:8080/instructor/fetchInstructorData`;
  const options = {...defaultOptions};

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(error => error);
};
