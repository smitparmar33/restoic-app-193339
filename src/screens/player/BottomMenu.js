import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Button} from 'react-native-elements';

import {AppSheet, AppText, AppButton} from '../../components';
import {setRate} from './playerFunctions';
import {currentTrackSelector} from '../../redux/playlist';
import {downloadTrack, removeTract} from '../../services/download';
import {setAlertBar} from '../../redux/globalSetting';
import {tokenSelector} from '../../redux/user';
import {setFavorite} from '../../redux/favorites';
import {checkIsTrackDownloaded, getDownloads} from '../../redux/downloadedList';

const GetSleepTimerMenuPanel = () => {
  return (
    <>
      <View style={styles.panelButton}>
        <Icon
          containerStyle={[{left: -8}]}
          name="rs-sleep-timer"
          size={24}
          type="restoic"
          color={'#000'}
          onPress={() => console.log('hello')}
        />
        <AppText style={styles.panelButtonTitle}>Sleep Timer</AppText>
      </View>
      <View style={styles.divider}></View>
      <TouchableOpacity onPress={() => {}} style={styles.panelButton}>
        <AppText style={[styles.panelButtonTitle, {marginLeft: 0}]}>5 min</AppText>
      </TouchableOpacity>
      <View style={styles.divider}></View>
      <TouchableOpacity style={styles.panelButton}>
        <AppText style={[styles.panelButtonTitle, {marginLeft: 0}]}>15 min</AppText>
      </TouchableOpacity>
      <View style={styles.divider}></View>
      <TouchableOpacity style={styles.panelButton}>
        <AppText style={[styles.panelButtonTitle, {marginLeft: 0}]}>30 min</AppText>
      </TouchableOpacity>
      <View style={styles.divider}></View>
      <TouchableOpacity style={styles.panelButton}>
        <AppText style={[styles.panelButtonTitle, {marginLeft: 0}]}>60 min</AppText>
      </TouchableOpacity>
      <View style={styles.divider}></View>
    </>
  );
};

const GetPlaybackSpeedMenuPanel = () => {
  const Item = ({text, onAction}) => (
    <TouchableOpacity onPress={onAction} style={styles.panelButton}>
      <AppText style={[styles.panelButtonTitle, {marginLeft: 0}]}>{text}</AppText>
    </TouchableOpacity>
  );

  const setRateSpeed = (speed) => {
    setRate(speed);
  };
  return (
    <>
      <View style={styles.panelButton}>
        <Icon
          containerStyle={[{left: -8}]}
          name="rs-play-speed"
          size={24}
          type="restoic"
          color={'#000'}
          onPress={() => console.log('hello')}
        />
        <AppText style={styles.panelButtonTitle}>Playback speed</AppText>
      </View>
      <View style={styles.divider}></View>
      <Item text="0.50x" onAction={() => setRateSpeed(0.5)} />
      <View style={styles.divider}></View>
      <Item text="1.00x" onAction={() => setRateSpeed(1)} />
      <View style={styles.divider}></View>
      <Item text="1.50x" onAction={() => setRateSpeed(1.5)} />
      <View style={styles.divider}></View>
      <Item text="2.00x" onAction={() => setRateSpeed(2)} />
      <View style={styles.divider}></View>
    </>
  );
};

const GetMainMenuPanel = ({setView, fromTrackList, onClose, track}) => {
  const token = useSelector(tokenSelector);
  const isFavorite = track?.favorite?.status;
  const dispatch = useDispatch();
  const isDownloaded = useSelector(checkIsTrackDownloaded(track?.id));

  const Item = ({icon, text, rightArrow, type, onAction}) => (
    <TouchableOpacity onPress={onAction} style={styles.panelButton}>
      <Icon containerStyle={[{left: -8}]} name={icon} size={24} type={type} color="#000" />
      <AppText style={styles.panelButtonTitle}>{text}</AppText>
      {rightArrow && (
        <Icon containerStyle={[{left: 5}]} name="angle-right" size={24} type="font-awesome" color="#000" />
      )}
    </TouchableOpacity>
  );

  const handleDownloadPress = () => {
    if (!isDownloaded) {
      downloadTrack(
        track,
        () => {},
        () => {},
        () => {
          dispatch(setAlertBar({visible: true, text: 'Track has been downloaded'}));
          dispatch(getDownloads());
        },
      );
      dispatch(setAlertBar({visible: true, text: 'Downloading track'}));
    } else {
      removeTract(track.id, () => dispatch(getDownloads()));
    }
    onClose();
  };

  const handleFavoritePress = () => {
    dispatch(setFavorite({token, track: parseInt(track.id)}));
    onClose();
  };

  return (
    <>
      <Item
        onAction={handleFavoritePress}
        type="font-awesome"
        icon={isFavorite ? 'star' : 'star-o'}
        text={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
      />

      <View style={styles.divider}></View>
      <Item
        onAction={handleDownloadPress}
        type="restoic"
        icon="rs-download"
        text={isDownloaded ? 'Remove from download' : 'Download track'}
      />

      {!fromTrackList && <View style={styles.divider}></View>}
      {!fromTrackList && (
        <Item onAction={() => setView(1)} rightArrow type="restoic" icon="rs-play-speed" text="Playback speed" />
      )}

      {!fromTrackList && <View style={styles.divider}></View>}
      {!fromTrackList && (
        <Item onAction={() => setView(2)} rightArrow type="restoic" icon="rs-sleep-timer" text="Sleep timer" />
      )}
    </>
  );
};

const RenderContent = ({onClose, setView, view, fromTrackList, track}) => {
  return (
    <View style={styles.panel}>
      <View>
        {view === 0 && (
          <GetMainMenuPanel setView={setView} fromTrackList={fromTrackList} onClose={onClose} track={track} />
        )}
        {view === 1 && <GetPlaybackSpeedMenuPanel />}
        {view === 2 && <GetSleepTimerMenuPanel />}
      </View>
      <AppButton label="CLOSE" onPress={onClose} />
    </View>
  );
};

const BottomMenu = ({refTest, fromTrackList, track}) => {
  const [view, setView] = useState(0);
  const onClose = () => {
    setView(0);
    refTest.current.snapTo(1);
  };
  const snapPoints = fromTrackList ? SNAP_ENUM[3] : SNAP_ENUM[view];
  return (
    <AppSheet
      onClose={() => setView(0)}
      children={
        <RenderContent fromTrackList={fromTrackList} view={view} setView={setView} onClose={onClose} track={track} />
      }
      refTest={refTest}
      snapPoints={snapPoints}
    />
  );
};

export default BottomMenu;

const SNAP_ENUM = {
  0: 370,
  1: 420,
  2: 420,
  3: 260,
};

const styles = StyleSheet.create({
  panelButton: {
    padding: 16,
    paddingBottom: 18,
    paddingTop: 18,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  closePanelButton: {
    height: 64,
    borderRadius: 4,
    backgroundColor: '#e3e7eb',
    marginTop: 16,
  },
  closePanelButtonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    lineHeight: 18,
    letterSpacing: -0.17,
    textAlign: 'center',
    color: '#000000',
  },
  panelButtonTitle: {
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: -0.17,
    textAlign: 'left',
    backgroundColor: '#fff',
    flex: 1,
    color: '#000',
    marginLeft: 16,
  },
  panel: {
    height: '100%',
    padding: 16,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    borderColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 3, height: 3},
    shadowRadius: 5,
    shadowOpacity: 0.5,
    justifyContent: 'space-between',
  },
  divider: {
    width: '100%',
    height: 1.5,
    backgroundColor: 'rgba(144, 160, 175, 0.15)',
  },
});
