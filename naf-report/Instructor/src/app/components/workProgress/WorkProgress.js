// @flow weak
import PropTypes          from 'prop-types';
import React              from 'react';
import WorkProgressPanel  from './workProgressPanel/WorkProgressPanel';
import moment               from 'moment';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCol
}                         from '../../components';

const header = ['Trainee Name', 'Time Started', 'Time Completed', '# Attempts', 'Total Score', 'Result'];

class WorkProgress extends React.Component {

  constructor(props){

    super(props);
    let _content = convertTraineesToArray(props);
    this.state = {
      headers : header,
      content : _content
    };
  }

  componentDidMount() {
    if(this.props.trainees.length === 0) return;
    let _content = convertTraineesToArray(this.props);
    let labels = this.props.trainees[0].topics.map(ele => {
        return ele.label;
    });
    let _headers = header.concat(labels);
    this.setState({
      headers: _headers,
      content: _content
    });  
  }


  render() {

    return (
          <WorkProgressPanel>
              <Table>
                <TableHeader>
                  {
                    this.state.headers.map(
                      (header, headerIdx) => {
                        return (
                          <TableCol key={headerIdx}>
                           <b> {header}</b>
                          </TableCol>
                        );
                      }
                    )
                  }
                </TableHeader>
                <TableBody>
                  {
                    this.state.content.map(
                      (contentRow, contentRowIdx) => {
                        return (
                          <TableRow key={contentRowIdx}>
                            {
                              contentRow.map(
                                (contentColumn, contentColumnIdx) => {
                                  return (
                                    <TableCol key={contentColumnIdx}>
                                      {contentColumn}
                                    </TableCol>
                                  );
                                }
                              )
                            }
                          </TableRow>
                        );
                      }
                    )
                  }
                </TableBody>
              </Table>
            </WorkProgressPanel>
      );
  }
}
  
function convertTraineesToArray(props) {

  let _content = props.trainees.map(ele => {
    let timeStarted = moment(ele.timeStarted).format('MM/DD/YYYY');
    let timeCompleted = moment(ele.timeCompleted).format('MM/DD/YYYY');
    let array = [ele.traineeName, 
    timeStarted === "Invalid date" ? ele.timeStarted : timeStarted,  
    timeCompleted === "Invalid date" ? ele.timeCompleted : timeCompleted, 
    ele.attempts, ele.totalScore, ele.result];
    ele.topics.forEach(topic => {
        array.push(topic.score.toString() + ' / ' + topic.total.toString());
    });
    return array;
  });
  return _content
}

WorkProgress.propTypes = {
    trainees: PropTypes.array
};

export default WorkProgress;
