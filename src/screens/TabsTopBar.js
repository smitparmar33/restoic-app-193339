import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {AppText} from '../components';

import NavigationService from '../services/NavigationService';
import {userSelector} from '../redux/user';

const TabsTopBar = ({title}) => {
  const userData = useSelector(userSelector);
  const defaultImg = userData.image && userData.image.includes('default.jpg');
  const avatar = require('../assets/images/avatar.png');
  const accountImg = defaultImg ? avatar : {uri: userData.image};

  return (
    <View style={styles.viewContainer}>
      {!title && (
        <Image
          style={{resizeMode: 'contain', width: '100%'}}
          source={require('../assets/images/logo-for-topbar.png')}
        />
      )}
      {title && <AppText style={styles.title}> {title} </AppText>}
      <View style={styles.profileIcon}>
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate('ProfileScreen');
          }}>
          <Avatar
            rounded
            size="large"
            containerStyle={{
              height: defaultImg ? 22 : 38,
              width: defaultImg ? 22 : 38,
              borderRadius: 21,
            }}
            source={accountImg}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
  },
  viewContainer: {
    height: 70,
    justifyContent: 'center',
    position: 'relative',
    borderColor: 'rgba(144, 160, 175, 0.15)',
    borderBottomWidth: 1,
  },
  profileIcon: {
    position: 'absolute',
    right: 24,
  },
  title: {
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#000000',
  },
});

export default TabsTopBar;
