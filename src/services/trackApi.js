import axios from 'axios';
import {processError, processResponse, privateRequestParams} from './apiHelper';
import envVars from '../consts/envVars';

const uri = (path) => envVars.API_HOSTNAME + path;

export default class TrackApi {
  static getCategories(token) {
    return axios
      .get(uri('/api/v1/categories/'), privateRequestParams(token))
      .then((response) => {
        return processResponse(response);
      })
      .catch((error) => {
        return processError(error);
      });
  }

  static getFavorites(token) {
    return axios
      .get(uri('/api/v1/favorites/'), privateRequestParams(token))
      .then((response) => {
        return processResponse(response);
      })
      .catch((error) => {
        return processError(error);
      });
  }

  static setFavorite({token, track}) {
    return axios
      .post(uri('/api/v1/favorites/'), {track}, privateRequestParams(token))
      .then((response) => {
        return processResponse(response);
      })
      .catch((error) => {
        return processError(error);
      });
  }
}
