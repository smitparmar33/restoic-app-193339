import {play, pause, seekTo, trackProgress, getState, skipToPrevious, skipToNext} from './playerFunctions';
/**
 * This is the code that will run tied to the player.
 *
 * The code here might keep running in the background.
 *
 * You should put everything here that should be tied to the playback but not the UI
 * such as processing media buttons or analytics
 */

import TrackPlayer from 'react-native-track-player';

module.exports = async function() {

  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play()
  })

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause()
  });

  TrackPlayer.addEventListener('remote-next', () => {
    TrackPlayer.skipToNext()
  });

  TrackPlayer.addEventListener('remote-previous', () => {
    TrackPlayer.skipToPrevious()
  });

  // TrackPlayer.addEventListener('remote-jump-forward', () => {
  //   const progress = trackProgress();
  //   seekTo(progress.position + 30);
  // });

  // TrackPlayer.addEventListener('remote-jump-backward', () => {
  //   const progress = trackProgress();
  //   seekTo(progress.position - 30);
  // });

  // TrackPlayer.addEventListener('remote-stop', () => {
  //   TrackPlayer.destroy()
  // });

};
