import React, { Component } from 'react';
import ImageMapper from './ImageMapper.js';

export default class App extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
  		msg : '',
  		x: 0,
  		y:0,
  		visited: []
  	};
  }	

  load() {
  	this.setState({ msg: 'Interact with image !' });
  }

  clicked(area) {
  	console.log('inside clicked');
    this.state.visited = [];
  	this.setState({ msg: 'You clicked on ' + area.shape + ' at coords ' + JSON.stringify(area.coords) + ' !' });
  }

  clickedOutside(evt) {
  	console.log('inside clickedOutside');
  	const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
  	const areaObject = {shape: "rect", coords: [coords.x-20, coords.y-20, coords.x + 20, coords.y + 20] };
  	const currentVisited = this.state.visited;
  	currentVisited.push(areaObject);

	this.setState({ msg: 'You clicked on the image at coords ' + JSON.stringify(coords) + ' !' , x: coords.x, y: coords.y, visited: currentVisited});
  }

  enterArea(area) {
  	console.log(this.state);
  	this.setState({ msg: 'You entered ' + area.shape + ' at coords ' + JSON.stringify(area.coords) + ' !' });
  }

  leaveArea(area) {
  	console.log(this.state);
  	this.setState({ msg: 'You leaved ' + area.shape + ' at coords ' + JSON.stringify(area.coords) + ' !' });
  }


  render() {

  	if(!this.state.visited) {
  		return <div> Loading ... </div>;
  	}

	const URL = "http://localhost:8080/Picture1.png"
	const MAP = {
  		name: "my-map",
  		areas: this.state.visited
	};
	console.log(MAP);

    return (
    	<div>
    		<div id ="image-question">
    		<ImageMapper  src={URL} map={MAP} width={800}
				onLoad={() => this.load()}
				onClick={area => this.clicked(area, MAP)}
				onMouseEnter={area => this.enterArea(area)}
				oqnMouseLeave={area => this.leaveArea(area)}
				onImageClick={evt => this.clickedOutside(evt)}
			/>
			</div>
			<p>
				{this.state.msg}
			</p>
		</div>
      
    );
  }
}
