import React, {useEffect, useState} from 'react';
import {View, ImageBackground, StatusBar, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {AppButton, AppImage, AppInput, AppLoader} from '../components';
import {setCode, codeErrorSelector, codeLoadingSelector, resetCode, codeMessageSelector} from '../redux/code';
import {setFromSignup} from '../redux/globalSetting';
import {tokenSelector} from '../redux/user';

const CodeScreen = ({navigation, route}) => {
  const fromMenu = route?.params?.from === 'menu';
  const [code, typeCode] = useState('');

  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const error = useSelector(codeErrorSelector);
  const isLoading = useSelector(codeLoadingSelector);
  const codeMessage = useSelector(codeMessageSelector);

  useEffect(() => {
    dispatch(setFromSignup(''));
  }, []);

  const handleCode = (e) => {
    typeCode(e);
    if (!!error?.error) dispatch(resetCode());
  };

  return (
    <View>
      {isLoading && <AppLoader />}
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ImageBackground
        source={require('../assets/images/code_background.png')}
        style={{width: '100%', height: '100%', alignItems: 'center'}}>
        <AppImage style={{marginTop: 68}} type="image" source="logoWhite" />
        <View style={{width: '100%', paddingHorizontal: 24, marginTop: 170}}>
          {!!!codeMessage && (
            <>
              <AppInput
                onChange={handleCode}
                placeholderTextColor="#fff"
                style={{color: '#fff'}}
                placeholder="Enter in your VIP code"
                error={error?.error}
                value={code}
              />
              <AppButton
                onPress={() => dispatch(setCode({token, code}))}
                container={{marginTop: 40}}
                type="secondary-white"
                label="Next"
                disabled={!!!code}
              />
              <Text
                onPress={() => (fromMenu ? navigation.goBack() : navigation.navigate('CreateAccount'))}
                style={{
                  color: '#fff',
                  fontStyle: 'italic',
                  marginTop: 40,
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: '700',
                  textDecorationLine: 'underline',
                }}>
                {fromMenu ? 'Go back' : 'Proceed without code'}
              </Text>
            </>
          )}
          {!!codeMessage && (
            <>
              <Text style={{color: '#fff', fontSize: 18, textAlign: 'center', fontStyle: 'italic'}}>
                You have been updated to premium user for additional xy month(s).
              </Text>
              <AppButton
                onPress={() => (fromMenu ? navigation.goBack() : navigation.navigate('CreateAccount'))}
                container={{marginTop: 40}}
                type="secondary-white"
                label="Next"
              />
            </>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default CodeScreen;
