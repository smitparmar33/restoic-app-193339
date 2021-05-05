import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {play, pause, seekTo, trackProgress, getState, skipToPrevious, skipToNext} from './playerFunctions';
import TrackPlayer, {STATE_PLAYING} from 'react-native-track-player';
import Icon from '../../assets/icons';

const ControlButtons = () => {
  const state = getState();
  const isPlay = state == 'playing';

  const [playerState, setplayerState] = useState(null);

  useEffect(() => {
    const getIsPuasedState = async () => {
      let state = await TrackPlayer.getState();
      setplayerState(state);
    };
    getIsPuasedState();
  });

  useEffect(() => {
    // effect
    if (playerState === STATE_PLAYING) {
      // setplayerState(playerState)
    }
  }, [playerState]);

  const progress = trackProgress();
  const seek = (sec) => {
    !isPlay && play();
    seekTo(progress.position + sec);
  };

  return (
    <View style={styles.controlButtons}>
      <TouchableOpacity onPress={skipToPrevious}>
        <Image source={Icon.trackPrevious} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => seek(-30)}>
        <Image source={Icon.rewindBack} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.playButton, !(playerState === STATE_PLAYING) && styles.pauseButton]}
        activeOpacity={0.5}
        onPress={playerState === STATE_PLAYING ? pause : play}>
        <Image
          style={[playerState === STATE_PLAYING ? {} : styles.play]}
          source={Icon[playerState === STATE_PLAYING ? 'pause' : 'play']}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => seek(30)}>
        <Image source={Icon.rewindForward} />
      </TouchableOpacity>

      <TouchableOpacity onPress={skipToNext}>
        <Image source={Icon.trackNext} />
      </TouchableOpacity>
    </View>
  );
};

export default ControlButtons;

const styles = StyleSheet.create({
  controlButtons: {
    marginTop: 0,
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    width: '100%',
    justifyContent: 'space-between',
  },
  playButton: {
    width: 74,
    height: 74,
    backgroundColor: '#e83a1f',
    borderColor: '#e83a1f',
    borderWidth: 0,
    paddingLeft: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 45,
  },
  pauseButton: {
    paddingLeft: 8,
  },
  play: {
    marginLeft: -4,
  },
});
