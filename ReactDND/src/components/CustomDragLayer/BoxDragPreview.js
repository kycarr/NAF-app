import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shouldPureComponentUpdate from './shouldPureComponentUpdate'
import Box from './Box'

const styles = {
	display: 'inline-block',
	transform: 'rotate(-7deg)',
	WebkitTransform: 'rotate(-7deg)',
}

export default class BoxDragPreview extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
	}


	constructor(props) {
		super(props)

	}


	render() {
		const { title } = this.props

		return (
			<div style={styles}>
				<Box title={title} />
			</div>
		)
	}
}
