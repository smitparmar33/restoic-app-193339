import {http} from './http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import { SUBSCRIPTION_TYPE } from '../screens/UpgradePlanScreen';
import moment from 'moment';

export const getInfo = async () => {
  try {
    const value = await AsyncStorage.getItem('@token');
    return http({
      method: 'GET',
      url: '/rest-auth/user/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${value}`,
      },
    });
  } catch (e) {
    // error reading value
  }
};

export const updateSports = ({add, remove}) => {
  try {
    return Promise.all([addSports({sportIds: add}), deleteSports({prefIds: remove})]);
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

export const addSports = async ({sportIds}) => {
  try {
    return Promise.all(
      sportIds.map((id) => {
        return addSport({sportId: id});
      }),
    );
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

export const addSport = async ({sportId}) => {
  try {
    const value = await AsyncStorage.getItem('@token');
    return http({
      method: 'POST',
      url: '/api/v1/user-preferences/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${value}`,
      },
      data: {
        sport: sportId,
      },
      data: {},
    });
    console.log('a :>> ', await a);
  } catch (e) {
    console.log(e);
    // error reading value
  }
};

export const deleteSports = async ({prefIds}) => {
  try {
    return Promise.all(
      prefIds.map((id) => {
        return deleteSport({prefId: id});
      }),
    );
  } catch (e) {
    console.log(e);
    // error reading value
  }
};

export const deleteSport = async ({prefId}) => {
  try {
    const value = await AsyncStorage.getItem('@token');
    const a = http({
      method: 'DELETE',
      url: `/api/v1/user-preferences/${prefId}/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${value}`,
      },
      data: {},
    });
    console.log('a :>> ', await a);
  } catch (e) {
    console.log('asdasdasdasd', e);
    // error reading value
  }
};

export const updateInfo = async ({firstName, lastName, image, sport, competition, callBack}) => {
  try {
    const value = await AsyncStorage.getItem('@token');
    const body = {
      ...(firstName && {first_name: firstName}),
      ...(lastName && {last_name: lastName}),
      ...(image && {image: image}),
      ...(sport && {sport: sport}),
      ...(competition && {competition: competition}),
    };
    const response = await http({
      method: 'PATCH',
      url: '/rest-auth/user/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${value}`,
      },
      data: body,
    });
    if (response) return callBack && callBack();
  } catch (err) {
    console.log('err :>> ', err);
    // error reading value
  }
};

export const getUserInfo = async () => {
  try {
    const value = await AsyncStorage.getItem('@token');
    console.log('storage');
    console.log(value);
    // if (value !== null) {
    //   // value previously stored
    //   setisLoggedIn(true);
    // }
    return http({
      method: 'GET',
      url: '/rest-auth/user/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${value}`,
      },
    });
  } catch (e) {
    // error reading value
  }
};

export const uploadImage = async (source) => {
  try {
    const token = await AsyncStorage.getItem('@token');
    const createFormData = (
      source,
      // body
    ) => {
      var data = new FormData();
      data.append(
        'image',
        // source,
        {
          uri: Platform.OS === 'android' ? source : source.replace('file://', ''),
          name: `dummy${Date.now()}.jpg`,
          type: 'image/*',
        },
      );

      // Object.keys(body).forEach((key) => {
      //   data.append(key, body[key]);
      // });
      return data;
    };

    let response = await fetch('https://restoic-app-19339.botics.co/rest-auth/user/', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
      body: createFormData(source),
    });
    console.log('responsedsadasdasdasa :>> ', response);
    return response;

    // if (response.status == 200) {
    //   response.json().then((data) => {
    //     switch (data.status) {
    //       case 200:
    //         break;
    //     }
    //   });
    // }  else {
    //   this.setState({imageLoading: false, isLoading: false});;
    // }
  } catch (error) {
    // this.setState({imageLoading: false, isLoading: false});;
    console.error(error);
  }
};


export const updateUserSubscription = async ({ user, subscriptionType }) => {
  try {
    console.log('[updateUserSubscription]');
    const premiumEndDate = user?.premium_to
      ? moment(user.premium_to)
      : moment(new Date());

    const addMonths = subscriptionType === SUBSCRIPTION_TYPE.ANNUALLY
      ? { months: 12 }
      : { months: 1 };
    premiumEndDate.add(addMonths);

    const formattedEndDate = premiumEndDate.format('YYYY-MM-DD');

    const value = await AsyncStorage.getItem('@token');
    return http({
      method: 'PATCH',
      url: '/rest-auth/user/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${value}`,
      },
      data: {
        premium_to: formattedEndDate,
      },
    });
  } catch (error) {
    console.dir('[updateUserSubscription].error', error)
  }
};