import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const AppLoader = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo-for-topbar.png')} />
    </View>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: '#fff',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
