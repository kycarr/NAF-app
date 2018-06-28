import React from 'react';
import PropTypes from 'prop-types';
import ModuleButton from './ModuleButton';



class ModuleList extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div>
				{this.props.modules.map((module) =>
					<ModuleButton id={module._id} name={module.name} chooseModule={this.props.chooseModule} />
				)}
			</div>

		);
	}


}

ModuleList.propTypes = {
	modules: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			name: PropTypes.string,
		})
	),
	chooseModule: PropTypes.func
}



export default ModuleList;
