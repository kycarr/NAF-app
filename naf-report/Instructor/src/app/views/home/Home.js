// flow weak

import React, {
	PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import {
	AnimatedView,
	StatsCard,
	EarningGraph,
	Notifications,
	WorkProgress,
	ClassTestLog,
	ModuleList,
	RequirementsWrapper,
	MostRecentWrapper
} from '../../components';
import ReactDOM from 'react-dom';
import ChartistGraph from 'react-chartist';
import '../../style/chartist.css';
import HeatMap from 'react-heatmap-grid';
import $ from 'jquery';
import Collapsible from 'react-collapsible';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export function getRange(count) {
	return Array.from({ length: count }, (_, i) => i);
}
export function randomData(N, max, long){
	return (
	Array.apply(null, Array(N || 5))
		.map(function(v){
			return {
				v: Math.floor(Math.random() * (max || 20)) + 1,
				label: long ? faker.name.findName() : faker.name.firstName()
			}
		})
	)
}
var formatter = function (value){
	return frmttr()(value).regular
}

const modules = [
	{
		id: '1',
		name: "Module 01",
		selected: true
	},
	{
		id: '2',
		name: "Module 02",
		selected: false
	},
	{
		id: '3',
		name: "Module 03",
		selected: false
	},
	{
		id: '4',
		name: "Module 04",
		selected: false
	}
]
export function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function shiftDate(date, numDays) {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + numDays);
	return newDate;
}
function generateRandomValues(count, date = new Date()) {
		return getRange(count).map((index) => {
			return {
				date: shiftDate(date, -index),
				count: getRandomInt(1, 150),
			};
		})
	}
class Home extends React.Component {

	static propTypes = {
		earningGraphLabels:   PropTypes.array,
		earningGraphDatasets: PropTypes.array,
		teamMatesIsFetching:  PropTypes.bool,
		instructorResults:    PropTypes.object,
		instructorTopics:     PropTypes.array,
		testLogData:          PropTypes.array,
		testHistoryData: 	  PropTypes.array,
		teamMates:            PropTypes.arrayOf(
			PropTypes.shape({
				picture:      PropTypes.string,
				firstname:    PropTypes.string,
				lastname:     PropTypes.string,
				profile:      PropTypes.string,
				profileColor: PropTypes.oneOf(['danger', 'warning', 'info', 'success'])
			})
		),
		actions: PropTypes.shape({
			enterHome: PropTypes.func,
			leaveHome: PropTypes.func,
			fetchEarningGraphDataIfNeeded:  PropTypes.func,
			fetchTeamMatesDataIfNeeded:     PropTypes.func,
			chooseModule: PropTypes.func,
			fetchInstructorDataIfNeeded: PropTypes.func,
			fetchTestHistoryDataIfNeeded: PropTypes.func
		})
	}; 
	constructor(props, context) {
		super(props, context);

		this.handleSelect = this.handleSelect.bind(this);
		this.customTitleForValue = this.customTitleForValue.bind(this);
		this.reloadHeat = this.reloadHeat.bind(this);
		this.selectModule = this.selectModule.bind(this);
		this.openNewTab = this.openNewTab.bind(this);
		this.closeTab = this.closeTab.bind(this);
		this.state = {
			heatmapdata:[],
			key: 1,
			heatData:null,
			data: {
				labels: ['Topic 9', 'Topic 7', 'Topic 4', 'Topic 1'],
				series: [
					[-12, -10, -7, -5],
					[3, 5, 8, 10]
				]
			},
			options : {
				seriesBarDistance: 0,
				reverseData: true,
				horizontalBars: true,
				axisX: {
				 offset: 70,
				 onlyInteger: true,
				labelInterpolationFnc: function(value) {
					return Math.abs(value) ;
					}
				},
				height: '350px'
			}
		};
		this.state.tabs = [];
	}
	componentWillMount() {
		const { actions: { enterHome } } = this.props;
		enterHome();
		
	}

	componentDidMount() {
		const {
			actions: {
				fetchEarningGraphDataIfNeeded,
				fetchTeamMatesDataIfNeeded,
				fetchInstructorDataIfNeeded,
				fetchTestHistoryDataIfNeeded
			}
		} = this.props;
		fetchEarningGraphDataIfNeeded();
		fetchTeamMatesDataIfNeeded();
		fetchInstructorDataIfNeeded();
		fetchTestHistoryDataIfNeeded();
		 $('.heatmap-div div[title]').each(function(i, obj) {
	  if($(obj)[0].title.trim() < 20 ) {
	  	$(obj)[0]['style'].background='red';
	  	$(obj)[0]['style'].opacity='1';
	  }
	  else if($(obj)[0].title.trim() > 20  && $(obj)[0].title < 50) {
	  	$(obj)[0]['style'].background='yellow';
	  	$(obj)[0]['style'].opacity='1';
	  }
	  else if($(obj)[0].title.trim() > 50 ) {
	  	$(obj)[0]['style'].background='green';
	  	$(obj)[0]['style'].opacity='1';
	  }
      if(!isNaN($(obj)[0].title)) {
      console.log('obj' + obj);
      
  }
});
	const xLabels = new Array(44).fill(0).map((_, i) => `Topic ${i+1}`);
	const yLabels = ['Class 9', 'Class 10', 'Class 13', 'Class 5', 'Class 6', 'Class 7', 'Class 3', 'Class 2', 'Class 8', 'Class 11'];
	const data = new Array(yLabels.length)
			.fill(0)
			.map(() => new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100)));
			
	  this.setState({'heatmapdata':data});
	}

	componentWillUnmount() {
		const { actions: { leaveHome } } = this.props;
		leaveHome();
	}

	componentDidUpdate() {
	 $('.heatmap-div div[title]').each(function(i, obj) {
			  if($(obj)[0].title.trim() < 20 ) {
			  	$(obj)[0]['style'].background='red';
			  	$(obj)[0]['style'].opacity='1';
			  }
			  else if($(obj)[0].title.trim() >= 20  && $(obj)[0].title <= 40) {
			  	$(obj)[0]['style'].background='yellow';
			  	$(obj)[0]['style'].opacity='1';
			  }
			  else if($(obj)[0].title.trim() >= 50 ) {
			  	$(obj)[0]['style'].background='green';
			  	$(obj)[0]['style'].opacity='1';
			  }
			  else {
			  	$(obj)[0]['style'].background='white';
			  	$(obj)[0]['style'].opacity='1';
			  }
		      if(!isNaN($(obj)[0].title)) {
		      	console.log("not a numebr");
		  }
	});
}
	handleSelect(key) {
		const data = this.state.data;
		const options = this.state.options;
		this.setState({ key, data, options });
		document.querySelector('.ct-chart').__chartist__.update();
	}

	openNewTab(testname) {
		let data = this.props.testHistoryData;
		let target = {};
		for(let i = 0; i < data.length; i++) {
			if(data[i].results.testName === testname) {
				target = data[i];
			}
		}
		this.setState({
  			tabs: [...this.state.tabs, target]
		});
	}

	loadHeatmap(index) {
	const xLabels = new Array(15).fill(0).map((_, i) => `Topic ${i+1}`);
	const yLabels = ['Class 9', 'Class 10', 'Class 13', 'Class 5', 'Class 6', 'Class 7', 'Class 3', 'Class 2', 'Class 8', 'Class 11'];
	const data = new Array(yLabels.length)
			.fill(0)
			.map(() => new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100)));
			
	  this.setState({'heatmapdata':data});

	}
	selectModule(module) {
		const {
			actions: {
				chooseModule
			}
		} = this.props;
		chooseModule(module);
		// this.reloadHeat();
	}

	closeTab(testName) {
		let newTabs = this.state.tabs.filter((ele, index) => {
			return ele.results.testName !== testName;
		});
		this.setState({
			tabs: newTabs
		});
	}

	reloadHeat() {
			this.setState({heatData:null});
	}
	resize = () => this.forceUpdate();
	customTitleForValue(value) {
		return value ? `You're hovering over ${value.date.toDateString()} with value ${value.count}` : null;
	}
	render() {
		const {
			teamMates,
			teamMatesIsFetching,
			earningGraphLabels,
			earningGraphDatasets
		} = this.props;
		
		const randomValues = generateRandomValues(2000);
		const xLabels = new Array(15).fill(0).map((_, i) => `Topic ${i+1}`);
		const yLabels = ['Class 9', 'Class 10', 'Class 13', 'Class 5', 'Class 6', 'Class 7', 'Class 3', 'Class 2', 'Class 8', 'Class 11'];
		// console.log('this.state.heatmapdata' + this.state.heatmapdata);
		return(
			<AnimatedView>
			 <Tabs>
				<TabList>
					<Tab>Most Recent</Tab>
					<Tab onClick={this.loadHeatmap.bind(this, 0)}>Test History</Tab>
					    {this.state.tabs.map((ele,index) => (
	      					<Tab onClick={this.loadHeatmap.bind(this, 0)}
	      					key={index}
	      					>{ele.results.testName}
	      					</Tab>
					    ))}
				</TabList>

				<TabPanel title="Most Recent: ">
					<MostRecentWrapper results={this.props.instructorResults} topics={this.props.instructorTopics} trainees={this.props.instructorTrainees}
					 byTopics={this.props.instructorbyTopics} byTrainee={this.props.instructorbyTrainee}/>
				</TabPanel>
					<TabPanel title="Test History">
						<h2 className="testhistory-title">Test History:</h2>

						<div className="horiz-scroll-module">
		 					<div
								className=" col-md-12 row horiz-model-inside"
								style={{marginBottom: '5px'}}>
								<div>
									<ModuleList modules={modules} selectModule={this.selectModule} currentModule={this.props.currentModule}/>
								</div>
							 </div>
							</div>

							<div className="row">
								<div className="col-md-12">
								<div className="horiz-scroll">
								 <div className="heatmap-div">
						<HeatMap
									xLabels={xLabels}
									yLabels={yLabels}
									data={this.state.heatmapdata}
									background={'green'}
									onLoad={this.loadHeatmap}
								/>
								</div>
								</div>
								</div>
							</div>
							<div style={{marginTop : '50px'}}>
								<div className="row collapsible-row">
									<div className="col-md-12">
			 							<Collapsible open trigger={<span className='collapsible-icon'><i className='fa fa-caret-right-collpase'></i>Class Test Log</span>}>
										<div className="collapsible-paragraph">
											<ClassTestLog openNewTab={this.openNewTab} testLogData={this.props.testLogData}/>
										</div>
										</Collapsible>
									</div>

								</div>
							</div>
					</TabPanel>
					    {this.state.tabs.map((ele,index) => (
	      					<TabPanel title={ele.results.testName} key={index} >
								<MostRecentWrapper results={ele.results} topics={ele.results.topics} trainees={ele.trainees}
					 byTopics={ele.byTopics} byTrainee={ele.byTrainee} closeTab={this.closeTab}/>
	      					</TabPanel>
					    ))}
				</Tabs>
			</AnimatedView>
		);
	}
}

export default Home;
