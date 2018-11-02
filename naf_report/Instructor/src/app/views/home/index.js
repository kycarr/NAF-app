// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as actions           from '../../redux/modules/actions';
import Home                   from './Home';

const mapStateToProps = (state) => {
  return {
    currentView:  state.views.currentView,
    earningGraphIsFetching: state.earningGraph.isFetching,
    earningGraphLabels:     state.earningGraph.labels,
    earningGraphDatasets:   state.earningGraph.datasets,
    teamMatesIsFetching:    state.teamMates.isFetching,
    teamMates:              state.teamMates.data,
    currentModule:          state.chooseModules.currentModule,
    instructorResults:      state.mostRecent.results,
    instructorTopics:       state.mostRecent.topics,
    instructorTrainees:     state.mostRecent.trainees,
    instructorbyTopics:     state.mostRecent.byTopics,
    instructorbyTrainee:    state.mostRecent.byTrainee,
    testHistoryData:        state.testHistory.testHistoryData,
    testLogData:            state.testHistory.testLogData
  };
};
    // instructorResults:      state.mostRecent.results,
    // instructorTopics:       state.mostRecent.topics
const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        enterHome: actions.enterHome,
        leaveHome: actions.leaveHome,
        chooseModule: actions.chooseModule,
        fetchEarningGraphDataIfNeeded:  actions.fetchEarningGraphDataIfNeeded,
        fetchTeamMatesDataIfNeeded:     actions.fetchTeamMatesDataIfNeeded,
        fetchInstructorDataIfNeeded: actions.fetchInstructorDataIfNeeded,
        fetchTestHistoryDataIfNeeded: actions.fetchTestHistoryDataIfNeeded,

      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
