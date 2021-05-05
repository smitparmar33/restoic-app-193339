import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import Icon from '../assets/icons';
import {AppText} from '../components';

const AppButton = ({label, onPress, props, style, labelStyle, container, disabled, type, lock}) => {
  const secondary = type === 'secondary';
  const secondaryWhite = type === 'secondary-white';
  const disabledLook = type === 'disabled-look';

  const containerStyle = {
    ...styles.nextButton,
    ...(secondary && !disabled && styles.secondary),
    ...((disabled || disabledLook) && styles.disabled),
    ...(secondaryWhite && styles.secondaryWhite),
    ...(secondaryWhite && disabled && styles.secondaryWhiteDisabled),
    ...style,
  };

  const textStyle = {
    ...styles.nextButtonText,
    ...(secondary && !disabled && styles.secondaryTitle),
    ...((disabled || disabledLook) && styles.colorDisabled),
    ...(secondaryWhite && styles.colorDisabled),
    ...(secondaryWhite && disabled && styles.secondaryWhiteText),
    ...labelStyle,
  };

  return (
    <View style={[styles.orangeButtonContainer, container]}>
      <TouchableOpacity disabled={disabled} {...props} onPress={onPress} style={containerStyle}>
        {lock && <Image style={styles.lock} source={Icon.redLockIcon} />}
        <AppText style={textStyle}>{label}</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  orangeButtonContainer: {
    height: 56,
    width: '100%',
  },
  disabledContainer: {
    opacity: 0.7,
  },
  nextButton: {
    backgroundColor: '#E83A1F',
    flex: 1,
    borderRadius: 4,
    height: 56,
    position: 'relative',
    justifyContent: 'center',
    alignContent: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    lineHeight: 18,
    letterSpacing: -0.17,
    textAlign: 'center',
    color: 'white',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#E83A1F',
  },
  secondaryTitle: {
    color: '#E83A1F',
  },
  secondaryWhite: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
  },
  secondaryWhiteDisabled: {
    backgroundColor: 'transparent',
  },
  secondaryWhiteText: {
    color: '#fff',
  },
  lock: {
    position: 'absolute',
    right: 20,
  },
  disabled: {
    backgroundColor: '#E3E7EB',
  },
  colorDisabled: {
    color: '#000',
  },
});

export default AppButton;
