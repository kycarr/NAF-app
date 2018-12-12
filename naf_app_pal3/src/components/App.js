import React, {Component} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../styles/App.css';

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
                        <div className="col-lg-8 col-md-8 col-sm-7">
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
