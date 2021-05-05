import {createAsyncThunk} from '@reduxjs/toolkit';
import UserApi from '../../services/userApi';

export const setCode = createAsyncThunk('code', async (data) => {
  const response = await UserApi.setCode(data);
  return response;
});
