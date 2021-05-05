import React from 'react';
import {View, TouchableOpacity, StatusBar, Image} from 'react-native';
import {AppText} from '../components';

const SignIn = ({navigation}) => (
  <View
    style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
    }}>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={true} />
    <View style={{flex: 1.8, justifyContent: 'center', alignItems: 'center'}}>
      {/* <View style={{width: 250, height: 78, , marginBottom: 34}} /> */}
      <Image style={{marginBottom: 34}} source={require('../assets/images/restoic-logo.png')} />

      <View style={{width: 286, height: 54, alignItems: 'center'}}>
        <AppText style={{fontSize: 18, fontWeight: 'bold', lineHeight: 27}}>Athlete optimization,</AppText>
        <AppText style={{fontSize: 18, fontWeight: 'bold', lineHeight: 27}}>Reimagined.</AppText>
      </View>
    </View>
    <View style={{flex: 1}}>
      <View style={{height: 56, marginBottom: 20}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#E83A1F',
            flex: 1,
            marginLeft: 24,
            marginRight: 24,
            borderRadius: 4,
            height: 56,
            position: 'relative',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <AppText
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              fontStyle: 'italic',
              lineHeight: 18,
              letterSpacing: -0.17,
              textAlign: 'center',
              color: 'white',
              marginTop: 4,
            }}>
            SIGN UP WITH EMAIL
          </AppText>
          <Image
            style={{position: 'absolute', left: 16, top: 18}}
            source={require('../assets/images/email-icon.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, marginBottom: 20}} />
      <View style={{flex: 1, marginBottom: 20, justifyContent: 'center', alignItems: 'center'}}>
        <AppText style={{fontSize: 18, fontWeight: '400', lineHeight: 18, letterSpacing: -0.17}}>
          Have an account?
          <AppText style={{fontWeight: 'bold'}}>{' Log in'}</AppText>
        </AppText>
      </View>
      <View style={{flex: 1, marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
        <AppText style={{fontSize: 14, fontWeight: '400', lineHeight: 18}}>
          By using Restoic you agree to our <AppText style={{fontWeight: 'bold'}}>Terms </AppText>
        </AppText>
      </View>
    </View>
  </View>
);

export default SignIn;
