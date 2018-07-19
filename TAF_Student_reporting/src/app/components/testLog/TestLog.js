import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';
import TestLogRow from './TestLogRow';
const headingStyle = {'textDecoration': 'underline', 'letterSpacing' : '1.1px', 'cursor' : 'pointer'};
const tableHeadFontStyle = {
  'fontWeight': 'bold'
}
class TestLog extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log("????????????");
    console.log(this.props.testLogData);
    console.log("???????????");
    var logData = this.props.testLogData;

    return (
          <Collapsible open trigger={<div className='collapsible-icon-second'><div className='bycollapse-title'><i className='fa fa-caret-right-collpase'></i><span style={headingStyle} >Test Log: </span></div></div>}>
            <div className="col-md-12">
              <div className="panel-body table-responsive test-log-student">

                <table className="table table-hover">
                  <thead>
                    <tr>

                      <td style={tableHeadFontStyle} >Test Name</td>
                      <td style={tableHeadFontStyle} >Date Completed</td>
                      <td style={tableHeadFontStyle} >Attempt &nbsp; #</td>
                      <td style={tableHeadFontStyle} >Total Score</td>
                      <td style={tableHeadFontStyle} >Result</td>
                      <td style={tableHeadFontStyle}></td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        Object.keys(logData).map(key => {

                            var testLog = logData[key];
                            return (<TestLogRow testName={testLog['testName']}
                            dateCompleted={testLog['date']}
                            attempts={testLog['attempts']}
                            date={testLog['date']}
                            highestScore={testLog['testScore']}
                            testResult={testLog['testResult']}
                            openNewTab={this.props.openNewTab}
                            />);
                        })
                    }
                  </tbody>
              </table>
              </div>
            </div>
          </Collapsible>
    );
  }

}



TestLog.propTypes = {
  testLogData: PropTypes.object,
  openNewTab: PropTypes.func
};

export default TestLog;
