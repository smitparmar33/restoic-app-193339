import axios from 'axios';
import {Platform} from 'react-native';
import {processError, processResponse, privateRequestParams, imageParams, publicRequestParams} from './apiHelper';
import envVars from '../consts/envVars';

const uri = (path) => envVars.API_HOSTNAME + path;

export default class UserApi {
  static getUser(token) {
    return axios
      .get(uri('/rest-auth/user/'), privateRequestParams(token))
      .then((response) => {
        return processResponse(response);
      })
      .catch((error) => {
        return processError(error);
      });
  }

  static resetPassword(email) {
    return axios
      .post(uri('/rest-auth/password/reset/'), {email}, publicRequestParams())
      .then((response) => {
        return processResponse(response);
      })
      .catch((error) => {
        return processError(error);
      });
  }

  static updateUser({token, firstName, lastName, competition, sports}) {
    return axios
      .patch(
        uri('/rest-auth/user/'),
        {
          ...(firstName && {first_name: firstName}),
          ...(lastName && {last_name: lastName}),
          ...(competition && {competition}),
          ...(sports && {foo: sports}),
        },
        privateRequestParams(token),
      )
      .then((response) => {
        return processResponse(response);
      })
      .catch((error) => {
        return processError(error);
      });
  }

  static updateImage = async ({token, image}) => {
    let data = new FormData();
    data.append('image', {
      uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
      name: `dummy${Date.now()}.jpg`,
      type: 'image/*',
    });
    return axios
      .patch(uri('/rest-auth/user/'), data, imageParams(token))
      .then((response) => {
        return processResponse(response);
      })
      .catch((error) => {
        return processError(error);
      });
  };

  static setPlayedTrack({token, track, callBack}) {
    return axios
      .post(
        uri('/api/v1/history/'),
        {track: parseInt(track), stopped_at: 1, is_finished: false},
        privateRequestParams(token),
      )
      .then((response) => {
        callBack();
        return processResponse(response);
      })
      .catch((error) => {
        return processError(error);
      });
  }

  static getSports(token) {
    return axios
      .get(uri('/api/v1/sports/'), privateRequestParams(token))
      .then((response) => {
        return processResponse(response);
      })
      .catch((error) => {
        return processError(error);
      });
  }

  static async setCode({token, code}) {
    return axios
      .post(uri('/api/v1/code'), {code}, privateRequestParams(token))
      .then((response) => {
        return processResponse(response);
      })
      .catch((error) => {
        return processError(error);
      });
  }
}
