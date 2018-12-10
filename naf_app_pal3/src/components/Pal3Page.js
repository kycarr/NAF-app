import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import {Link} from "react-router-dom";

import '../styles/App.css';
import ToolbarLoginComponent from './ToolbarLogin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const url = "http://qa-pal.ict.usc.edu/cmi5/?fetch=http://qa-pal.ict.usc.edu/api/1.0/cmi5/accesstoken2basictoken?access_token=8847d000-dba3-11e8-a05b-c40010c9cc01&endpoint=http://qa-pal.ict.usc.edu/api/1.0/cmi5/&activityId=http://pal.ict.usc.edu/activities/claire-the-counselor&registration=957f56b7-1d34-4b01-9408-3ffeb2053b28&actor=%7B%22objectType%22:%20%22Agent%22,%22name%22:%20%22clairelearner1%22,%22account%22:%20%7B%22homePage%22:%20%22http://pal.ict.usc.edu/xapi/users%22,%22name%22:%20%225bd749146b66c40010c9cc01%22%7D%7D"

const findExistingRecordsForActivityId = function(params, cmi, callback) {
      if(typeof(params) === 'function') {
        callback = params
      }
      params = params || {}
      params["agent"] = cmi.getActor()
      params["activity"] = cmi.getActivity()
      cmi.getLRS().queryStatements(
        {
          params: params,
          callback: callback
        }
      )
}


const findSavedCommitment = function(cmi, callback) {
  findExistingRecordsForActivityId(
    {
      verb: "http://adlnet.gov/expapi/verbs/passed"
    },
    cmi,
    function(err, sr) {
      if(err) {
        return callback(err)
      }
      if(sr === null || !Array.isArray(sr.statements) || sr.statements.length === 0) {
        return callback() // nothing saved
      }
      // sr.sort(function(a, b) { return a.stored > b.stored? -1: 1 })
      console.log(sr);
      const last = sr.statements[0];

      // console.log(`found commitment statement ${JSON.stringify(last)}`)
      const commitment = last.result !== null && last.result.score !== null?
        last.result.score.raw: null
      return callback(null, commitment)
    }
  )
}

class Pal3Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  	return (
		  <div className="container">
	      	<div id="loading" className="row">
      			loading...
    		</div>
		    <div id="ready" className="row">
		      <div className="col-lg-1 col-md-1 col-sm-1">
		        <div className="form-group">
		          <input type="radio" id="r1" className="form-control" name="commitment" value="1" defaultChecked />
		          <label htmlFor="r1">Warm Up</label>
		        </div>
		        <div className="form-group">
		          <input type="radio" id="r2" className="form-control" name="commitment" value="2"  />
		          <label htmlFor="r2">Casual</label>
		        </div>
		        <div className="form-group">
		          <input type="radio" id="r3" className="form-control" name="commitment" value="3"  />
		          <label htmlFor="r3">Active</label>
		        </div>
		        <div className="form-group">
		          <input type="radio" id="r4" className="form-control" name="commitment" value="4"  />
		          <label htmlFor="r4">Serious</label>
		        </div>
		        <div className="form-group">
		          <input type="radio" id="r5" className="form-control" name="commitment" value="5"  />
		          <label htmlFor="r5">Hard Core</label>
		        </div>
		        <div className="form-group">
		          <input type="radio" id="r6" className="form-control" name="commitment" value="6"  />
		          <label htmlFor="r6">Relentless</label>
		        </div>
		        <div className="form-group">
		          <button type="button" id="savebutton" className="btn">submit</button>
		        </div>
		      </div>
		    </div>
		  </div>
  		);
  }

  componentDidMount() {
    console.log(window.location.href);
    window.Cmi5.enableDebug(true);
    const cmi = new window.Cmi5(url);
    cmi.start(function(err, result) {
      findSavedCommitment(cmi, function(err, commitment) {
        console.log(`found commitment ${commitment}`);
        })
      });
  }
}


function mapStateToProps(state) {
  return {
    name: state.auth.name,
    userId: state.auth.userId,
    sessionId: state.QuestionsOnAPage.sessionId,
    pass: state.QuestionsOnAPage.pass,
    score: state.QuestionsOnAPage.score
  }
}

export default connect(mapStateToProps, {})(Pal3Page);
