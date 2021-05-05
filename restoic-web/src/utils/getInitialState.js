import { setTokenIntoHeader } from "../services/api";

const getInitialState = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
    let response = {};
    if (user !== null) {
        response = {
            user,
        }
    }
    if (token !== null) {
        setTokenIntoHeader(token);
        response = {
            ...response,
            token,
            authenticated: true
        }
    }
    return response
}

export {getInitialState}