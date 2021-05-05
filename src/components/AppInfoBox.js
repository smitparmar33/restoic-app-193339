import React from 'react';
import {View, StyleSheet} from 'react-native';
import {AppImage, AppText} from '../components';

const AppInfoBox = ({icon, title, subtitle}) => {
  return (
    <View style={styles.container}>
      <AppImage type="icon" source={icon} />
      <AppText style={styles.title}>{title}</AppText>
      <AppText style={styles.subtitle}>{subtitle}</AppText>
    </View>
  );
};

export default AppInfoBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    shadowColor: '#C4C4C4',
    shadowOffset: {
      width: 2,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 13,
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 18,
    fontStyle: 'italic',
    lineHeight: 27,
    fontWeight: '700',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 12,
    fontStyle: 'italic',
    lineHeight: 18,
    fontWeight: '500',
    marginTop: 13,
  },
});
