import {createSlice} from '@reduxjs/toolkit';

export const globalLoaderSlice = createSlice({
  name: 'globalLoader',
  initialState: {
    isLoading: false,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {setIsLoading} = globalLoaderSlice.actions;
