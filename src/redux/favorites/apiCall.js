import {createAsyncThunk} from '@reduxjs/toolkit';

import TrackApi from '../../services/trackApi';

export const getFavorites = createAsyncThunk('favorites', async (token) => {
  const response = await TrackApi.getFavorites(token);
  return response;
});

export const setFavorite = createAsyncThunk('favoritesAdd', async (data) => {
  const response = await TrackApi.setFavorite(data);
  return response;
});
