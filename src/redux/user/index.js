import {userSlice, removeUser, setToken, setName} from './reducer';
import {userSelector, tokenSelector, errorSelector, loadingSelector, initialNameSelector} from './selector';
import {getUser, getToken, updateUser, addSport, removeSport, updateImage} from './apiCall';

export {
  userSlice,
  userSelector,
  getUser,
  getToken,
  tokenSelector,
  errorSelector,
  loadingSelector,
  removeUser,
  setToken,
  setName,
  initialNameSelector,
  updateUser,
  addSport,
  removeSport,
  updateImage,
};
