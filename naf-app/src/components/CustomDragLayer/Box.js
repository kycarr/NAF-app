import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from './shouldPureComponentUpdate';
import Background from './Picture2.png';

const styles = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	cursor: 'move',

}

export default class Box extends Component {

	render() {
		const { title } = this.props
		return <div style={styles}>
		<img src={title} />
		</div>
	}
}
