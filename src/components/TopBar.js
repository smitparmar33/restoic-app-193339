import React, {Component, useContext, useEffect, useState} from 'react';
import {TouchableOpacity, View, StyleSheet, TouchableWithoutFeedback, Image, Button} from 'react-native';
import {Icon} from 'react-native-elements';
import NavigationService from '../services/NavigationService';
import {currentTrackSelector} from '../redux/playlist';
import {useSelector} from 'react-redux';
import {getState, pause, play} from '../screens/player/playerFunctions';
import TrackPlayer, {useTrackPlayerEvents, TrackPlayerEvents, STATE_PLAYING} from 'react-native-track-player';
import {AppText} from '../components';

const TopBar = () => {
  const currentTrack = useSelector(currentTrackSelector);
  const state = getState();

  const [playerState, setplayerState] = useState(null);

  useEffect(() => {
    const getIsPuasedState = async () => {
      let state = await TrackPlayer.getState();
      setplayerState(state);
      if (state === STATE_PLAYING) {
        // console.warn('PLAYING');
      } else {
        // console.warn('NOT PLAYING');
      }
      // console.log(state);
    };
    getIsPuasedState();
  });

  if (!currentTrack) {
    return <></>;
  }
  return (
    <View style={styles.container}>
      <Image resizeMode={'cover'} source={{uri: currentTrack.thumbnail}} style={styles.imgContainer} />
      <TouchableWithoutFeedback
        onPress={() =>
          NavigationService.navigate('Player', {
            item: undefined,
            trackIndex: undefined,
          })
        }>
        <View style={styles.middleContainer}>
          <AppText style={styles.title}> {currentTrack?.title} </AppText>
          <AppText style={styles.subtitle} numberOfLines={1}>
            {currentTrack?.subtitle}{' '}
          </AppText>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            playerState === STATE_PLAYING ? pause() : play();
          }}>
          <Icon
            size={26}
            type="restoic"
            name={playerState === STATE_PLAYING ? 'rs-pause' : 'rs-play'}
            color={'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 72,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(144, 160, 175, 0.25)',
  },
  imgContainer: {
    height: 72,
    width: 72,
  },
  middleContainer: {
    justifyContent: 'center',
    marginLeft: 18,
    flex: 3,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 16,
    left: -3,
    lineHeight: 24,
    color: '#0C0C0A',
  },
  subtitle: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 18,
    textTransform: 'uppercase',
    color: '#90A0AF',
    width: 140,
  },
});

export default TopBar;
