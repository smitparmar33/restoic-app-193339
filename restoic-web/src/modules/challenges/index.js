import ApiInstance from '../../services/api';
import { replace } from 'connected-react-router';
import _get from 'lodash/get';
import { getTeamStats } from '../stats';
import { getTaskTitle } from '../../utils/getTaskTitle';

export const SELECT_CHALLENGE_START = 'challenges/SELECT_CHALLENGE_START';
export const SELECT_CHALLENGE_SUCCESS = 'challenges/SELECT_CHALLENGE_SUCCESS';
export const SELECT_CHALLENGE_FAILED = 'challenges/SELECT_CHALLENGE_FAILED';
export const OPEN_SELECT_DATE_MODAL = 'challenges/OPEN_SELECT_DATE_MODAL';
export const CLOSE_SELECT_DATE_MODAL = 'challenges/CLOSE_SELECT_DATE_MODAL';
export const GET_CHALLENGE_START = 'challenges/GET_CHALLENGE_START';
export const GET_CHALLENGE_SUCCESS = 'challenges/GET_CHALLENGE_SUCCESS';
export const GET_CHALLENGE_FAILED = 'challenges/GET_CHALLENGE_FAILED';
export const CHANGE_CURRENT_WEEK = 'challenges/CHANGE_CURRENT_WEEK';
export const SELECT_TASK = 'challenges/SELECT_TASK';
export const UNSELECT_TASK = 'challenges/UNSELECT_TASK';
export const GET_DOWNLOAD_FILE_START = 'challenges/GET_DOWNLOAD_FILE_START';
export const GET_DOWNLOAD_FILE_SUCCESS = 'challenges/GET_DOWNLOAD_FILE_SUCCESS';
export const GET_DOWNLOAD_FILE_FAILURE = 'challenges/GET_DOWNLOAD_FILE_FAILURE';


const initialState = {
    loading: false,
    error: null,
    modalSelectDate: false,
    currentWeek: 0,
    tasksByWeek: null,
    challegeData: {
      challegeData: {
        start_date: null
      }
    },
    numberOfWeeks: 0,
    selectedWeek: null,
    selectedTask: [],
    modalSelectTask: false,
    selectedTaskTitle: '',
    selectedTaskCategoryTitle: '',
    downloadFiles: [],
    allTogether: {
      link: ''
    }
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
      // TODO: maybe this should be refactored
      case SELECT_CHALLENGE_START:
        return {
          ...state,
          loading: true
        };
      case SELECT_CHALLENGE_SUCCESS:
        return {
          ...state,
        };
      case SELECT_CHALLENGE_FAILED:
        return {
          ...state,
          error: payload,
          loading: false
        };
      // start modal select date
      case OPEN_SELECT_DATE_MODAL:
        return {
          ...state,
          modalSelectDate: true,
        };
      case CLOSE_SELECT_DATE_MODAL:
        return {
          ...state,
          modalSelectDate: false,
        };
      // get challege for weekly tasks page
      case GET_CHALLENGE_START:
        return {
          ...state,
          loading: true,
        };
      case GET_CHALLENGE_SUCCESS:
        return {
          ...state,
          loading: false,
          currentWeek: payload.currentWeek,
          tasksByWeek: payload.tasksByWeek,
          challegeData: payload.challegeData,
          numberOfWeeks: payload.numberOfWeeks,
          selectedWeek: payload.selectedWeek
        }
      case GET_CHALLENGE_FAILED:
        return {
          ...state,
          loading: false,
          error: payload
        }
      case CHANGE_CURRENT_WEEK:
        return {
          ...state,
          currentWeek: payload.currentWeek,
          selectedWeek: payload.selectedWeek
        }
      // end challege for weekly tasks page
      case SELECT_TASK:
        return {
          ...state,
          selectedTask: payload.selectedTask,
          selectedTaskTitle: payload.selectedTaskTitle,
          selectedTaskCategoryTitle: payload.selectedTaskCategoryTitle,
          modalSelectTask: true,
        };
      case UNSELECT_TASK:
        return {
          ...state,
          selectedTask: [],
          modalSelectTask: false,
        };
      case GET_DOWNLOAD_FILE_START:
        return {
          ...state,
          loading: true,
        }
      case GET_DOWNLOAD_FILE_SUCCESS:
        return {
          ...state,
          downloadFiles: payload.weeklyFiles,
          allTogether: payload.allTogether,
          loading: false,
        }
      case GET_DOWNLOAD_FILE_FAILURE:
        return {
          ...state,
          error: payload
        }
        default: 
          return state;
    }
};

/* this action should be used for select plan screen to allow 
  user to choose plan and display select date modal
*/
export const selectPlanAction = (id) => (dispatch) => {
    dispatch({ type: SELECT_CHALLENGE_START });
    ApiInstance.post('api/v1/selected-challenge', { challenge: id })
      .then(({ data }) => {
          if (data.start_date === null) {
            return dispatch({ type: OPEN_SELECT_DATE_MODAL });
            // dispatch action to open modal for select date
          }
          dispatch(closeSelectDateModal())
          // TODO: reroute to weekly tests if start data is here
          dispatch(replace('/'))
      })
      // catch error if member has no team assigned!
      .catch((err) => dispatch({ type: SELECT_CHALLENGE_FAILED, payload: err }))
}


// this action should get selected plan and patch it with start date, USAGE: in modal for select date!
export const selectStartDateForPlan = (startDate) => (dispatch) => {
  ApiInstance.get('api/v1/selected-challenge')
    .then(({ data: { data: { id }}}) => {
      // select date depend on selected plan id!
      return ApiInstance.patch(`api/v1/selected-challenge/${id}/`, { start_date: startDate })
    })
    .then(() => {
      // close modal and reroute on home page
      dispatch(closeSelectDateModal());
      dispatch(replace('/'))
    })
    .catch((err) => {
      console.log('# error selectStartDateForPlan', err)
      throw err;
    })
};

// weeekly tasks main action get selected challenge
export const getCurrentSelectedChallenge = () => (dispatch) => {
  dispatch({ type: GET_CHALLENGE_START });
  ApiInstance.get('api/v1/selected-challenge')
    .then(({ data }) => {
      // Save data about selected challenge
      dispatch({
        type: GET_CHALLENGE_SUCCESS,
        payload: {
          currentWeek: data['current-week'],
          tasksByWeek: data.tasks_by_week,
          challegeData: data.data,
          numberOfWeeks: parseInt(data.data.challenge.weeks),
          selectedWeek: _get(data.tasks_by_week, `week${data['current-week']}`, null)
        }
      })
    })
    .catch((err) => dispatch({ type: GET_CHALLENGE_FAILED, payload: err }))
}

// Action to swich current active week from navHeader
export const changeWeek = (weekNumber) => (dispatch, getState) => {
    const {
      challenges: {
        tasksByWeek,
      }
    } = getState();
    dispatch(getTeamStats(weekNumber));
    dispatch({
      type: CHANGE_CURRENT_WEEK,
      payload: {
        currentWeek: weekNumber,
        selectedWeek: _get(tasksByWeek, `week${weekNumber}`, null)
      }
    })
}

// Action close select date modal!
export const closeSelectDateModal = () => (dispatch, getState) => {
  const { router: { location: { pathname } } } = getState();
  if (pathname === '/choosePlan') {
    dispatch({ type: CLOSE_SELECT_DATE_MODAL });
    return dispatch(replace('/'));
  }
  dispatch({ type: CLOSE_SELECT_DATE_MODAL });
}

// Action for select task and open modal
export const selectTask = (id) => (dispatch, getState) => {
  const {
    challenges: {
      selectedWeek,
    }
  } = getState();
  if (selectedWeek) {
    const { title, categoryTitle } = getTaskTitle(id);
    dispatch({
      type: SELECT_TASK,
      payload: {
        selectedTask: _get(selectedWeek, `${id}`, []),
        selectedTaskTitle: title,
        selectedTaskCategoryTitle: categoryTitle
      }
    })
  }
}

// Action close modal for tasks
export const closeTaskModal = () => (dispatch) => dispatch({ type: UNSELECT_TASK });

// getDownloadItems per week, diplay just if bulk === false 
export const getDownloadsItem = (numberOfWeeks = 1) => (dispatch) => {
    const weeks = Array(numberOfWeeks).fill().map((item, key) => (`${key + 1}`));
    dispatch({ type: GET_DOWNLOAD_FILE_START });
    ApiInstance.get('/api/v1/challenge-files')
      .then(({ data }) => {
        const response = weeks.map((item) => ({
          title: `Week ${item}`,
          items: data.filter((challange) => challange.week === item && !challange.is_bulk) || []
        }))
        const [allTogether = { link: ''}] = data.filter((challange) => challange.is_bulk) || []
        dispatch({
          type: GET_DOWNLOAD_FILE_SUCCESS,
          payload: {
            weeklyFiles: response,
            allTogether,
          }
        });
      })
      .catch((err) =>  dispatch({ type: GET_DOWNLOAD_FILE_FAILURE, payload: err }))

}