import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class TestLogRow extends React.Component {

  constructor(props) {
    super(props);
    this.onClickFunction = this.onClickFunction.bind(this, this.props.session);
  }

  onClickFunction() {
    this.props.openNewTab(this.props.session);
  }

  render() {
    const time = moment(this.props.dateCompleted).format('MM/DD/YYYY');
    return (
          <tr>

            <td className="text-align-left">{this.props.testName}</td>
            <td className="text-align-left" className="text-align-left">{time}</td>
            <td className="text-align-right">{this.props.attempts}</td>
            <td className="text-align-right">{this.props.highestScore}</td>
            <td className="text-align-left">{this.props.testResult}</td>
            <td className="text-align-left"><div id="sm-st-info-button" onClick={this.onClickFunction}>More</div></td>
          </tr>
      );
  }
}






TestLogRow.propTypes = {
  session: PropTypes.string,
  testName: PropTypes.string,
  dateCompleted: PropTypes.string,
  attempts: PropTypes.number,
  highestScore: PropTypes.string,
  testResult: PropTypes.string,
  openNewTab: PropTypes.func
};

export default TestLogRow;