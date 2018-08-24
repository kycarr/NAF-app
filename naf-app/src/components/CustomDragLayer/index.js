import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Container from './Container'
import CustomDragLayer from './CustomDragLayer'

class DragAroundCustomDragLayer extends Component {
	constructor(props) {
		super(props)

		this.handleSnapToGridAfterDropChange = this.handleSnapToGridAfterDropChange.bind(
			this,
		)
		this.handleSnapToGridWhileDraggingChange = this.handleSnapToGridWhileDraggingChange.bind(
			this,
		)

		this.state = {
			snapToGridAfterDrop: false,
			snapToGridWhileDragging: false,
		}
	}

	render() {
		const { snapToGridAfterDrop, snapToGridWhileDragging } = this.state;

		return (
			<div className="dragdrop-type">
				<Container snapToGrid={snapToGridAfterDrop} triggerMark={this.props.triggerMark} id={this.props.id}/>
				<CustomDragLayer snapToGrid={snapToGridWhileDragging} />
			</div>
		)
	}

	handleSnapToGridAfterDropChange() {
		this.setState({
			snapToGridAfterDrop: !this.state.snapToGridAfterDrop,
		})
	}

	handleSnapToGridWhileDraggingChange() {
		this.setState({
			snapToGridWhileDragging: !this.state.snapToGridWhileDragging,
		})
	}
}

export default DragDropContext(HTML5Backend)(DragAroundCustomDragLayer);
