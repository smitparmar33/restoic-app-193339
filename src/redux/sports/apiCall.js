import {createAsyncThunk} from '@reduxjs/toolkit';

import UserApi from '../../services/userApi';

export const getSports = createAsyncThunk('sports', async (token) => {
  const response = await UserApi.getSports(token);
  return response;
});
