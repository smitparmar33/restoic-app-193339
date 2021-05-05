import Axios from 'axios';
import {http} from './http';

export const signUp = ({firstName, email, password}) =>
  http({
    method: 'POST',
    url: '/rest-auth/registration/',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      first_name: firstName,
      email,
      password,
    },
  });

export const login = ({email, password}) =>
  http({
    method: 'POST',
    url: '/rest-auth/login/',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email,
      password,
    },
  });

export const signUpApple = (code) => {
  const params = new URLSearchParams();
  params.append('code', code);
  params.append('grant_type', 'authorization_code');
  params.append('client_id', '4m9JfNmSNRdz5FuDadlW4e4hVm9U69Uem4J5ewkL');
  params.append(
    'client_secret',
    'Ue566NUbZyg5swyxV8LI3x9x7coVUsBFV13T4lcWZKWU1l597iiYxJoGKTklyZJxSTzn2bum0xb9j3QQFJETK4l21u3tm4cThaiJK2F17cTHqmbQrhoSqpuAL7yM36oz',
  );

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  return Axios.post('https://restoic-app-19339.botics.co/rest-auth/apple/', params, config);
};

export const googleSignAction = (token) => {
  const params = new URLSearchParams();

  params.append('access_token', token);

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  return Axios.post('https://restoic-app-19339.botics.co/rest-auth/google/', params, config);
};
