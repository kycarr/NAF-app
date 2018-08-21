import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import { DropTarget } from 'react-dnd'
import shouldPureComponentUpdate from './shouldPureComponentUpdate'
import ItemTypes from './ItemTypes'
import DraggableBox from './DraggableBox'
import snapToGrid from './snapToGrid'
import Background from './Picture1.png'


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

@DropTarget(ItemTypes.BOX, boxTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
export default class Container extends Component {
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		snapToGrid: PropTypes.bool.isRequired,
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	constructor(props) {
		super(props)
		this.state = {
			boxes: {
				a: { top: 620, left: 0, title: "http://localhost:8080/Picture2.png" },
				b: { top: 620, left: 100, title: "http://localhost:8080/Picture3.png" },
				c: { top: 620, left: 200, title: "http://localhost:8080/Picture4.png" },
				d: { top: 620, left: 300, title: "http://localhost:8080/Picture5.png" },
				e: { top: 620, left: 400, title: "http://localhost:8080/Picture6.png" },

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
