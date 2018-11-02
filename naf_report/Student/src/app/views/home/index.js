
// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as actions           from '../../redux/modules/actions';
import Home                    from './Home';

const mapStateToProps = (state) => {
  return {
    tabs: state.views.tabs,
    currentView:  state.views.currentView,
    answersList: state.views.answersList,
    resultsList: state.views.resultsList,
    testLogData: state.views.testLogData,
    earningGraphIsFetching: state.earningGraph.isFetching,
    earningGraphLabels:     state.earningGraph.labels,
    earningGraphDatasets:   state.earningGraph.datasets,
    teamMatesIsFetching:    state.teamMates.isFetching,
    teamMates:              state.teamMates.data,
    userTestInfos: state.userInfos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        enterHome: actions.enterHome,
        leaveHome: actions.leaveHome,

        fetchEarningGraphDataIfNeeded:  actions.fetchEarningGraphDataIfNeeded,
        fetchTeamMatesDataIfNeeded:     actions.fetchTeamMatesDataIfNeeded,
        fetchUserTestInfoDataIfNeeded : actions.fetchUserTestInfoDataIfNeeded,
        fetchStudentSessions: actions.fetchStudentSessions,
        fetchStudentTestAnswers: actions.fetchStudentTestAnswers,
        fetchStudentWithSession: actions.fetchStudentWithSession
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
