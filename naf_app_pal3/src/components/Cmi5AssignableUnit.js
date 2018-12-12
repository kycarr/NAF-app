import React, { Component } from 'react';
import Pal3Page from './Pal3Page';
const CMI_STATUS = {
  NONE: 0,
  LOADING: 1,
  READY: 2,
  RESULT_SENT: 3,
  ERROR: -1
}
const url = "http://qa-pal.ict.usc.edu/cmi5/?fetch=http://qa-pal.ict.usc.edu/api/1.0/cmi5/accesstoken2basictoken?access_token=8847d000-dba3-11e8-a05b-c40010c9cc01&endpoint=http://qa-pal.ict.usc.edu/api/1.0/cmi5/&activityId=http://pal.ict.usc.edu/activities/claire-the-counselor&registration=957f56b7-1d34-4b01-9408-3ffeb2053b28&actor=%7B%22objectType%22:%20%22Agent%22,%22name%22:%20%22clairelearner1%22,%22account%22:%20%7B%22homePage%22:%20%22http://pal.ict.usc.edu/xapi/users%22,%22name%22:%20%225bd749146b66c40010c9cc01%22%7D%7D"

/**
 * A reusable wrapper Component that handles cmi initialization
 * for a question (cmi5 assignable unit), which should be a child component.
 *
 * Cmi5AssignableUnit will inject the following props to it's child:
 *
 * passed:
 * A function for the assignable unit to call when the question was answered correctly.
 * For arguments, accepts either a single normalized score (0-1) value
 * or an object that's a valid XAPI result 'score'
 * @see https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#Score
 *
 * failed:
 * A function for the assignable unit to call when the question was answered incorrectly.
 * For arguments, accepts either a single normalized score (0-1) value
 * or an object that's a valid XAPI result 'score'
 * @see https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#Score
 *
 * cmi:
 * the Cmi5 instance, which can be used directly
 * @see ../public/cm5.js
 *
 * The actions for 'passed' and 'failed' are injected to child components
 * to provide a simple/safe way to submit results: this wrapped will handle
 * the actual initialization of cmi5,
 * and if either of the inject 'passed' or 'failed' functions is called
 * before cmi5 is ready, it will store the result and submit when ready.
 */
export default class Cmi5AssignableUnit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cmiStatus: CMI_STATUS.NONE
    }
    this.trySubmitScore = this.trySubmitScore.bind(this);
    this.passed = this.passed.bind(this);
    this.failed = this.failed.bind(this);
  }

  passed(score) {
    this.trySubmitScore(score, true)
  }

  failed(score) {
    this.trySubmitScore(score, false)
  }

  trySubmitScore(result, isPassing) {
    const score = isNaN(Number(result))? result: { scaled: Number(result) }
    switch(this.state.cmiStatus) {
      case CMI_STATUS.READY:
        if(isPassing) {
          this.state.cmi.passed(score)
        }
        else {
          this.state.cmi.failed(score)
        }
        this.setState({
          ...this.state,
          cmiStatus: CMI_STATUS.RESULT_SENT
        })
        break
      case CMI_STATUS.RESULT_SENT:
        console.log('result already sent')
        break
      default:
        // save the score to submit when cmi is ready
        this.setState({
          ...this.state,
          scorePendingSubmit: { score, isPassing }
        })
        break
    }
  }

  componentDidMount()
  {
    try {
      const Cmi5 = window.Cmi5
      const cmi = new Cmi5(url)

      cmi.start((err, result) => {
        if(err) {
          this.setState({
            ...this.state,
            cmiStatus: CMI_STATUS.ERROR,
            cmiMessage: err.message
          })
          console.error(err)
          return
        }

        console.log('ok!')
        this.setState({
          ...this.state,
          cmiStatus: CMI_STATUS.READY,
        })
      })

      this.setState({
        ...this.state,
        cmi: cmi
      })
    }
    catch(errInit) {
      console.error(`error loading cmi: ${errInit.message}`)
      this.setState({
        ...this.state,
        cmiStatus: CMI_STATUS.NONE,
        cmiMessage: errInit.message
      })
    }

  }

  render()
  {
    switch(this.state.cmiStatus) {
      case CMI_STATUS.READY:
        if(this.state.scorePendingSubmit) {
          this.trySubmitScore(
            this.state.scorePendingSubmit.score,
            this.state.scorePendingSubmit.isPassing
          )
        }
        break
      case CMI_STATUS.ERROR:
        console.error(`cmi error: ${this.state.cmiMessage}`)
        break
      default:
        console.log(`cmi status updated to ${this.state.cmiStatus}`)
    }

    return(
    <div>
      <Pal3Page passed={this.passed} failed={this.failed}>
      </Pal3Page>
    </div>
    )
   }
 }
