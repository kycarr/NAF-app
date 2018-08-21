import React, { Component } from 'react';
import DragAroundCustomDragLayer from './CustomDragLayer';

export default class App extends Component {

  constructor(props) {
  	super(props);
  }	




  render() {
    return (
    	<div>
     <DragAroundCustomDragLayer />
		</div>
      
    );
  }
}
