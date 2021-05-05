import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from '../modules/auth';
import challenges from './challenges';
import stats from './stats';

export default history => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  challenges: challenges,
  stats: stats
  // add more reducers
});