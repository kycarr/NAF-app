import React, { Component } from 'react';
import ImageMapper from './ImageMapper';
import PropTypes from 'prop-types';
import picture from "../images/Picture1.png";
import MediaQuery from 'react-responsive';

export default class HotSpotQuestion extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
  		msg : '',
  		x: 0,
  		y:0,
  		visited: [],
      count: 0
  	};
  }

  load() {
  	this.setState({ msg: 'Interact with image !' });
  }

  clicked(area) {
  	console.log('inside clicked');
    // this.state.visited = [];
    console.log('You clicked on ' + area.shape + ' at coords ' + JSON.stringify(area.coords) + ' !');
    let count = this.state.count;
    if(count - 1 < this.props.limit) {
      this.state.warningToggle = false;
    }
  	this.setState({
      visited: this.state.visited.filter(ele => {
        return !(ele.coords === area.coords);
      }),
      count: this.state.count - 1
    });
  }

  clickedOutside(evt) {
  	console.log('inside clickedOutside');
    let count = this.state.count;
    if(count + 1 > this.props.limit) {
      this.state.warningToggle = true;
      return;
    }
    else {
      count++;
    }
  	const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
  	const areaObject = {shape: "rect", coords: [coords.x-20, coords.y-20, coords.x + 20, coords.y + 20] };
  	const currentVisited = this.state.visited;
  	currentVisited.push(areaObject);

  	this.setState({
      msg: 'You clicked on the image at coords ' + JSON.stringify(coords) + ' !' , x: coords.x, y: coords.y,
      visited: currentVisited,
      count: count
    });
  }

  render() {

  	if(!this.state.visited) {
  		return <div> Loading ... </div>;
  	}

  	const URL = "/images/Picture1.png"
  	const MAP = {
    		name: "my-map",
    		areas: this.state.visited
  	};
    console.log(MAP);

    return (
      <div>
    		<div className ="image-question"  ref="child" width="100%">
              <MediaQuery minDeviceWidth={1025} >
              <ImageMapper   src={picture} map={MAP}
              width={800}
              onLoad={() => this.load()}
              onClick={area => this.clicked(area, MAP)}
              onImageClick={evt => this.clickedOutside(evt)}
              />
              </MediaQuery>
              <MediaQuery minDeviceWidth={769}  maxDeviceWidth={1024} >
              <ImageMapper   src={picture} map={MAP}
              width={600}
              onLoad={() => this.load()}
              onClick={area => this.clicked(area, MAP)}
              onImageClick={evt => this.clickedOutside(evt)}
              />
              </MediaQuery>
              <MediaQuery maxDeviceWidth={768} >
              <ImageMapper   src={picture} map={MAP}
              width={300}
              onLoad={() => this.load()}
              onClick={area => this.clicked(area, MAP)}
              onImageClick={evt => this.clickedOutside(evt)}
              />
              </MediaQuery>
              <br />
  		 </div>
       <div>
       
        <p><small><em><center>You have clicked on {this.state.count} {this.state.count === 1 ? 'region' : 'regions'}. You have {this.props.limit - this.state.count} components left to identify.</center></em></small></p>
        <br />
       </div>
    </div>

    );
  }
}

/*
        <ImageMapper  src={URL} map={MAP} width={800}
        onLoad={() => this.load()}
        onClick={area => this.clicked(area, MAP)}
        onImageClick={evt => this.clickedOutside(evt)}
      />
      */
HotSpotQuestion.propTypes = {
    limit: PropTypes.number,
    imageURL: PropTypes.string
};
