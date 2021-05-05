import {createAsyncThunk} from '@reduxjs/toolkit';

import TrackApi from '../../services/trackApi';

export const getCategories = createAsyncThunk('tracks', async (token) => {
  const response = await TrackApi.getCategories(token);
  return response;
});
