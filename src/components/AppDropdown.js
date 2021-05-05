import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from '../assets/icons';
import {AppText} from '../components';

const AppDropdown = ({label, value, valueLabel, onPress}) => {
  return (
    <View style={styles.container}>
      {label && (
        <View opacity={value ? 1 : 0}>
          <AppText style={styles.inputLabel}>{label}</AppText>
        </View>
      )}
      <TouchableOpacity onPress={onPress}>
        <View style={styles.wrapper}>
          <AppText>{value || valueLabel}</AppText>
          <Image source={Icon.arrowDown} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AppDropdown;

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#E9EBED',
  },
  inputLabel: {
    fontSize: 12,
    lineHeight: 18,
    color: '#8D8D8D',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
});
