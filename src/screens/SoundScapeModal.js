import React, {Component, useState, useContext, useEffect, createContext} from 'react';
import {View, TouchableOpacity, ImageBackground, StatusBar, Animated, StyleSheet, Easing, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import Video from 'react-native-video';
import {BlurView} from '@react-native-community/blur';
import _ from 'lodash';
import {AppText, AppButton, AppLoader} from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
    borderRadius: 75,
    borderWidth: 0.7,
    borderColor: 'white',
  },
  item: {
    position: 'absolute',
    width: 100,
    height: 136, // this is the diameter of ProgressCircle
  },
  dot: {
    borderRadius: 7,
    width: 14,
    height: 14,
    backgroundColor: 'white',
  },
  text: {
    color: '#fff',
  },

  // blur view
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

function formatTrackDuration(duration) {
  // Hours, minutes and seconds
  var hrs = ~~(duration / 3600);
  var mins = ~~((duration % 3600) / 60);
  var secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = '';

  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;
  return ret;
}

const PlayerContext = createContext({
  playerState: 'PLAYING', // on of 'PLAYING' 'PAUSED' 'FINISHED'
  setPlayerState: () => {},
});

function SoundScapeModal({route, navigation}) {
  const {duration, track} = route.params;

  const imageURI = track.thumbnail;
  const totalDuration = duration;

  const [isfavorite, setisfavorite] = useState(false);

  useEffect(() => {
    setisfavorite(track.favorite.status);
  }, []);

  const [playerState, setPlayerState] = useState('PLAYING');
  const [player, setPlayer] = useState({});

  const [paused, setPaused] = useState(false);
  const [rate] = useState(0);
  const [progr, setProgr] = useState(0);
  const [uri] = useState(track.url);

  const initialPlayerContextState = {
    playerState,
    setPlayerState,
    player,
    togglePlay: () => setPaused(!paused),
    getTimeRemaining: () => formatTrackDuration(totalDuration - progr),
    getSecondsRemaining: () => totalDuration - progr,
    totalDuration,
    getProgress: () => progr / totalDuration,
    resetTrack: () => {
      setProgr(0);
      player.seek(0);
      setPaused(false);
    },
  };

  const [imageLoader, setImageLoader] = useState(true);
  const [soundLoader, setSoundLoader] = useState(true);

  return (
    <ImageBackground
      source={{uri: imageURI}}
      onLoad={() => setImageLoader(false)}
      style={{
        height: '100%',
        width: '100%',
      }}>
      {(imageLoader || soundLoader) && <AppLoader />}
      <>
        <Video
          source={{uri}} // Can be a URL or a local file.
          paused={paused}
          ref={(ref) => {
            setPlayer(ref);
          }}
          rate={1}
          onProgress={(e) => {
            const throttled = _.throttle(() => setProgr(progr + 0.25), 250);
            throttled();
            if (progr > totalDuration) {
              setPaused(true);
              setPlayerState('FINISHED');
            }
          }}
          onLoad={(e) => {
            setSoundLoader(false);
          }}
          progressUpdateInterval={250}
          repeat
          playInBackground={true} // Store reference              // Callback when remote video is buffering
          ignoreSilentSwitch="ignore"
          style={{zIndex: 0}}
        />
        <PlayerContext.Provider value={initialPlayerContextState}>
          <StatusBar barStyle="light-content" backgroundColor="#000" translucent={true} />
          {initialPlayerContextState.playerState === 'PLAYING' && (
            <PlayingView track={track} isfavorite={isfavorite} setisfavorite={setisfavorite} />
          )}
          {initialPlayerContextState.playerState !== 'PLAYING' && <OverlayView track={track} navigation={navigation} />}
        </PlayerContext.Provider>
      </>
    </ImageBackground>
  );
}
// https://restoic-app-19339.s3.amazonaws.com/media/tracks/bensound-ukulele_2.mp3
const PlayingView = ({track, isfavorite, setisfavorite}) => {
  const {totalDuration, getSecondsRemaining, getTimeRemaining, togglePlay, setPlayerState, getProgress} = useContext(
    PlayerContext,
  );

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
      <View style={{flex: 1}} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AppText
          style={{
            fontSize: 96,
            fontWeight: 'bold',
            fontStyle: 'italic',
            lineHeight: 117,
            letterSpacing: -0.17,
            textAlign: 'center',
            color: 'white',
          }}>
          {getTimeRemaining()}
        </AppText>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: 74,
            height: 74,
            borderRadius: 74 / 2,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            togglePlay();
            setPlayerState('PAUSED');
          }}>
          <Icon type="restoic" name={'rs-pause'} color="black" />

          {/* rotating ProgressCircle */}
          <ProgressCircle
            totalDuration={totalDuration}
            getSecondsRemaining={getSecondsRemaining}
            getProgress={getProgress}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AppText
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            fontStyle: 'italic',
            lineHeight: 33,
            letterSpacing: -0.17,
            textAlign: 'center',
            color: 'white',
          }}>
          {`${track.title}`}
        </AppText>
      </View>
    </View>
  );
};

const OverlayView = ({navigation, track}) => {
  const playerContext = useContext(PlayerContext);
  const isPaused = playerContext.playerState === 'PAUSED';
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
      <BlurView style={styles.absolute} blurType="dark" blurAmount={1} reducedTransparencyFallbackColor="white" />
      <View
        style={{
          flex: 1.4,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        {/* paused || finished */}
        <AppText
          style={{
            fontSize: 48,
            fontWeight: 'bold',
            fontStyle: 'italic',
            lineHeight: 72,
            letterSpacing: -0.17,
            textAlign: 'center',
            color: 'white',
            marginTop: 14,
          }}>
          {isPaused ? 'PAUSED' : 'FINISHED'}
        </AppText>
        {/* progress bar */}
        <View
          style={{
            width: '69%',
            backgroundColor: 'rgba(255, 255, 255, 0.29)',
            height: 3,
            marginTop: 34,
          }}>
          <View
            style={{
              width: `${playerContext.getProgress() * 100}%`,
              backgroundColor: 'white',
              height: 3,
            }}
          />
        </View>

        {/* Time remaining */}
        <AppText
          style={{
            fontSize: 14,
            fontWeight: '500',
            fontStyle: 'italic',
            lineHeight: 21,
            letterSpacing: -0.17,
            textAlign: 'center',
            color: 'white',
            marginTop: 14,
            marginBottom: 45,
          }}>
          {isPaused ? `${playerContext.getTimeRemaining()} remaining` : `${track.title}`}
        </AppText>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
        }}>
        <View
          style={{
            justifyContent: 'center',
            paddingRight: 24,
            paddingLeft: 24,
            paddingBottom: 50,
          }}>
          {isPaused && (
            <>
              <AppButton
                container={{marginVertical: 10}}
                type="disabled-look"
                label="HOME"
                onPress={() => navigation.navigate('Dashboard')}
              />
              <AppButton
                container={{marginVertical: 10}}
                type="disabled-look"
                label="PLAY FROM BEGINNING"
                onPress={() => {
                  playerContext.setPlayerState('PLAYING');
                  playerContext.resetTrack();
                }}
              />
              <AppButton
                container={{marginVertical: 10}}
                label="RESUME"
                onPress={() => {
                  playerContext.setPlayerState('PLAYING');
                  playerContext.togglePlay();
                }}
              />
            </>
          )}
          {!isPaused && (
            <>
              <AppButton
                container={{marginVertical: 10}}
                type="disabled-look"
                label="HOME"
                onPress={() => navigation.navigate('SoundScapePlayer')}
              />
              <AppButton
                container={{marginVertical: 10}}
                label="PLAY FROM BEGINNING"
                onPress={() => {
                  playerContext.setPlayerState('PLAYING');
                  playerContext.resetTrack();
                }}
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
};

class ProgressCircle extends Component {
  constructor(props) {
    super();
    this.animated = new Animated.Value(0);
    var inputRange = [0, 1];
    const startAngle = Math.round(360 - (props.getSecondsRemaining() / props.totalDuration) * 360);
    var outputRange = [`${startAngle + 39}deg`, '398deg'];
    var outputRange = [`${startAngle + 39}deg`, '398deg'];
    this.rotate = this.animated.interpolate({inputRange, outputRange});
    outputRange = [`${startAngle + 39}deg`, '-398deg'];
    this.rotateOpposit = this.animated.interpolate({inputRange, outputRange});
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    Animated.timing(this.animated, {
      toValue: 1,
      duration: this.props.getSecondsRemaining() * 1000 * 1.1,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }
  render() {
    const transform = [{rotate: this.rotate}];
    const transform1 = [{rotate: this.rotateOpposit}];
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.item, {transform}]}>
          <Animated.View style={[styles.dot, {transform: transform1}]}></Animated.View>
        </Animated.View>
      </View>
    );
  }
}

export default SoundScapeModal;
