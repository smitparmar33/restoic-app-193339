import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCategories = async (setcategories) => {
  try {
    const value = await AsyncStorage.getItem('@token');
    const data = await fetchCategories(setcategories, value);
    return data;
  } catch (err) {
    console.error('err :>> ', err);
  }
};

const fetchCategories = async (setcategories, token) => {
  const res = await fetch('https://restoic-app-19339.botics.co/api/v1/categories/', {
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
  });
  const resBody = await res.json();
  const parsedCategories = resBody.map((item) => {
    const numberOfSections = item.tracks.length;
    const durationInSeconds = item.tracks.reduce((acc, curr) => {
      // console.log(acc.duration);
      // console.log(curr);
      return acc + curr.duration;
    }, 0);
    return {
      ...item,
      numberOfSections,
      durationInMinutes: Math.floor(durationInSeconds / 60),
      tracks: Array.isArray(item.tracks) ? item.tracks.reverse() : item.tracks,
    };
  });
  setcategories(parsedCategories);
};
