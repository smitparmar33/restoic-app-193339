import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  success: false,
  loading: false,
  error: false,
};

export const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    resetPasswordReset: () => initialState,
  },
  extraReducers: {
    'resetPassword/pending': (state) => {
      state.loading = true;
    },
    'resetPassword/fulfilled': (state, action) => {
      if (action.payload.statusCode === 0) {
        state.success = true;
      } else {
        state.error = true;
      }
      state.loading = false;
    },
  },
});

export const {resetPasswordReset} = resetPasswordSlice.actions;
