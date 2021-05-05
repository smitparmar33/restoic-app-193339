import ApiInstance from '../../services/api';
import { GET_CHALLENGE_FAILED } from '../challenges';


export const GET_TEAM_STATS_START = 'stats/GET_TEAM_STATS_START';
export const GET_TEAM_STATS_SUCCESS = 'stats/GET_TEAM_STATS_SUCCESS';
export const GET_TEAM_STATS_FAILED = 'stats/GET_TEAM_STATS_FAILED';
export const GET_MEMBER_STATS_START = 'stats/GET_MEMBER_STATS_START';
export const GET_MEMBER_STATS_SUCCESS = 'stats/GET_MEMBER_STATS_SUCCESS';
export const GET_MEMBER_STATS_FAILURE = 'stats/GET_MEMBER_STATS_FAILURE';

const initialState = {
    loading: false,
    error: null,
    weeklyProgress: {
        total_members: 0,
        total_tasks: 0,
        done: 0,
        in_progress: 0,
        not_started: 0,
    },
    totalProgress: {
        total_members: 0,
        total_tasks: 0,
        done: 0,
        in_progress: 0,
        not_started: 0,
    },
    memberStats: [],
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
      case GET_TEAM_STATS_START:
        return {
          ...state,
          loading: true
        };
      case GET_TEAM_STATS_SUCCESS:
        return {
          ...state,
          weeklyProgress: payload.weeklyProgress,
          totalProgress: payload.totalProgress,
          loading: false,
        };
      case GET_TEAM_STATS_FAILED:
        return {
          ...state,
          error: payload,
          loading: false
        };
      case GET_MEMBER_STATS_START:
        return {
          ...state,
          loading: true,
        }
      case GET_MEMBER_STATS_SUCCESS:
        return {
          ...state,
          loading: false,
          memberStats: payload
        }
      case GET_MEMBER_STATS_FAILURE:
        return {
          ...state,
          loading: false,
          error: payload
        }
        default: 
            return state;
    }
};

// This action should return team and total progress!
export const getTeamStats = (week) => (dispatch) => {
    dispatch({ type: GET_TEAM_STATS_START });
    ApiInstance.get('api/v1/statistic-task', { week })
      .then(({ data }) => dispatch({
          type: GET_TEAM_STATS_SUCCESS,
          payload: {
            totalProgress: data.total_progress,
            weeklyProgress: data.weekly_progress
          }
      }))
      .catch((err) => dispatch({ type: GET_CHALLENGE_FAILED, payload: err }));
}

export const getMemberStats = (week) => (dispatch) => {
    dispatch({ type: GET_MEMBER_STATS_START });
    ApiInstance.get('api/v1/statistic-member', { week })
      .then(({ data }) => dispatch({ type: GET_MEMBER_STATS_SUCCESS, payload: data }))
      .catch((err) => dispatch({ type: GET_CHALLENGE_FAILED, payload: err }));
}
