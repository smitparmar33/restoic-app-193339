import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import Icon from '../assets/icons';
import {AppText} from '../components';

const GoogleButton = ({label, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.iconBox}>
          <Image style={styles.icon} source={Icon.googleIcon} />
        </View>
        <AppText style={styles.label}>{label}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4285f4',
    borderRadius: 4,
    height: 56,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 18,
    letterSpacing: -0.17,
    textAlign: 'center',
    color: 'white',
    marginTop: 4,
  },
  iconBox: {
    height: 50,
    width: 50,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 3,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {height: 25, width: 25},
});

export default GoogleButton;
