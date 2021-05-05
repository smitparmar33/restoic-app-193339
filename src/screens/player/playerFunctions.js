import TrackPlayer from 'react-native-track-player';

// START PLAYER called in app.js
const startPlayer = async () => {
  await TrackPlayer.setupPlayer({});
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    // jumpInterval: 30,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      // TrackPlayer.CAPABILITY_JUMP_FORWARD,
      // TrackPlayer.CAPABILITY_JUMP_BACKWARD,
      // TrackPlayer.CAPABILITY_STOP,
    ],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE,
    ],
  });
};

const addTrack = async (list, id) => {
  reset();
  try {
    await TrackPlayer.add(list, id);
  } catch (error) {
    console.error('error :>> ', error);
  }
};

const play = async () => {
  try {
    return await TrackPlayer.play();
  } catch (error) {
    console.error('TrackPlayer.play();.play();or :>> ', error);
  }
};
const pause = () => TrackPlayer.pause();
const stop = () => TrackPlayer.stop();
const skip = (id) => TrackPlayer.skip(id);
const seekTo = (value) => value && TrackPlayer.seekTo(value);
const reset = () => TrackPlayer.reset();
const skipToPrevious = () => TrackPlayer.skipToPrevious();
const skipToNext = () => TrackPlayer.skipToNext();

const getPosition = () => TrackPlayer.getPosition();
const trackProgress = () => TrackPlayer.useTrackPlayerProgress();
const getState = () => TrackPlayer.usePlaybackState();
const getRate = () => TrackPlayer.getRate();
const setRate = (speed) => TrackPlayer.setRate(speed);
const getTrack = (id) => TrackPlayer.getTrack(id);
const findAndPlay = (id) => {
  skip(id);
  play();
};

const getQueue = (callback) => {
  callbackHelper(TrackPlayer.getQueue(), (response) => {
    return callback(response);
  });
};

const getCurrentTrack = (callback) => {
  callbackHelper(TrackPlayer.getCurrentTrack(), (response) => {
    return callback(response);
  });
};

// CALLBACK HELPER //
const callbackHelper = async (action, callback) => {
  try {
    callback(await action);
  } catch (error) {
    callback(error);
  }
};
// CALLBACK HELPER //

export {
  setRate,
  findAndPlay,
  startPlayer,
  addTrack,
  play,
  pause,
  stop,
  getPosition,
  seekTo,
  trackProgress,
  getState,
  getRate,
  reset,
  getCurrentTrack,
  getTrack,
  skip,
  getQueue,
  skipToPrevious,
  skipToNext,
};
