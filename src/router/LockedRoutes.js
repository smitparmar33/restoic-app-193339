import 'react-native-gesture-handler';
import React from 'react';
import {useSelector} from 'react-redux';
import {fromSignupSelector} from '../redux/globalSetting';

import Home from '../screens/home';
import Player from '../screens/player';
import SoundScapePlayer from '../screens/SoundScapePlayer';
import SoundScapes from '../screens/SoundScapes';
import ChooseAppearance from '../screens/ChooseAppearance';
import EditAccount from '../screens/EditAccount';
import DemoImagePicker from '../screens/DemoImagePicker';
import Dashboard from '../screens/Dashboard';
import WelcomeScreenOne from '../screens/WelcomeScreenOne';
import WelcomeScreenTwo from '../screens/WelcomeScreenTwo';
import WelcomeScreenThree from '../screens/WelcomeScreenThree';
import TrackListScreen from '../screens/TrackListScreen';
import ProfileSettings from '../screens/ProfileSettings';
import ProfileScreen from '../screens/ProfileScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen';
import MeetArtistScreen from '../screens/MeetArtistScreen';
import ErrorScreen from '../screens/ErrorScreen';
import UpgradePlanScreen from '../screens/UpgradePlanScreen';
import {createStackNavigator} from '@react-navigation/stack';
import UpgradePlanTest from '../screens/UpgradePlanTest';
import CreateAccount from '../screens/CreateAccount';
import FavoritesScreen from '../screens/FavoritesScreen';
import DownloadsScreen from '../screens/DownloadsScreen';
import CodeScreen from '../screens/CodeScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

const Stack = createStackNavigator();

const LockedRoutes = () => {
  const fromSignup = useSelector(fromSignupSelector);

  if (fromSignup === 'code') {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="CodeScreen"
          component={CodeScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
  if (fromSignup === 'classic') {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CodeScreen"
        component={CodeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ComingSoonScreen"
        component={ComingSoonScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TrackListScreen"
        component={TrackListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WelcomeScreenOne"
        component={WelcomeScreenOne}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WelcomeScreenTwo"
        component={WelcomeScreenTwo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WelcomeScreenThree"
        component={WelcomeScreenThree}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DemoImagePicker"
        component={DemoImagePicker}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChooseAppearance"
        component={ChooseAppearance}
        options={{
          title: 'APPEARANCE',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="SoundScapes"
        component={SoundScapes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Player"
        component={Player}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditAccount"
        component={EditAccount}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ProfileSettings"
        component={ProfileSettings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SoundScapePlayer"
        component={SoundScapePlayer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MeetArtistScreen"
        component={MeetArtistScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UpgradePlanScreen"
        component={UpgradePlanScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ErrorScreen"
        component={ErrorScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UpgradePlanTest"
        component={UpgradePlanTest}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DownloadsScreen"
        component={DownloadsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default LockedRoutes;
