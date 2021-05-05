import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from '../assets/icons';
import {AppText} from '../components';

const AppHeader = ({title = '', navigation, additional}) => {
  const goBack = () => navigation && navigation.goBack();
  return (
    <View style={styles.container}>
      <View style={{width: 50}}>
        {navigation && (
          <TouchableOpacity onPress={goBack}>
            <Image source={Icon.arrowLeft} />
          </TouchableOpacity>
        )}
      </View>
      <AppText style={styles.title}>{title}</AppText>
      <View style={{width: 50, alignItems: 'flex-end'}}>{additional}</View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(144, 160, 175, 0.15)',
  },
  title: {
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'uppercase',
    fontSize: 18,
    lineHeight: 27,
  },
});
