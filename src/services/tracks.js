import {http} from './http';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getFavorites = async () => {
  try {
    const value = await AsyncStorage.getItem('@token');
    return http({
      method: 'GET',
      url: '/api/v1/favorites/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${value}`,
      },
    });
  } catch (e) {
    // error reading value
  }
};

const setFavorite = (nowPlaying, callback) => {
  if (nowPlaying) {
    AsyncStorage.getItem('@token').then((value) => {
      fetch('https://restoic-app-19339.botics.co/api/v1/favorites/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Token ${value}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          track: nowPlaying.id,
        }),
      })
        .then((response) => {
          if (response.status === 201) {
            callback();
          } else {
            console.log('FAVORITES- something went wrong response', response);
          }
        })
        .catch((error) => {
          console.log('FAVORITES- something went wrong error', error);
        });
    });
  } else {
    console.error('NOW PLAYING TRACK');
  }
};

export {getFavorites, setFavorite};

export const addFavorite = async (trackId) => {
  try {
    const value = await AsyncStorage.getItem('@token');
    return http({
      method: 'POST',
      url: '/api/v1/favorites/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${value}`,
      },
      data: {
        track: trackId,
      },
    });
  } catch (e) {
    // error reading value
  }
};
