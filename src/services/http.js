import axios from 'axios';
import {appConfig} from '../config/app';

export const http = axios.create({
  baseURL: 'https://restoic-app-19339.botics.co',
});

/**
 * USE THIS FOR DEBUGGING REQUESTS
 */
// http.interceptors.request.use(request => {
//   console.log('[axios:request]', request)
//   return request
// })
// http.interceptors.response.use(response => {
//   console.log('[axios:response]', response)
//   return response
// }, error => {
//   console.warn('[axios:error]', error)
//   console.warn('[axios:error.response]', error?.response)
//   return Promise.reject(error?.response)
// })