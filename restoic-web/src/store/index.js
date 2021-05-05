import { createStore, applyMiddleware, compose as reduxCompose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createBrowserHistory } from 'history'; // eslint-disable-line
import createRootReducer from '../modules';

export const history = createBrowserHistory();

const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    reduxCompose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        ...middleware,
        logger,
        ...enhancers
      ),
    ),
  );

  return store;
}