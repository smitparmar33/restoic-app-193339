import React from 'react';
import {View, StyleSheet, Linking, TouchableOpacity, ImageBackground, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import AppButton from '../components/AppButton';
import {AppText} from '../components';

export default ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#000', paddingTop: 40}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
        }}>
        <View style={styles.topHalf}>
          <ImageBackground
            style={{
              width: '100%',
              height: '100%',
              flex: 1,
            }}
            source={require('../assets/images/coming-soon-image.png')}>
            <View style={[{height: '100%'}, {justifyContent: 'center', alignItems: 'center'}]}>
              <Icon
                containerStyle={{
                  position: 'absolute',
                  top: 27,
                  left: 18,
                  borderRadius: 24,
                  padding: 4,
                }}
                name={'close-outline'}
                onPress={() => {
                  navigation.navigate('Dashboard');
                }}
                type="ionicon"
                color={'white'}
                size={40}
              />
            </View>
          </ImageBackground>
        </View>
        <View style={styles.bottomHalf}>
          <View>
            <AppText style={[styles.comingSoonLabel, {marginTop: 10}]}>Coming soon</AppText>
            <AppText style={[styles.copyLabel, {marginTop: 18}]}>
              We’re working hard to bring this{'\n'} feature to you as soon as possible.
            </AppText>
            <AppText style={[styles.copyLabel, {marginTop: 10}]}>Thanks for your patience!</AppText>
          </View>
          <AppButton
            onPress={() => Linking.openURL('mailto:ian@restoic.com')}
            style={{width: '100%', paddingHorizontal: 24}}
            label={'suggest new features'}
          />
          <AppText style={[styles.comingSoonLabel, {marginTop: 20}]}>Follow us</AppText>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/restoic/')}>
              <Image
                style={{resizeMode: 'contain', width: 58, height: 58}}
                source={require('../assets/images/instagram-icon.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/restoic/')}>
              <Image
                style={{resizeMode: 'contain', width: 58, height: 58, marginLeft: 24}}
                source={require('../assets/images/blue-facebook-icon.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/restoicmind')}>
              <Image
                style={{resizeMode: 'contain', width: 58, height: 58, marginLeft: 24}}
                source={require('../assets/images/twitter-icon.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  comingSoonLabel: {
    fontStyle: 'italic',
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: -0.17,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#0C0C0A',
  },
  copyLabel: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    color: '#000000',
    lineHeight: 15.61,
  },
  followUsLabel: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 18,

    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#000000',
  },
  topHalf: {
    flex: 1,
    backgroundColor: '#E1E5E9',
  },
  bottomHalf: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
});
