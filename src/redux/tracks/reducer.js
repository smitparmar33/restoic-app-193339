import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  token: null,
  loading: false,
  error: false,
  errorMessage: null,
};

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: {
    'favoritesAdd/fulfilled': (state, action) => {
      if (action.payload.statusCode === 0) {
        const cat = state.categories.reduce((a, b) => (b.tracks ? a.concat(b.tracks) : a), []);
        const nowPlaying = cat.find((item) => item.id == action.payload.data.track);
        if (nowPlaying) {
          nowPlaying.favorite.status = !!action.payload.data.id;
        }
      }
    },
    'tracks/pending': (state) => {
      state.loading = true;
    },
    'tracks/fulfilled': (state, action) => {
      if (action.payload.statusCode === 0) {
        const cat = action.payload.data.map((item) => {
          const sorted = item.tracks?.sort((a, b) => a.order - b.order);
          const numberOfSections = item.tracks.length;
          const durationInSeconds = item.tracks.reduce((acc, curr) => {
            return acc + curr.duration;
          }, 0);
          return {
            ...item,
            numberOfSections,
            durationInMinutes: Math.floor(durationInSeconds / 60),
            tracks: sorted,
          };
        });

        const sportsPsy = cat?.find((cat) => cat.title === 'SPORTS PSYCHOLOGY') || {};
        const meditation = cat?.find((cat) => cat.title === 'MEDITATION') || {};
        const binauralBeats = cat?.find((cat) => cat.title === 'BINAURAL BEATS') || {};
        const breathwork = cat?.find((cat) => cat.title === 'Breathwork') || {};
        const soundscapes = cat.find((cat) => cat.title === 'Soundscapes') || {};
        const digitalCoaching = {
          title: 'Digital Coaching',
          id: 99,
        };
        const sorted = [sportsPsy, meditation, binauralBeats, breathwork, soundscapes, digitalCoaching];

        state.categories = sorted || [];
        state.loading = false;
      } else {
        state.error = true;
        state.loading = false;
        state.errorMessage = action.payload.error;
      }
    },
  },
});
