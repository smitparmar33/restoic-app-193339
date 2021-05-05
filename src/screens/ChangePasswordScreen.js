import React, {useEffect, useState} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-navigation';

import {AppButton, AppInput, AppLoader, AppHeader, AppText} from '../components';
import {resetPassword, resetPasswordReset} from '../redux/resetPassword';

const ChangePasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const success = useSelector((state) => state.resetPassword.success);
  const loading = useSelector((state) => state.resetPassword.loading);
  const error = useSelector((state) => state.resetPassword.error);

  const submit = () => dispatch(resetPassword(email));

  useEffect(() => {
    !!error && dispatch(resetPasswordReset());
  }, [email]);

  useEffect(() => {
    return () => {
      dispatch(resetPasswordReset());
    };
  }, []);

  return (
    <>
      {loading && <AppLoader />}
      <SafeAreaView>
        <AppHeader title="Change Password" navigation={navigation} />
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.container}>
          {!success ? (
            <>
              <AppText style={styles.title}>Please enter your email.</AppText>
              <AppInput
                autoCapitalize="none"
                error={error}
                placeholder="Email"
                label="Email"
                value={email}
                onChange={(value) => setEmail(value)}
              />
              <AppButton onPress={submit} disabled={!email} label="Change Password" />
            </>
          ) : (
            <>
              <AppText style={styles.success}>Success! Please check your email</AppText>
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  success: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
