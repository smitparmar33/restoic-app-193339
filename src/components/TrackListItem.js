import React from 'react';
import {View, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import {BottomLine, AppImage, AppText} from '../components';

const TrackListItem = ({item, onPress, menuPress, index}) => {
  const {title, subtitle} = item || {};
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AppText style={styles.number}>{index + 1}</AppText>
          <View style={{maxWidth: 200}}>
            <AppText style={styles.title}>{title}</AppText>
            <AppText style={styles.subtitle}>{subtitle}</AppText>
          </View>
        </View>
        <AppImage type="icon" source="threeDots" onPress={() => menuPress(item)} />
      </View>
      <BottomLine />
    </TouchableOpacity>
  );
};

export default TrackListItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    height: 78,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '600',
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '600',
    lineHeight: 18,
    color: '#90A0AF',
  },
  number: {
    fontSize: 22,
    fontStyle: 'italic',
    fontWeight: '900',
    lineHeight: 33,
    marginRight: 30,
  },
});
