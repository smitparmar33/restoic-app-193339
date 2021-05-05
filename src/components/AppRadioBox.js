import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {AppText} from '../components';

const AppRadioBox = ({item, checked, onPress}) => {
  return (
    <View style={styles.container}>
      {item?.label && <AppText style={styles.label}>{item?.label}</AppText>}
      <TouchableOpacity onPress={() => onPress(item?.id)}>
        <View style={[styles.checkBox, checked && {borderColor: '#000'}]}>
          {checked && <View style={styles.inner} />}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AppRadioBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 55,
  },
  checkBox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#8D8D8D',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    padding: 8,
  },
  inner: {
    width: 12,
    height: 12,
    borderColor: '#8D8D8D',
    backgroundColor: '#000',
    borderRadius: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
  },
});
