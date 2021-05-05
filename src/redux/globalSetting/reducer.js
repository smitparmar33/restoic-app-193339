import {createSlice} from '@reduxjs/toolkit';

export const globalSettingsSlice = createSlice({
  name: 'globalSettings',
  initialState: {
    playbackSpeed: 1,
    favoritesTrigger: false,
    downloadTrigger: false,
    categoriesTrigger: false,
    introType: 'skip',
    introButtons: false,
    binauralSeen: false,
    alertBar: {
      visible: false,
      text: '',
    },
    fromSignup: '',
  },

  extraReducers: {
    'binauralSeen/fulfilled': (state, action) => {
      state.binauralSeen = !!action.payload || false;
    },
  },
  reducers: {
    setPlaybackSpeed: (state, action) => {
      state.currentTrack = action.payload;
    },
    setFavoritesTrigger: (state) => {
      state.favoritesTrigger = !state.favoritesTrigger;
    },
    setDownloadTrigger: (state) => {
      state.downloadTrigger = !state.downloadTrigger;
    },
    setCategoriesTrigger: (state) => {
      state.categoriesTrigger = !state.categoriesTrigger;
    },
    setIntroType: (state, action) => {
      state.introType = action.payload;
    },
    setIntroButtons: (state, action) => {
      state.introButtons = action.payload;
    },
    setAlertBar: (state, action) => {
      const {visible, text} = action.payload;
      state.alertBar = {visible, text};
    },
    setBinauralSeen: (state) => {
      state.binauralSeen = true;
    },
    setFromSignup: (state, action) => {
      state.fromSignup = action.payload;
    },
  },
});

export const {
  setPlaybackSpeed,
  setFavoritesTrigger,
  setIntroType,
  setIntroButtons,
  setDownloadTrigger,
  setAlertBar,
  setCategoriesTrigger,
  setBinauralSeen,
  setFromSignup,
} = globalSettingsSlice.actions;
