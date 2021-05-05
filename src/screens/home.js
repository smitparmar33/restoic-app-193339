import React from 'react';
import {View, Button} from 'react-native';
import {AppText} from '../components';

const HomeScreen = ({navigation}) => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <AppText>Home Screen</AppText>
    <Button title="Player" onPress={() => navigation.navigate('Player')} />
    <Button title="SignIn" onPress={() => navigation.navigate('SignIn')} />
    <Button title="Soundscapes" onPress={() => navigation.navigate('SoundScapes')} />
    <Button title="Soundscape Player" onPress={() => navigation.navigate('SoundScapePlayer')} />
    <Button title="Open Modal" onPress={() => navigation.navigate('MyModal')} />
    <Button title="DemoImagePicker" onPress={() => navigation.navigate('DemoImagePicker')} />
  </View>
);

export default HomeScreen;
