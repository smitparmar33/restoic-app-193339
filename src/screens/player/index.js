import React, {useState, useEffect, createRef} from 'react';
import {ImageBackground, TouchableOpacity, View, StatusBar, Image} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-navigation';
import {Icon} from 'react-native-elements';

import {introButtonsSelector, setIntroButtons} from '../../redux/globalSetting';
import {currentTrackSelector} from '../../redux/playlist';
import {nextTrackSelector} from '../../redux/playlist';
import ControlButtons from './controlButtons';
import {tokenSelector, userSelector} from '../../redux/user';
import {setFavorite} from '../../redux/favorites';
import {AppButton, AppText} from '../../components';
import {seekTo} from './playerFunctions';
import _Icon from '../../assets/icons';
import BottomMenu from './BottomMenu';
import Scrubber from './scrubber';
import styles from './styles';

const Player = ({navigation}) => {
  const dispatch = useDispatch();

  const [trackDesc, setTrackDesc] = useState(false);
  const token = useSelector(tokenSelector);
  const nowPlaying = useSelector(currentTrackSelector);
  const nextTrack = useSelector(nextTrackSelector);
  const showIntroButtons = useSelector(introButtonsSelector);
  const userInfo = useSelector(userSelector);

  const bottomMenuRef = createRef();
  const isFavorite = nowPlaying?.favorite?.status;

  const handleFavoritePress = () => dispatch(setFavorite({track: parseInt(nowPlaying.id), token}));

  useEffect(() => {
    nowPlaying.intro_duration > 0 ? dispatch(setIntroButtons(true)) : dispatch(setIntroButtons(false));
  }, [nowPlaying]);

  if (nowPlaying == null) {
    return (
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <View>
          <AppText>Failed to Load. Tap to retry</AppText>
          <Icon
            size={96}
            name="repeat"
            type="font-awesome"
            color="#d3d3d3"
            onPress={() => {
              console.log('reload pressed');
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <>
      <BottomMenu refTest={bottomMenuRef} track={nowPlaying} />
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <SafeAreaView forceInset={{bottom: 'never'}} style={{flex: 1, backgroundColor: '#000'}}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <View style={styles.image}>
              <ImageBackground source={{uri: nowPlaying.thumbnail}} style={{width: '100%', height: '100%'}} />
              {trackDesc && <BlurView style={styles.overlay} />}
              <View style={styles.topAreaContainer}>
                <View
                  style={{
                    width: '90%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{
                      zIndex: 11,
                    }}
                    onPress={() => navigation.goBack()}>
                    <Image style={{opacity: trackDesc ? 0 : 1}} source={_Icon.arrowDownWhite} />
                  </TouchableOpacity>
                  <AppText style={[styles.playingNow, {opacity: trackDesc ? 0 : 1}]}>PLAYING NOW</AppText>
                  <TouchableOpacity onPress={() => setTrackDesc(!trackDesc)}>
                    <Image source={_Icon.infoWhite} />
                  </TouchableOpacity>
                </View>
                {trackDesc && (
                  <View
                    style={{
                      paddingTop: 60,
                      paddingLeft: 24,
                      width: '100%',
                      alignItems: 'center',
                    }}>
                    <AppText
                      style={{
                        color: 'white',
                        width: '80%',
                        fontSize: 14,
                        fontStyle: 'italic',
                        fontWeight: '600',
                        lineHeight: 21,
                        textAlign: 'center',
                      }}>
                      {nowPlaying?.description}
                    </AppText>
                  </View>
                )}
              </View>
            </View>
          </View>

          <View style={styles.titleContainer}>
            <Icon
              containerStyle={[styles.button, {left: 5}]}
              reverse
              reverseColor="#e83a1f"
              name={isFavorite ? 'star' : 'star-o'}
              type="font-awesome"
              color={'#fff'}
              onPress={handleFavoritePress}
            />
            <AppText style={styles.titleText}>{nowPlaying?.title}</AppText>
            <Icon
              containerStyle={[styles.button, {right: 5}]}
              reverse
              reverseColor="#e83a1f"
              name="ellipsis-v"
              type="font-awesome"
              color={'#fff'}
              onPress={() => bottomMenuRef.current.snapTo(0)}
            />
          </View>
          <View style={styles.controlsContainer}>
            <AppText style={styles.subtitleText}>{nowPlaying?.subtitle}</AppText>
            <View style={styles.sliderContainer}>
              <Scrubber />
              <ControlButtons />
              <View style={[styles.divider, {height: 0.8, backgroundColor: 'rgba(144, 160, 175, 0.15)'}]} />
            </View>
            {showIntroButtons && (
              <View style={styles.banner}>
                <AppButton
                  type="secondary"
                  lock={!userInfo.premium_to}
                  label={'SKIP INTRO'}
                  onPress={() => {
                    if (!userInfo.premium_to) {
                      navigation.navigate('UpgradePlanScreen');
                    } else {
                      dispatch(setIntroButtons(false));
                      seekTo(nowPlaying.intro_duration);
                    }
                  }}
                />

                <TouchableOpacity
                  style={styles.closeIntroButton}
                  activeOpacity={0.5}
                  onPress={() => dispatch(setIntroButtons(false))}>
                  <Icon type="material-community" name="close" size={24} color="grey" />
                </TouchableOpacity>
              </View>
            )}
            {!showIntroButtons && nextTrack && (
              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexDirection: 'row',
                  margin: 20,
                }}>
                <Icon size={24} name="bars" type="font-awesome" color="#000" />
                {nextTrack && <AppText style={styles.upNextText}>{`Up next: ${nextTrack.title}`}</AppText>}
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Player;
