import AsyncStorage from '@react-native-async-storage/async-storage';

const getItem = async (name) => {
  const value = await AsyncStorage.getItem(name);
  return value;
};

const setItem = (name, value) => {
  try {
    AsyncStorage.setItem(name, value);
  } catch (err) {
    console.error('AsyncStorage.setItem', err);
  }
};

export {getItem, setItem};
