import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
  loading: false,
  error: false,
  errorMessage: null,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: {
    'favorites/pending': (state) => {
      state.loading = true;
    },
    'favoritesAdd/pending': (state) => {
      state.loading = true;
    },
    'favoritesAdd/fulfilled': (state, action) => {
      if (action.payload.statusCode === 0) {
        if (action.payload.data.id) {
          //   state.favorites = action.payload.data;
        } else {
          state.favorites = state.favorites.filter((item) => item.id !== action.payload.data.track);
        }
      }
      state.loading = false;
    },
    'favorites/fulfilled': (state, action) => {
      if (action.payload.statusCode === 0) {
        state.loading = false;
        state.favorites = action.payload.data;
      } else {
        state.error = true;
        state.loading = false;
        state.errorMessage = action.payload.error;
      }
    },
  },
});
