import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  sports: [],
  loading: false,
  error: false,
  errorMessage: null,
};

export const sportsSlice = createSlice({
  name: 'sports',
  initialState,
  reducers: {},
  extraReducers: {
    'sports/pending': (state) => {
      state.loading = true;
    },
    'sports/fulfilled': (state, action) => {
      if (action.payload.statusCode === 0) {
        state.sports = action.payload.data;
        state.loading = false;
      } else {
        state.error = true;
        state.loading = false;
        state.errorMessage = action.payload.error;
      }
    },
  },
});

// export const {} = userSlice.actions;
