import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Icon from '../assets/icons';
import {AppText} from '../components';

const StreakBadge = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Image style={styles.icon} source={Icon.streak} />
        <AppText style={styles.text}>Streak</AppText>
      </View>
    </View>
  );
};

const StreakComponent = ({current, longest}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapperLeft}>
        <AppText style={styles.int}>{current}</AppText>
        <AppText style={styles.label}>current</AppText>
      </View>
      <StreakBadge />
      <View style={styles.wrapperRight}>
        <AppText style={styles.int}>{longest}</AppText>
        <AppText style={styles.label}>longest</AppText>
      </View>
    </View>
  );
};

export default StreakComponent;

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    backgroundColor: '#E83A1F',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    transform: [{translateX: -50}],
    left: '50%',
  },
  inner: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
  },
  wrapperLeft: {
    marginRight: 60,
    alignItems: 'flex-end',
  },
  wrapperRight: {
    marginLeft: 60,
    alignItems: 'flex-start',
  },
  int: {
    fontWeight: '700',
    fontSize: 18,
  },
  label: {
    color: '#474747',
    fontSize: 14,
    fontWeight: '400',
  },
  wrapper: {
    flexDirection: 'row',
  },
});
