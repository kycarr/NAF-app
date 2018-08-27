// @flow weak

import React      from 'react';
import PropTypes  from 'prop-types';

class TableRow extends React.Component {

  constructor(props) {
    super(props);
    this.onClickFunction = this.onClickFunction.bind(this);
  }

  onClickFunction() {
  	console.log("???????");
  	console.log(this.props.testName);
  	console.log("???????");
  
    this.props.openNewTab(this.props.testName);
  }

  render() {
    return (
          <tr>
          	{this.props.children}
          	<td className="text-align-left"><div id="sm-st-info-button" onClick={this.onClickFunction}>More</div></td>
          </tr>
      );
  }
}


TableRow.propTypes = {
  children: PropTypes.node.isRequired,
  testName: PropTypes.string,
  openNewTab: PropTypes.func
};

export default TableRow;
