import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { DropTarget } from 'react-dnd';
import shouldPureComponentUpdate from './shouldPureComponentUpdate';
import ItemTypes from './ItemTypes';
import DraggableBox from './DraggableBox';
import snapToGrid from './snapToGrid';
import Background from './Picture1.png';
import Picture2 from './Picture2.png';
import Picture3 from './Picture3.png';
import Picture4 from './Picture4.png';
import Picture5 from './Picture5.png';
import Picture6 from './Picture6.png';

const styles = {
	width: 800,
	height: 600,
	border: '1px solid black',
	position: 'relative',
	backgroundImage:  "url(" + Background + ")",
	backgroundSize: 'contain'
}

const boxTarget = {
	drop(props, monitor, component) {
		const delta = monitor.getDifferenceFromInitialOffset()
		const item = monitor.getItem()

		let left = Math.round(item.left + delta.x)
		let top = Math.round(item.top + delta.y)
		if (props.snapToGrid) {
			;[left, top] = snapToGrid(left, top)
		}

		component.moveBox(item.id, left, top)
	},
}

class Container extends Component {
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		snapToGrid: PropTypes.bool.isRequired,
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	constructor(props) {
		super(props)
		this.state = {
			boxes: {
				a: { top: 620, left: 0, title: Picture2},
				b: { top: 620, left: 150, title: Picture3 },
				c: { top: 680, left: 0, title: Picture4 },
				d: { top: 740, left: 0, title: Picture5 },
				e: { top: 800, left: 0, title: Picture6 },
			},
		}
	}

	moveBox(id, left, top) {
		this.setState(
			update(this.state, {
				boxes: {
					[id]: {
						$merge: { left, top },
					},
				},
			}),
		)
	}

	renderBox(item, key) {
		return <DraggableBox key={key} id={key} {...item} />
	}

	render() {
		const { connectDropTarget } = this.props
		const { boxes } = this.state

		return connectDropTarget(
			<div style={styles}>
				{Object.keys(boxes).map(key => this.renderBox(boxes[key], key))}
			</div>,
		)
	}
}

function collect(connect) {
	return {connectDropTarget: connect.dropTarget()};
}

export default DropTarget(ItemTypes.BOX, boxTarget, collect)(Container);

