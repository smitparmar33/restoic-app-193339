import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {AppImage} from '../../components';

const ScreenTwo = ({title, subtitle, image, windowWidth}) => (
  <View style={[styles.container, {width: windowWidth}]}>
    <View style={styles.upperBoxWrapper}>
      <View style={styles.upperBox}>
        <AppImage style={styles.upperImage} source={image} type="image" />
      </View>
    </View>
    <View style={styles.lowerBoxWrapper}>
      <ImageBackground style={styles.lowerBox} source={require('../../assets/images/WelcomeScreens/screens_bg.png')}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </ImageBackground>
    </View>
  </View>
);

export default ScreenTwo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    flex: 1,
  },
  upperBoxWrapper: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperBox: {
    height: '80%',
    width: '80%',
    backgroundColor: 'transparent',
  },
  upperImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  lowerBoxWrapper: {
    width: '100%',
    flex: 1,
  },
  lowerBox: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 40,
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
    color: '#fff',
    maxWidth: '90%',
  },
});
