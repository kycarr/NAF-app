import React from 'react';
import PropTypes from 'prop-types';

class TestLogRow extends React.Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    return (
          <tr>

            <td className="text-align-left">{this.props.testName}</td>
            <td className="text-align-left" className="text-align-left">{this.props.dateCompleted}</td>
            <td className="text-align-right">{this.props.attempts}</td>
            <td className="text-align-right">{this.props.highestScore}</td>
            <td className="text-align-left">{this.props.testResult}</td>
            <td className="text-align-left"><div id="sm-st-info-button" onClick={this.openNewTab(this.props.testName)}>More</div></td>
          </tr>
      );
  }
}






TestLogRow.propTypes = {
  testName: PropTypes.string,
  dateCompleted: PropTypes.string,
  attempts: PropTypes.number,
  highestScore: PropTypes.string,
  testResult: PropTypes.string,
  openNewTab: PropTypes.func
};

export default TestLogRow;