import ApiInstance, { removeTokenFromHeader, setTokenIntoHeader } from '../../services/api';
import { replace } from 'connected-react-router'
import axios from 'axios';
import { firstTimeLogin } from '../../utils/firstTimeLogin';
import { getInitialState } from '../../utils/getInitialState';
import { isCoach } from '../../utils/checkIsCoach';

export const LOGIN_START = 'auth/LOGIN_START';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILED = 'auth/LOGIN_FAILED';
export const RESET_ERRORS = 'auth/RESET_ERRORS';
export const SET_ERROR = 'auth/SET_ERROR';
export const LOGOUT_ACTION = 'auth/LOGOUT_ACTION';


const initialState = {
    authenticated: false,
    loading: false,
    token: null,
    error: null,
    emailError: false,
    passwordError: false,
    emailErrorText: '',
    passwordErrorText: '',
    non_field_errorsErrorText: '',
    non_field_errorsError: false,
    user: {},
    ...getInitialState()
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
      case LOGIN_START:
        return {
          ...state,
          loading: true
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          token: payload.token,
          authenticated: true,
          loading: false,
          user: payload.user
        };
      case LOGIN_FAILED:
        return {
          ...state,
          error: payload,
          loading: false
        };
      case RESET_ERRORS:
        return {
          ...state,
          emailError: false,
          passwordError: false,
          emailErrorText: '',
          passwordErrorText: '',
          non_field_errorsErrorText: '',
          non_field_errorsError: false,
        };
      case SET_ERROR: {
          return {
            ...state,
            [`${payload.field}Error`]: true,
            [`${payload.field}ErrorText`]: payload.message,
            loading: false,
          };
        }
      case LOGOUT_ACTION: {
        return {
          authenticated: false,
          loading: false,
          token: null,
          error: null,
          emailError: false,
          passwordError: false,
          emailErrorText: '',
          passwordErrorText: '',
          non_field_errorsErrorText: '',
          non_field_errorsError: false,
          user: {},
        }
      }
			default: 
				return state;
    }
};

export const resetErrorAction = () => (dispatch) => dispatch({ type: RESET_ERRORS });

export const loginAction = (email, password) => (dispatch) => {
  dispatch({ type: RESET_ERRORS });
	dispatch({ type: LOGIN_START });
	ApiInstance.post('/rest-auth/login/', { email, password })
		.then(({ data }) => {
      if (!isCoach(data)) return dispatch({ type: SET_ERROR, payload: { field: 'non_field_errors', message: 'Access denied.' } });
      // add header
      setTokenIntoHeader(data.key)
      // 
      dispatch({ type: LOGIN_SUCCESS, payload: { token: data.key, user: data.user } });
      localStorage.setItem('auth', JSON.stringify({ loggedIn: true }))
			localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', JSON.stringify(data.key));
      if (firstTimeLogin(data.user.email)) {
        return dispatch(replace('/choosePlan'))
      }
      dispatch(replace('/'))
		})
		.catch(({ response: { data }}) => {
      dispatch({ type: RESET_ERRORS });
      const arrayErrors = Object.entries(data);
      const arrayWithMessages = arrayErrors.map(item => ({
        field: `${item[0]}`,
        message: item[1].toString(),
      }));
      arrayWithMessages.map(item =>
        dispatch({ type: SET_ERROR, payload: { field: item.field, message: item.message } }));
    })
}

export const logoutAction = () => dispatch => {
  localStorage.removeItem('auth');
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT_ACTION });
  dispatch(replace('/login'));
  removeTokenFromHeader();
}

export const signUpApple = (code, token, redeem = false) => (dispatch) =>  {
  dispatch({ type: RESET_ERRORS });
	dispatch({ type: LOGIN_START });
  const params = new URLSearchParams()
  params.append('access_token', code)
  params.append('id_token', token)
  
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  axios.post('https://restoic-app-19339.botics.co/rest-auth/apple/', params, config)
    .then(({ data }) => {
      if (redeem) {
        setTokenIntoHeader(data.key)
        localStorage.setItem('redeemActive', JSON.stringify(data.key));
        dispatch(replace('/redeem-code'))
        return;
      }
      if (!isCoach(data)) return dispatch({ type: SET_ERROR, payload: { field: 'non_field_errors', message: 'Access denied.' } });
      // add header
      setTokenIntoHeader(data.key)
      // 
      dispatch({ type: LOGIN_SUCCESS, payload: { token: data.key, user: data.user } });
      localStorage.setItem('auth', JSON.stringify({ loggedIn: true }))
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', JSON.stringify(data.key));
      if (firstTimeLogin(data.user.email)) {
        return dispatch(replace('/choosePlan'))
      }
      dispatch(replace('/'))
    })
    .catch(({ response: { data }}) => {
      dispatch({ type: RESET_ERRORS });
      const arrayErrors = Object.entries(data);
      const arrayWithMessages = arrayErrors.map(item => ({
        field: `${item[0]}`,
        message: item[1].toString(),
      }));
      arrayWithMessages.map(item =>
        dispatch({ type: SET_ERROR, payload: { field: item.field, message: item.message } }));
    })
}

export const googleSignAction = (token, redeem = false) => (dispatch) => {
  dispatch({ type: RESET_ERRORS });
	dispatch({ type: LOGIN_START });
  const params = new URLSearchParams()

  params.append('access_token', token);

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  axios.post('https://restoic-app-19339.botics.co/rest-auth/google/', params, config)
    .then(({ data }) => {
      if (redeem) {
        setTokenIntoHeader(data.key)
        localStorage.setItem('redeemActive', JSON.stringify(data.key));
        dispatch(replace('/redeem-code'))
        return;
      }
      if (!isCoach(data)) return dispatch({ type: SET_ERROR, payload: { field: 'non_field_errors', message: 'Access denied.' } });
      // add header
      setTokenIntoHeader(data.key)
      // 
      dispatch({ type: LOGIN_SUCCESS, payload: { token: data.key, user: data.user } });
      localStorage.setItem('auth', JSON.stringify({ loggedIn: true }))
			localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', JSON.stringify(data.key));
      if (firstTimeLogin(data.user.email)) {
        return dispatch(replace('/choosePlan'))
      }
      dispatch(replace('/'))
    })
    .catch(({ response: { data }}) => {
      dispatch({ type: RESET_ERRORS });
      const arrayErrors = Object.entries(data);
      const arrayWithMessages = arrayErrors.map(item => ({
        field: `${item[0]}`,
        message: item[1].toString(),
      }));
      arrayWithMessages.map(item =>
        dispatch({ type: SET_ERROR, payload: { field: item.field, message: item.message } }));
    })
}

// like login just for redeem code
export const loginRedeemAction = (email, password) => (dispatch) => {
  dispatch({ type: RESET_ERRORS });
	ApiInstance.post('/rest-auth/login/', { email, password })
		.then(({ data }) => {
      setTokenIntoHeader(data.key)
      localStorage.setItem('redeemActive', JSON.stringify(data.key));
      dispatch(replace('/redeem-code'))
      
		})
		.catch(({ response: { data }}) => {
      dispatch({ type: RESET_ERRORS });
      const arrayErrors = Object.entries(data);
      const arrayWithMessages = arrayErrors.map(item => ({
        field: `${item[0]}`,
        message: item[1].toString(),
      }));
      arrayWithMessages.map(item =>
        dispatch({ type: SET_ERROR, payload: { field: item.field, message: item.message } }));
    })
}

// like login just for redeem code
export const registerRedeemAction = (email, password) => (dispatch) => {
  dispatch({ type: RESET_ERRORS });
	ApiInstance.post('/rest-auth/registration/', { email, password, first_name: '' })
		.then(({ data }) => {
      setTokenIntoHeader(data.key)
      localStorage.setItem('redeemActive', JSON.stringify(data.key));
      dispatch(replace('/redeem-code'))
      
		})
		.catch(({ response: { data }}) => {
      dispatch({ type: RESET_ERRORS });
      const arrayErrors = Object.entries(data);
      const arrayWithMessages = arrayErrors.map(item => ({
        field: `${item[0]}`,
        message: item[1].toString(),
      }));
      arrayWithMessages.map(item =>
        dispatch({ type: SET_ERROR, payload: { field: item.field, message: item.message } }));
    })
}

