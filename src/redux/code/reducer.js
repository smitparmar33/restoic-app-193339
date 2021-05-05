import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  codeMessage: '',
  loading: false,
  error: false,
  errorMessage: null,
};

export const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    resetCode: () => initialState,
  },
  extraReducers: {
    'code/pending': (state) => {
      state.loading = true;
    },
    'code/fulfilled': (state, action) => {
      if (action.payload.statusCode === 0) {
        if (!!action.payload.data.error) {
          state.error = true;
          state.errorMessage = action.payload.data.error;
        }
        if (!!action.payload.data.message) {
          state.codeMessage = action.payload.data.message;
        }
      } else {
        state.error = true;
        state.errorMessage = action.payload.error;
      }
      state.loading = false;
    },
  },
});

export const {resetCode} = codeSlice.actions;
