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



class WorkProgress extends React.Component {

  constructor(props){

    super(props);
    let _content = convertTraineesToArray(props);
    this.state = {
      headers : ['Trainee Name', 'Time Started', 'Time Completed', '# Attempts', 'Total Score', 'Result', 'Topic 1', 'Topic 4','Topic 7'],
      content : _content
    };
  }

  componentWillReceiveProps(nextProps) {
    let _content = convertTraineesToArray(nextProps);
    this.setState({
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
    let array = [ele.traineeName, moment(ele.timeStarted).format('MM/DD/YYYY'),  moment(ele.timeCompleted).format('MM/DD/YYYY'), ele.attempts, ele.totalScore, ele.result];
    for(let topic in ele.topics) {
      array.push(topic);
    }
    return array;
  });
  return _content
}

WorkProgress.propTypes = {
    trainees: PropTypes.array
};

export default WorkProgress;
