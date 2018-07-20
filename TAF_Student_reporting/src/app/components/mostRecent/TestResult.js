import React from 'react';
import PropTypes from 'prop-types';
const tableHeadFontStyle = {
  'fontWeight': 'bold'
}
class TestResult extends React.Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    return (
          <div
            className="row"
            style={{marginBottom: '5px'}}>
            <h2 className="testhistory-title">Test Results:</h2>
            <div className="col-md-3 topcard-left">
              <div className="sm-st-info"><div>Test Name</div><span className="testname"><center>{this.props.testName}</center></span></div>
            </div>
            <div className="col-md-2 topcard">
               <div className="sm-st-info"><div>Test Score</div><span className="right-align-3">{this.props.testScore}</span></div>
            </div>
            <div className="col-md-2 topcard">
               <div className="sm-st-info"><div >Test %</div><span className="right-align-4">{this.props.testScorePercentage}</span></div>
            </div>
               <div className="col-md-2 topcard">
               <div className="sm-st-info"><div>Test Result</div><span className="right-align-3">{this.props.testResult}</span></div>
            </div>
               <div className="col-md-2 topcard-right">
               <div className="sm-st-info"><div>Class Rank</div><span className="right-align-3">2/15</span></div>
            </div>

        </div>
      );
  }
}






TestResult.propTypes = {
  testName: PropTypes.string,
  testScore: PropTypes.string,
  testScorePercentage: PropTypes.string,
  testResult: PropTypes.string,
  rank: PropTypes.string
};

export default TestResult;