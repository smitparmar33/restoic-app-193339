import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {AppText} from '../components';

export default ({props, route, navigation}) => {
  const {error} = route.params;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <AppText>{JSON.stringify(error)} </AppText>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <AppText>go back </AppText>
      </TouchableOpacity>
    </View>
  );
};
