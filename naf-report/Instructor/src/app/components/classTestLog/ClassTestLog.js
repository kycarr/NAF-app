// @flow weak
import React              from 'react';
import PropTypes from 'prop-types';
import moment               from 'moment';
import WorkProgressPanel  from './workProgressPanel/WorkProgressPanel';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCol
}                         from '../../components';

const headers = ['Class', 'Test Name', 'Date Completed', 'Average Score', '# Pass', '# Attempts', '# Finished', '#Incomplete','# Not Start',''];
let content = [];
export default class ClassTestLog extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    content = convertTestLogToArray(this.props.testLogData);
    return (
            <WorkProgressPanel>
            <Table>
              <TableHeader>
                {
                  headers.map(
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
                  content.map(
                    (contentRow, contentRowIdx) => {
                      return (
                        <TableRow key={contentRowIdx} openNewTab={this.props.openNewTab} testName={contentRow[1]}>
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


function convertTestLogToArray(testLogData) {
    let _content = testLogData.map(ele => {
        let dateCompleted = moment(ele.dateCompleted).format('MM/DD/YYYY');
        let array = [ele.className, ele.testName, 
        dateCompleted === "Invalid date" ? ele.dateCompleted : dateCompleted,  
        ele.average, ele.pass, ele.attempts, ele.finished, ele.inComplete, ele.notStart];
        return array;
      });
      return _content
}

ClassTestLog.propTypes = { 
  testLogData: PropTypes.array,
  openNewTab: PropTypes.func
}
