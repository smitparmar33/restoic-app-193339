import React from 'react';
import {View, TouchableOpacity, StyleSheet, Linking, StatusBar} from 'react-native';
import {useDispatch} from 'react-redux';
import {removeUser} from '../redux/user';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppHeader, AppText} from '../components';
import {SafeAreaView} from 'react-navigation';
import {ScrollView} from 'react-native-gesture-handler';

const removeItemValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};

const ProfileSettings = ({navigation, route}) => {
  const dispatch = useDispatch();

  const optionsConfig = [
    {
      key: 'editProfile',
      label: 'EDIT PROFILE',
      onPress: () => {
        navigation.navigate('EditAccount');
      },
    },
    {
      key: 'contactUs',
      label: 'CONTACT US',
      onPress: () => {
        Linking.openURL('mailto:info@restoic.com');
      },
    },
    {
      key: 'changePassword',
      label: 'Change password',
      onPress: () => {
        navigation.navigate('ChangePasswordScreen');
      },
    },
    {
      key: 'upgradePlan',
      label: 'UPGRADE PLAN',
      onPress: () => {
        navigation.navigate('UpgradePlanScreen');
      },
    },
    // {
    //   key: 'redeemCode',
    //   label: 'REDEEM A CODE',
    //   onPress: () => {
    //     navigation.navigate('CodeScreen', {from: 'menu'});
    //   },
    // },
    {
      key: 'termsConditions',
      label: 'TERMS & CONDITIONS',
      onPress: () => {
        Linking.openURL('https://restoic.com/pages/terms-conditions');
      },
    },
    {
      key: 'privacyPolicy',
      label: 'PRIVACY POLICY',
      onPress: () => {
        Linking.openURL('https://restoic.com/pages/privacy-policy');
      },
    },
    {
      key: 'logout',
      label: 'Log out',
      onPress: () => {
        removeItemValue('@token');
        dispatch(removeUser());
      },
    },
  ];
  return (
    <SafeAreaView forceInset={{bottom: 'never'}} style={{flex: 1, backgroundColor: '#fff'}}>
      <AppHeader title="profile settings" navigation={navigation} />
      <View style={styles.pageContainer}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.optionsContainer}>
          <ScrollView>
            {optionsConfig.map((item) => (
              <TouchableOpacity key={item.key} style={styles.menuItem} onPress={item.onPress}>
                <AppText style={[styles.menuItemLabel, item.key === 'logout' && {color: '#F07281'}]}>
                  {item.label}
                </AppText>
                <Icon
                  name="chevron-forward-outline"
                  type="ionicon"
                  color={item.key === 'logout' ? '#F07281' : 'black'}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginLeft: 24,
    marginRight: 24,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
  },
  menuItemLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
    textTransform: 'uppercase',
    color: '#000000',
  },
  optionsContainer: {
    marginTop: 20,
  },
});
