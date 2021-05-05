import {createAsyncThunk} from '@reduxjs/toolkit';
import UserApi from '../../services/userApi';

export const resetPassword = createAsyncThunk('resetPassword', async (data) => {
  const response = await UserApi.resetPassword(data);
  return response;
});
