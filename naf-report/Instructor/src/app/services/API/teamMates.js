// @flow weak

import { appConfig }  from '../../config';
import {
  defaultOptions,
  checkStatus,
  parseJSON,
  getLocationOrigin
}                     from '../fetchTools';
import "isomorphic-fetch";

export const getTeamMatesData = () => {
  const url = `${getLocationOrigin()}/${appConfig.teamMates.data.API}`;
  const options = {...defaultOptions};

  fetch(url, options)
  .then(checkStatus)
  .then(parseJSON)
  .then(data => data)
  .catch(error => error);
};
