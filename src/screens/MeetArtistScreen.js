import React from 'react';
import {View, StyleSheet, StatusBar, Image, ScrollView, ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {useDispatch} from 'react-redux';

import {Icon} from 'react-native-elements';
import AppButton from '../components/AppButton';
import {setBinauralSeen} from '../redux/globalSetting';
import {setItem} from '../services/asyncStorage';
import {AppText} from '../components';

const MeetArtistScreen = () => {
  const dispatch = useDispatch();
  const handlePress = () => {
    setItem('seen_binaural', 'true');
    dispatch(setBinauralSeen(true));
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <SafeAreaView forceInset={{bottom: 'never'}} style={{backgroundColor: '#000'}}>
        <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden'}}>
          <ImageBackground
            source={require('../assets/images/meet_artist_bg.png')}
            style={{width: '100%', height: '100%'}}>
            <ScrollView>
              <View style={styles.container}>
                <Icon
                  containerStyle={styles.backIcon}
                  name="close-outline"
                  onPress={handlePress}
                  type="ionicon"
                  color="white"
                  size={40}
                />
                <AppText style={styles.title}>Meet The Artist</AppText>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <AppText style={styles.subtitle}>BINAURAL BEATS</AppText>
                  <Image style={{position: 'absolute', top: 60}} source={require('../assets/images/cory_allen.png')} />
                </View>
                <AppText style={styles.artistName}>Cory Allen</AppText>
                <AppText style={styles.artistSite}>www.cory-allen.com</AppText>
                <AppText style={styles.artistDesc}>
                  Utilized by professional teams including the Stanley Cup champion Chicago Blackhawks, Cory’s binaural
                  beats have been independently verified by brain scientists to encourage flow state, restorative sleep
                  & recovery.
                </AppText>
                <AppButton
                  style={styles.button}
                  container={styles.buttonWrapper}
                  onPress={handlePress}
                  label="Listen now"
                />
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MeetArtistScreen;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#000',
  },
  buttonWrapper: {width: '100%', marginTop: 20, marginBottom: 20},
  button: {backgroundColor: '#000'},
  container: {
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    marginHorizontal: 24,
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  backIcon: {
    position: 'absolute',
    top: 10,
    left: -20,
    borderRadius: 24,
    padding: 4,
    zIndex: 1000,
  },
  title: {
    color: '#fff',
    fontWeight: '700',
    fontStyle: 'italic',
    fontSize: 18,
    letterSpacing: -0.17,
    marginTop: 50,
  },
  subtitle: {
    color: '#7A0F01',
    fontSize: 54,
    fontWeight: '900',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 55,
    marginTop: 10,
    marginBottom: 260,
  },
  artistName: {
    fontWeight: '700',
    color: '#fff',
    fontStyle: 'italic',
    fontSize: 18,
  },
  artistSite: {
    fontWeight: '500',
    color: '#fff',
    fontSize: 14,
    opacity: 0.5,
  },
  artistDesc: {
    fontWeight: '500',
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    maxWidth: '80%',
    marginTop: 20,
    lineHeight: 21.63,
  },
});
