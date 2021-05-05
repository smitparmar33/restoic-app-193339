import axios from 'axios';
import { BASE_API_URL } from '../config';

const instance = axios.create({
    baseURL: BASE_API_URL,
    timeout: 5000,
});

const removeTokenFromHeader = () => {
    delete instance.defaults.headers.common['Authorization'];
}

const setTokenIntoHeader = (token) => {
    instance.defaults.headers.common['Authorization'] = `Token ${token}`
}

export default instance;
export { removeTokenFromHeader, setTokenIntoHeader}

