import {favoritesSlice} from './reducer';
import {favoritesSelector, favoritesLoadingSelector} from './selector';
import {getFavorites, setFavorite} from './apiCall';

export {favoritesSlice, getFavorites, favoritesSelector, setFavorite, favoritesLoadingSelector};
