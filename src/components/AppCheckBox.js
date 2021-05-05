import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from '../assets/icons';
import {AppText} from '../components';

const AppCheckBox = ({item, checked, onPress, labelKey}) => (
  <View style={styles.container}>
    {(!!item[labelKey] || !!item?.label) && <AppText style={styles.label}>{item[labelKey] || item?.label}</AppText>}
    <TouchableOpacity onPress={() => onPress(item?.id, item?.sport, !checked)}>
      <View style={[styles.checkBox, checked && {borderColor: '#000', backgroundColor: '#000'}]}>
        <Image source={Icon.checkMark} />
      </View>
    </TouchableOpacity>
  </View>
);

export default AppCheckBox;

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
    borderRadius: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
  },
});
