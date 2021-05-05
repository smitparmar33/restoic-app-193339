import 'react-native-gesture-handler';
import React from 'react';
import {startPlayer} from './src/screens/player/playerFunctions';
import {Provider} from 'react-redux';
import store from './src/store';
import Router from './src/router';

startPlayer();

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
