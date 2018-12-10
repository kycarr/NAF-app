import React, {Component} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../styles/App.css';
import Toolbar from './Toolbar';
import Navbar from './Navbar';
import Test from './Test';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          lineNumber: 0
        };
        this.onWayPoint = this.onWayPoint.bind(this);
    }
    onWayPoint(arg){
            // console.log('We pass argument from Child to Parent: ' + arg);
            this.setState({lineNumber:arg});
    }
    render() {
        return (
            <div className="App">
                <MuiThemeProvider>
                    <div>
                        <Toolbar/>
                        <div className="col-lg-1 col-md-1 col-sm-1">
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-7">
                            <Test onWayPoint={this.onWayPoint.bind(this)}/>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
