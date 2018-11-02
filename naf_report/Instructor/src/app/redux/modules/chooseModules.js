import { appConfig }        from '../../config';
// import {
//   getEarningGraphData
// }                           from '../../services/API';
// import {
//   fetchMockEarningGraphData
// }                           from '../../services/fetchMocks';
import * as ReduxTypes      from '../types';

/*
  constants
 */
const REQUEST_MODULE_DATA   = 'REQUEST_MODULE_DATA';
const RECEIVED_MODULE_DATA  = 'RECEIVED_MODULE_DATA';
const ERROR_MODULE_DATA     = 'ERROR_MODULE_DATA';

type ModuleDataset = {
  label: string,
  traineeData: Array<number>,
  heatMapData: Array<number>
};


type ModuleState = {
  isFetching: boolean,
  labels:     Array<string>,
  datasets:   Array<ModuleDataset>,
  currentModule: string
};

/*
  reducer
 */
const initialState: ModuleState = {
  isFetching: false,
  currentModule: "Module 01",
  labels:     [],
  datasets:   [],
};

//reducer

 export default function chooseModules(state = initialState, action) {
 	switch (action.type) {
 		case REQUEST_MODULE_DATA:
 			return {
				...state,
				currentModule: action.module
 			};
 		default:
 			return state;
 	}
 }


export function chooseModule(_module) {
	return {
		type: REQUEST_MODULE_DATA,
		module: _module
	}
}