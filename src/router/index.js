import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavigationService from '../services/NavigationService';
import SoundScapeModal from '../screens/SoundScapeModal';
import {useDispatch, useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

import TrackPlayer, {useTrackPlayerEvents} from 'react-native-track-player';
import {addCurrentTrack} from '../redux/playlist';
import {AlertBar, AppLoader} from '../components';
import {registerCustomIconType} from 'react-native-elements';
import RestoicIcon from '../../customIcon';

import Routes from './Routes';
import {DefaultTheme} from '@react-navigation/native';
import LockedRoutes from './LockedRoutes';
import {getUser, getToken, tokenSelector, loadingSelector} from '../redux/user/';
import {categoriesLoaderSelector} from '../redux/tracks';
import {setCategoriesTrigger} from '../redux/globalSetting';
import UserApi from '../services/userApi';

const Router = () => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const RootStack = createStackNavigator();

  useEffect(() => {
    dispatch(getToken());
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [token]);

  useTrackPlayerEvents(['playback-track-changed'], async (event) => {
    if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      if (event.nextTrack) {
        dispatch(addCurrentTrack(event.nextTrack));
        UserApi.setPlayedTrack({token, track: event.nextTrack, callBack: () => dispatch(setCategoriesTrigger())});
      }
    }
  });

  const categoriesLoader = useSelector(categoriesLoaderSelector);
  const userLoader = useSelector(loadingSelector);

  const isLoading = categoriesLoader || userLoader;

  return (
    <NavigationContainer ref={(ref) => NavigationService.setTopLevelNavigator(ref)} theme={MyTheme}>
      {registerCustomIconType('restoic', RestoicIcon)}
      <AlertBar />
      {isLoading && <AppLoader />}
      <RootStack.Navigator mode="modal" headerMode="none">
        {token ? (
          <RootStack.Screen name="Main" component={LockedRoutes} />
        ) : (
          <RootStack.Screen name="Main" component={Routes} />
        )}
        <RootStack.Screen name="MyModal" component={SoundScapeModal} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
};
