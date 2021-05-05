import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkIsBinauralSeen = createAsyncThunk('binauralSeen', async () => {
  const response = await AsyncStorage.getItem('seen_binaural');
  return response;
});
