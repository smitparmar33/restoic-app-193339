import {createSlice} from '@reduxjs/toolkit';
import {checkIsDateInFuture} from '../../utils/time';

const initialState = {
  user: {
    competition: '',
    date_joined: '',
    email: '',
    first_name: '',
    id: null,
    image: '',
    is_coach: false,
    last_name: '',
    premium_to: null,
    streak: {current: 0, highest: 0},
    sports: [],
  },
  token: null,
  loading: false,
  error: false,
  errorMessage: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUser: () => initialState,
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: {
    'user/pending': (state) => {
      state.loading = true;
    },
    'user/fulfilled': (state, action) => {
      if (action.payload.statusCode === 0) {
        let premium_to = false;
        if (action.payload.data?.premium_to) {
          premium_to = checkIsDateInFuture(action.payload.data.premium_to);
        }
        state.user = {...action.payload.data, ...{premium_to}};
        state.loading = false;
      } else {
        state.error = true;
        state.loading = false;
        state.errorMessage = action.payload.error;
      }
    },
    'token/fulfilled': (state, action) => {
      state.token = action.payload;
    },

    'updateUser/pending': (state) => {
      state.loading = true;
    },
    'updateUser/fulfilled': (state, action) => {
      if (action.payload.statusCode === 0) {
        state.user = action.payload.data;
        state.loading = false;
      } else {
        state.error = true;
        state.loading = false;
        state.errorMessage = action.payload.error;
      }
    },
    'updateImage/pending': (state) => {
      state.loading = true;
    },
    'updateImage/fulfilled': (state, action) => {
      if (action.payload.statusCode === 0) {
        state.user = action.payload.data;
        state.loading = false;
      } else {
        state.error = true;
        state.loading = false;
        state.errorMessage = action.payload.error;
      }
    },
  },
});

export const {removeUser, setToken, setName} = userSlice.actions;
