import {combineReducers} from '@reduxjs/toolkit';

import {counterSlice} from '../redux/counter';
import {playlistSlice} from '../redux/playlist';
import {downloadedListSlice} from '../redux/downloadedList';
import {globalSettingsSlice} from '../redux/globalSetting';
import {userSlice} from '../redux/user';
import {sportsSlice} from '../redux/sports';
import {tracksSlice} from '../redux/tracks';
import {globalLoaderSlice} from '../redux/globalLoader';
import {favoritesSlice} from '../redux/favorites';
import {codeSlice} from '../redux/code';
import {resetPasswordSlice} from '../redux/resetPassword';

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  playlist: playlistSlice.reducer,
  downloadedList: downloadedListSlice.reducer,
  globalSettings: globalSettingsSlice.reducer,
  user: userSlice.reducer,
  sports: sportsSlice.reducer,
  tracks: tracksSlice.reducer,
  globalLoader: globalLoaderSlice.reducer,
  favorites: favoritesSlice.reducer,
  code: codeSlice.reducer,
  resetPassword: resetPasswordSlice.reducer,
});

export default rootReducer;
