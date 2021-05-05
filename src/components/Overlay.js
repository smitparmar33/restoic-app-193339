import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

const Overlay = ({visible, onPress}) => {
  if (!visible) return null;
  return (
    <TouchableWithoutFeedback onPress={() => onPress(false)}>
      <View style={styles.container} />
    </TouchableWithoutFeedback>
  );
};

export default Overlay;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
});
