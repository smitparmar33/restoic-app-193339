import {createSlice} from '@reduxjs/toolkit';

export const downloadedListSlice = createSlice({
  name: 'downloadedList',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    addList: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: {
    'downloads/pending': (state) => {
      state.loading = true;
    },
    'downloads/fulfilled': (state, action) => {
      if (action.payload.statusCode === 0) {
        state.list = action.payload.data || [];
      }
      state.loading = false;
    },
  },
});

export const {addList} = downloadedListSlice.actions;
