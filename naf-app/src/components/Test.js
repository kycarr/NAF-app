import React from 'react';
// import FlatButton from 'material-ui/FlatButton';

import TestQuestions from './TestQuestions';
import '../styles/App.css';
export default class TestComponent extends React.Component {

    

    render() {
        return (
            <div className="test-component">
                <div className="test-questions">
                    <TestQuestions onWayPointChild={this.props.onWayPoint.bind(this)} />
                </div>
            </div>
        )
    }
}