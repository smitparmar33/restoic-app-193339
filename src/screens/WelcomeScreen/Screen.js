import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {AppImage} from '../../components';

const Screen = ({windowWidth}) => (
  <View style={[styles.container, {width: windowWidth}]}>
    <ImageBackground style={styles.image} source={require('../../assets/images/WelcomeScreens/screen_one.png')}>
      <AppImage style={{position: 'absolute', top: 70}} source="logoWhite" type="image" />
      <View style={{marginBottom: 200}}>
        <Text style={styles.title}>Mental Training For Athletes</Text>
        <Text style={styles.subtitle}>
          Train your mind like you train your body to unlock your full performance potential
        </Text>
      </View>
    </ImageBackground>
  </View>
);

export default Screen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    flex: 1,
  },
  image: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 34,
    lineHeight: 41,
    color: '#fff',
    textAlign: 'center',
    maxWidth: '80%',
    marginTop: '25%',
    marginBottom: 40,
  },
  subtitle: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#fff',
    textAlign: 'center',
    maxWidth: '80%',
  },
});
