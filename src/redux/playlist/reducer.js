import {createSlice} from '@reduxjs/toolkit';

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    playlist: [],
    currentTrack: null,
  },
  extraReducers: {
    'favoritesAdd/fulfilled': (state, action) => {
      if (action.payload.statusCode === 0) {
        const nowPlaying = state.playlist.find((item) => item.id == action.payload.data.track);
        if (nowPlaying) {
          nowPlaying.favorite.status = !!action.payload.data.id;
        }
      }
    },
  },
  reducers: {
    addCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    addPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    resetPlaylist: (state) => {
      state.playlist = [];
    },
    toggleFavorites: (state, action) => {},
  },
});

export const {addPlaylist, resetPlaylist, addCurrentTrack, toggleFavorites} = playlistSlice.actions;
