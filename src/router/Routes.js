import 'react-native-gesture-handler';
import React from 'react';
import SignIn from '../screens/SignIn';
import ChooseAppearance from '../screens/ChooseAppearance';
import WelcomeScreenOne from '../screens/WelcomeScreenOne';
import WelcomeScreenTwo from '../screens/WelcomeScreenTwo';
import WelcomeScreenThree from '../screens/WelcomeScreenThree';
import {createStackNavigator} from '@react-navigation/stack';

import {TransitionPresets} from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

const Stack = createStackNavigator();

const Routes = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="WelcomeScreen"
      component={WelcomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SignIn"
      component={SignIn}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="WelcomeScreenOne"
      component={WelcomeScreenOne}
      options={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
    <Stack.Screen
      name="WelcomeScreenTwo"
      component={WelcomeScreenTwo}
      options={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
    <Stack.Screen
      name="WelcomeScreenThree"
      component={WelcomeScreenThree}
      options={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
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
      name="ChangePasswordScreen"
      component={ChangePasswordScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default Routes;
