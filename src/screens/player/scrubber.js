import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import ScrubberH from 'react-native-scrubber';
import {useSelector} from 'react-redux';

import {currentTrackSelector} from '../../redux/playlist';
import {trackProgress, seekTo, play, getState} from './playerFunctions';
import {formatTime} from '../../utils/time';
import {AppText} from '../../components';

const Scrubber = () => {
  const nowPlaying = useSelector(currentTrackSelector);
  const [time, setTime] = useState(position);
  const progress = trackProgress();
  const state = getState();
  const isPlay = state == 'playing';
  const {position, bufferedPosition} = progress;

  const {duration} = nowPlaying;

  const slidingDone = (value) => {
    if (value === 0) {
      seekTo(0.1);
      setTime(0.1);
    } else {
      seekTo(value);
      setTime(value);
    }
    !isPlay && play();
  };
  useEffect(() => {
    setTime(position);
  }, [position]);

  return (
    <View
      style={[
        {
          paddingTop: 16,
          flexDirection: 'column',
          alignItems: 'center',
          paddingLeft: 5,
        },
      ]}>
      <ScrubberH
        style={[{flex: 1}]}
        minimumValue={0}
        totalDuration={duration}
        value={time}
        bufferedValue={bufferedPosition}
        onSlidingStart={(value) => {
          console.log('value');
        }}
        onSlidingStart={(onSlide) => {
          console.log('onSlide', onSlide);
        }}
        onSlidingComplete={(value) => {
          slidingDone(value);
        }}
        trackColor="#000000"
        trackBackgroundColor="#e3e3e3"
        bufferedTrackColor="#bcbcbc"
        displayValues={false}
      />
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 24,
        }}>
        <AppText style={{left: 0, color: '#000'}}>{formatTime(position)}</AppText>
        <View style={{flex: 1}}></View>
        <AppText style={{right: 0, color: '#000'}}>-{formatTime(duration - position)}</AppText>
      </View>
      {/* {true && <ActivityIndicator style={{right: -2}} size="small" />} */}
    </View>
  );
};

export default Scrubber;
