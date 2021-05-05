import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserApi from '../../services/userApi';

export const getUser = createAsyncThunk('user', async (token) => {
  const response = await UserApi.getUser(token);
  return response;
});

export const getToken = createAsyncThunk('token', async () => {
  const response = await AsyncStorage.getItem('@token');
  return response;
});

export const updateUser = createAsyncThunk('updateUser', async (data) => {
  const response = await UserApi.updateUser(data);
  return response;
});

export const updateImage = createAsyncThunk('updateImage', async (data) => {
  const response = await UserApi.updateImage(data);
  return response;
});
