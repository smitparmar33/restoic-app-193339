import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppCheckBox} from '../components';
import {userSelector, setPremium} from '../redux/user';
import {AppHeader, AppText} from '../components';
import {SafeAreaView} from 'react-navigation';

const UpgradePlanTest = ({navigation}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(userSelector);

  return (
    <SafeAreaView forceInset={{bottom: 'never'}} style={{flex: 1, backgroundColor: '#fff'}}>
      <AppHeader title="profile settings" navigation={navigation} />
      <View style={{padding: 40}}>
        <AppText style={{fontSize: 18, fontWeight: '700', fontStyle: 'italic', marginBottom: 40}}>
          This is only for testing!
        </AppText>
        <View style={{width: 200}}>
          <AppCheckBox
            item={{
              label: 'Premium',
              id: 1,
            }}
            checked={userInfo?.premium_to}
            onPress={() => dispatch(setPremium())}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpgradePlanTest;

const styles = StyleSheet.create({});
