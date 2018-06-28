import React      from 'react';
import PropTypes  from 'prop-types';

class ModuleButton extends React.Component {

	constructor(props) {
		super(props);
		this.clickFunction = this.clickFunction.bind(this);

	}

	render() {
		return (
		<div className="topmodule" style={{backgroundColor: this.props.selected ? '#427d90' : 'gray'}} >
			 <div className="sm-st-info" onClick = 
			 {this.clickFunction} >
			 	<span>{this.props.name}</span>
			 </div>
		</div>
		);
	}

	clickFunction() {

		this.props.chooseModule(this.props.id);
	}

}



ModuleButton.propTypes = {
	index: PropTypes.number,
	id: PropTypes.number,
	name: PropTypes.string,
	selected: PropTypes.bool,
	chooseModule: PropTypes.func
};

export default ModuleButton;