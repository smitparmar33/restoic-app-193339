import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Linking,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import {Input, CheckBox, Icon} from 'react-native-elements';
import {AppleButton, appleAuth} from '@invertase/react-native-apple-authentication';
import {signUp, login, signUpApple, googleSignAction} from '../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin, GoogleSigninButton} from '@react-native-community/google-signin';
import {AppButton, GoogleButton, AppText, AppLoader} from '../components';
import {Alert} from 'react-native';

import {useDispatch} from 'react-redux';
import {setToken} from '../redux/user';
import {setFromSignup} from '../redux/globalSetting';
import {validateEmail} from '../utils/inputFormatter';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
  forceConsentPrompt: true,
  webClientId: '1084903484074-eoa63se56md627qa6bio7bodumi5sjk6.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  iosClientId: '1084903484074-eoa63se56md627qa6bio7bodumi5sjk6.apps.googleusercontent.com',
});

const SignIn = ({navigation, route}) => {
  const {view} = route.params || {};
  const dispatch = useDispatch();
  const PAGE_STATES = {
    HOME: 'HOME',
    SIGN_IN_EMAIL: 'SIGN_IN_EMAIL',
    SIGN_UP_EMAIL: 'SIGN_UP_EMAIL',
  };

  const [pageState, setPageState] = useState(view || PAGE_STATES.HOME);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setrememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginError, setLoginError] = useState(false);
  const [signupError, setSignupError] = useState(false);

  const [isPasswordHidden, setisPasswordHidden] = useState(true);

  const continueSignUp = !(!!firstName && !!validateEmail(email) && password.length > 5);
  const continueLogIn = !(!!validateEmail(email) && !!password);

  //////// THIS SHOULD BE MOVED IN REDUX :'( ////////////
  const loginUser = async () => {
    setLoading(true);
    try {
      const response = await login({email, password});
      await AsyncStorage.setItem('@token', response.data.key);
      dispatch(setToken(response.data.key));
      setLoading(false);
    } catch (e) {
      setLoginError(true);
      setLoading(false);
      console.log(e.response.data);
      console.log(e.response.status);
      console.log(e.response.headers);
    }
  };

  //////// THIS SHOULD BE MOVED IN REDUX :( ////////////
  const signUpUser = async ({withCode}) => {
    setLoading(true);
    try {
      const response = await signUp({firstName, email, password});
      await AsyncStorage.setItem('@token', response.data.key);
      dispatch(setFromSignup(withCode ? 'code' : 'classic'));
      dispatch(setToken(response.data.key));
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setSignupError(true);
      console.log(e.response.data);
      console.log(e.response.status);
      console.log(e.response.headers);
    }
  };

  //////// THIS SHOULD BE MOVED IN REDUX :( ////////////
  const onAppleButtonPress = async (type) => {
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
      if (credentialState === appleAuth.State.AUTHORIZED && appleAuthRequestResponse) {
        const response = await signUpApple(appleAuthRequestResponse);
        if (response) {
          // TODO: depend on type redirect on page
          if (type === 'signUp') {
            await AsyncStorage.setItem('@token', response.data.key);
            dispatch(setToken(response.data.key));
          }
          if (type === 'login') {
            await AsyncStorage.setItem('@token', response.data.key);
            dispatch(setToken(response.data.key));
          }
        }
      } else {
        Alert.alert('Info', 'Access denied.');
      }
    } catch (error) {
      console.log('e :>> ', error);
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  };

  //////// THIS SHOULD BE MOVED IN REDUX :( ////////////
  const googleSign = async (type) => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const {accessToken} = await GoogleSignin.getTokens(); // to get tokens
      if (accessToken) {
        const response = await googleSignAction(accessToken);
        if (type === 'signUp') {
          await AsyncStorage.setItem('@token', response.data.key);
          dispatch(setToken(response.data.key));
        }
        if (type === 'login') {
          await AsyncStorage.setItem('@token', response.data.key);
          dispatch(setToken(response.data.key));
        }
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  return (
    <>
      {loading && <AppLoader />}
      <ScrollView style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'height' : 'height'}
          // behavior={Platform.OS == 'ios' ? 'position' : 'height'}
          // contentContainerStyle={styles.pageContainer}
          keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 20}
          keyboardVerticalOffset={-220}
          style={styles.pageContainer}
          //
        >
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <SafeAreaView style={{flex: 1}}>
            <View style={styles.topHalfOfPageContainer}>
              {pageState === PAGE_STATES.HOME && (
                <View style={{width: '100%', ...styles.topHalfOfPageContainer}}>
                  <Image
                    resizeMode={'contain'}
                    style={{marginBottom: 0, width: '80%'}}
                    source={require('../assets/images/restoic-logo.png')}
                  />
                </View>
              )}
              {pageState === PAGE_STATES.SIGN_UP_EMAIL && (
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      flexDirection: 'row',
                      width: '100%',
                      alignItems: 'center',
                      marginTop: 90,
                    }}>
                    <Image source={require('../assets/images/logo-for-topbar.png')} />
                    <AppText style={{fontStyle: 'italic', fontWeight: '800', fontSize: 24, marginTop: 5}}>
                      {' /  SIGN UP'}
                    </AppText>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Input
                      allowFontScaling={false}
                      autoCompleteType={'off'}
                      autoCapitalize="none"
                      placeholder="First name *"
                      value={firstName}
                      style={{...styles.input, ...styles.firstNameInput}}
                      onChangeText={(value) => {
                        setFirstName(value);
                        setSignupError(false);
                      }}
                      inputContainerStyle={{
                        color: 'black',
                        borderBottomColor: '#E9EBED',
                      }}
                      inputStyle={{}}
                      placeholderTextColor={'black'}
                    />
                    <Input
                      allowFontScaling={false}
                      autoCompleteType={'off'}
                      autoCapitalize="none"
                      placeholder="Email *"
                      value={email}
                      style={{...styles.input, ...styles.firstNameInput}}
                      onChangeText={(value) => {
                        setEmail(value);

                        setSignupError(false);
                      }}
                      inputContainerStyle={{
                        color: 'black',
                        borderBottomColor: '#E9EBED',
                      }}
                      inputStyle={{}}
                      placeholderTextColor={'black'}
                    />
                    <Input
                      errorMessage={signupError && 'User with this email address already exists..'}
                      allowFontScaling={false}
                      autoCompleteType={'off'}
                      autoCapitalize="none"
                      placeholder="Create password"
                      value={password}
                      style={{...styles.input, ...styles.createPasswordInput}}
                      onChangeText={(value) => {
                        setPassword(value);
                        setSignupError(false);
                      }}
                      inputContainerStyle={{
                        color: 'black',
                        borderBottomColor: '#E9EBED',
                      }}
                      inputStyle={{}}
                      placeholderTextColor={'black'}
                      secureTextEntry={isPasswordHidden}
                      rightIcon={
                        <Icon
                          name={isPasswordHidden ? 'eye' : 'eye-off'}
                          onPress={() => setisPasswordHidden(!isPasswordHidden)}
                          type="ionicon"
                          color="black"
                        />
                      }
                    />
                  </View>
                </View>
              )}
              {pageState === PAGE_STATES.SIGN_IN_EMAIL && (
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 90,
                    }}>
                    <Image source={require('../assets/images/logo-for-topbar.png')} />
                    <AppText style={{fontStyle: 'italic', fontWeight: '800', fontSize: 24, marginTop: 5}}>
                      {' /  LOG IN'}
                    </AppText>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      width: '100%',
                      justifyContent: 'center',
                      padding: 0,
                    }}>
                    <Input
                      allowFontScaling={false}
                      autoCompleteType={'off'}
                      autoCapitalize="none"
                      placeholder="Email"
                      value={email}
                      style={{...styles.input, ...styles.firstNameInput}}
                      onChangeText={(value) => {
                        setEmail(value);
                        loginError && setLoginError(false);
                      }}
                      inputContainerStyle={{
                        color: 'black',
                        borderBottomColor: '#E9EBED',
                      }}
                      inputStyle={{}}
                      placeholderTextColor={'black'}
                    />
                    <Input
                      errorMessage={loginError && 'Unable to log in with provided credentials.'}
                      allowFontScaling={false}
                      autoCompleteType={'off'}
                      autoCapitalize="none"
                      placeholder="Enter password"
                      style={{...styles.input, ...styles.firstNameInput}}
                      onChangeText={(value) => {
                        setPassword(value);
                        loginError && setLoginError(false);
                      }}
                      inputContainerStyle={{
                        color: 'black',
                        borderBottomColor: '#E9EBED',
                      }}
                      inputStyle={{}}
                      placeholderTextColor={'black'}
                      secureTextEntry={isPasswordHidden}
                      rightIcon={
                        <Icon
                          name={isPasswordHidden ? 'eye' : 'eye-off'}
                          onPress={() => setisPasswordHidden(!isPasswordHidden)}
                          type="ionicon"
                          color="black"
                        />
                      }
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <CheckBox
                          checkedColor="#E83A1F"
                          checked={rememberMe}
                          onPress={() => setrememberMe(!rememberMe)}
                          containerStyle={{borderWidth: 0, margin: 0, padding: 0, backgroundColor: 'transparent'}}
                        />
                        <AppText style={{color: '#8D8D8D', fontSize: 16, fontWeight: '400', marginLeft: 0}}>
                          Remember me
                        </AppText>
                      </View>
                      <TouchableOpacity onPress={() => navigation.navigate('ChangePasswordScreen')}>
                        <AppText style={{fontSize: 18, fontWeight: '400'}}>Forgot password?</AppText>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.bottomHalfOfPage}>
              {pageState === PAGE_STATES.HOME && (
                <View>
                  <View style={[styles.orangeButtonContainer, {marginBottom: 20}]}>
                    <TouchableOpacity
                      style={styles.signUpButton}
                      onPress={() => setPageState(PAGE_STATES.SIGN_UP_EMAIL)}>
                      <Image
                        style={{position: 'absolute', left: 16, top: 18}}
                        source={require('../assets/images/email-icon.png')}
                      />
                      <AppText style={styles.signUpButtonText}>SIGN UP WITH EMAIL</AppText>
                    </TouchableOpacity>
                  </View>
                  {Platform.OS === 'ios' ? (
                    <AppleButton
                      buttonStyle={AppleButton.Style.BLACK}
                      buttonType={AppleButton.Type.SIGN_UP}
                      textStyle={{fontSize: 18}}
                      style={{
                        width: '100%', // You must specify a width
                        height: 56, // You must specify a height
                        marginTop: 10,
                      }}
                      onPress={() => onAppleButtonPress('signUp')}
                    />
                  ) : (
                    <View style={{marginTop: 10}}>
                      <GoogleButton label="Sign up with Google" onPress={() => googleSign('signUp')} />
                    </View>
                  )}
                </View>
              )}
              {pageState === PAGE_STATES.SIGN_UP_EMAIL && (
                <View>
                  <View style={styles.orangeButtonContainer}>
                    <AppButton disabled={continueSignUp} onPress={signUpUser} label="Sign up" />
                  </View>
                  {/* <View style={[styles.orangeButtonContainer, {marginTop: 10}]}>
                  <AppButton
                    type="secondary"
                    disabled={continueSignUp}
                    onPress={() => signUpUser({withCode: true})}
                    label="Sign up with code"
                  />
                </View> */}
                  {Platform.OS === 'ios' ? (
                    <AppleButton
                      buttonStyle={AppleButton.Style.BLACK}
                      buttonType={AppleButton.Type.SIGN_UP}
                      textStyle={{fontSize: 18}}
                      style={{
                        width: '100%', // You must specify a width
                        height: 56, // You must specify a height
                        marginTop: 10,
                      }}
                      onPress={() => onAppleButtonPress('signUp')}
                    />
                  ) : (
                    <View style={{marginTop: 10}}>
                      <GoogleButton label="Sign up with Google" onPress={() => googleSign('signUp')} />
                    </View>
                  )}
                </View>
              )}
              {pageState === PAGE_STATES.SIGN_IN_EMAIL && (
                <View>
                  <View style={styles.orangeButtonContainer}>
                    <AppButton disabled={continueLogIn} label="Log in" onPress={loginUser} />
                  </View>
                  <AppText style={styles.orLabel}>OR</AppText>
                  {Platform.OS === 'ios' ? (
                    <AppleButton
                      buttonStyle={AppleButton.Style.BLACK}
                      buttonType={AppleButton.Type.SIGN_IN}
                      textStyle={{fontSize: 18}}
                      style={{
                        width: '100%', // You must specify a width
                        height: 56, // You must specify a height
                      }}
                      onPress={() => onAppleButtonPress('login')}
                    />
                  ) : (
                    <GoogleButton label="Sign in with Google" onPress={() => googleSign('signin')} />
                  )}
                </View>
              )}
              {pageState !== PAGE_STATES.SIGN_IN_EMAIL && (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <AppText style={{fontSize: 18, fontWeight: '400', letterSpacing: -0.17}}>
                    Have an account?
                    <AppText style={{fontWeight: 'bold'}} onPress={() => setPageState(PAGE_STATES.SIGN_IN_EMAIL)}>
                      {' Log in'}
                    </AppText>
                  </AppText>
                </View>
              )}
              {pageState === PAGE_STATES.SIGN_IN_EMAIL && (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <AppText style={{fontSize: 18, fontWeight: '400', letterSpacing: -0.17}}>
                    I don’t have an account.
                    <AppText style={{fontWeight: 'bold'}} onPress={() => setPageState(PAGE_STATES.SIGN_UP_EMAIL)}>
                      {' Sign up'}
                    </AppText>
                  </AppText>
                </View>
              )}
              <View style={{paddingBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => Linking.openURL('https://restoic.com/pages/terms-conditions')}>
                  <AppText style={{fontWeight: '400'}}>
                    By using Restoic you agree to our <AppText style={{fontWeight: 'bold'}}>Terms </AppText>
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

const styles = {
  pageContainer: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginLeft: 24,
    marginRight: 24,
    height: Dimensions.get('window').height,
    // flexShrink: 0.5,
  },
  topHalfOfPageContainer: {
    // flex: 0.63,
    flex: 1.7,
    justifyContent: 'center',
    alignItems: 'center',
    // flexShrink: 1,
    // flexGrow: 5,
  },
  bottomHalfOfPage: {
    // flex: 0.37,
    // backgroundColor: 'red',
    flex: 1.3,
    // flexShrink: 2,
    justifyContent: 'space-around',
  },
  orangeButtonContainer: {
    height: 56,
    // paddingBottom: 20,
  },
  signUpButton: {
    backgroundColor: '#E83A1F',
    flex: 1,
    borderRadius: 4,
    height: 56,
    position: 'relative',
    justifyContent: 'center',
    alignContent: 'center',
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    lineHeight: 18,
    letterSpacing: -0.17,
    textAlign: 'center',
    color: 'white',
    marginTop: 4,
  },
  orLabel: {
    fontWeight: '500',
    fontSize: 16,
    color: '#8D8D8D',
    textAlign: 'center',
    paddingVertical: 10,
  },
  input: {},
  firstNameInput: {
    color: 'black',
  },
  createPasswordInput: {
    color: 'black',
    letterSpacing: -0.165,
  },
};

export default SignIn;
