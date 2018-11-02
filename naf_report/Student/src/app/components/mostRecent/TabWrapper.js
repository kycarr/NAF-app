import React, {
	PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import Collapsible from 'react-collapsible';
import RequirementsNotMet from './RequirementsNotMet';
import ScoreTable from './ScoreTable';
import TopicsGraph from './TopicsGraph';
import TestResult from './TestResult';

const headingStyle = {'textDecoration': 'underline', 'letterSpacing' : '1.1px', 'cursor' : 'pointer'};

class TabWrapper extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		var data = this.props.result.reportingData;
		const topicInput = {
			series: [],
			labels: data.topicLabel
		}
		topicInput.series[0] = data.topicValue;
		return (
			<div>
				<TestResult testName={data.testName} testScore={data.testScore} testScorePercentage={data.testScorePercentage} testResult={data.testResult} />

	          	<div className="row" >
		            <div className="col-md-12">
		            <Collapsible
		                open
		                trigger={<div className='collapsible-icon-second'><div className='bycollapse-title'><i className='fa fa-caret-right-collpase'></i><span style={headingStyle} >Topics: </span> </div> </div>}
		            >
		            <div className="col-md-7 horizontalbar-div"  >
		              <TopicsGraph data={topicInput}/>
		            </div>
		            {
		            /*
		            
		             <div className="col-md-4 horizontalbar-div">
		              <ScoreTable />
		            </div>
		        	*/
		        	}
		            </Collapsible>
		          </div>
		        </div>
		      	<RequirementsNotMet requirementsNotMetObject={data.requirementsNotMetObject} />
			</div>
		);

	}
}
TabWrapper.propTypes = {
	result: PropTypes.object
};

export default TabWrapper;
