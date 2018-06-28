import React      from 'react';
import PropTypes  from 'prop-types';

class ModuleButton extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			color: 'gray'
		};
	}

	render() {
		return (
		<div className="topmodule">
			 <div className="sm-st-info" onClick = 
			 {this.props.chooseModule} style={{backgroundColor: this.state.color}}>
			 	<span>{this.props.name}</span>
			 </div>
		</div>
		);
	}

	chooseModule() {
		this.setState({
			color: '#f4ad42'
		});
		this.chooseModule(this.props.id);
	}

}



ModuleButton.PropTypes = {
	id: React.PropTypes.number,
	name: React.PropTypes.string,
	chooseModule: PropTypes.func
};

export default ModuleButton;