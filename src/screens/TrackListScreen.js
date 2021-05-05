import React, {useEffect, useState, createRef, useRef} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {addTrack, play, skip} from './player/playerFunctions';
import {useDispatch, useSelector} from 'react-redux';
import {addPlaylist, addCurrentTrack} from '../redux/playlist';
import {binauralSeenSelector, setDownloadTrigger, setAlertBar} from '../redux/globalSetting';
import MeetArtistScreen from './MeetArtistScreen';
import BottomMenu from './player/BottomMenu';
import {downloadList, getList} from '../services/download';
import {readDir} from '../services/rnfs';
import {userSelector} from '../redux/user';
import {categoriesSelector} from '../redux/tracks';
import _Icon from '../assets/icons';
import {AppText} from '../components';

const TrackListScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {item} = route.params;
  const bottomMenuRef = createRef();
  const userInfo = useSelector(userSelector);
  const isUserPremium = userInfo?.premium_to || false;
  const [pressedTrack, setPressedTrack] = useState({});

  const categories = useSelector(categoriesSelector);
  const category = categories.find((a) => a.title === item);

  const toggleBottomMenu = (track) => {
    setPressedTrack(track);
    bottomMenuRef.current.snapTo(0);
  };

  const checkIsBinauralSeen = useSelector(binauralSeenSelector);

  //   useEffect(() => {
  //     readDir();
  //     getList((e) => console.log(JSON.parse(e)));
  //   }, []);

  if (category.title === 'BINAURAL BEATS' && !checkIsBinauralSeen) return <MeetArtistScreen />;
  return (
    <>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <BottomMenu refTest={bottomMenuRef} fromTrackList track={pressedTrack} />
      <ScrollView>
        <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
          <View style={{overflow: 'hidden', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
            <ImageBackground
              resizeMode={'cover'}
              source={{uri: category.thumbnail}}
              style={{width: '100%', height: 243}}>
              <View style={styles.imgBackground}>
                <Icon
                  reverseColor="#fff"
                  reverse
                  size={24}
                  name="chevron-down"
                  type="font-awesome"
                  color="transparent"
                  containerStyle={styles.collapseIcon}
                  onPress={() => navigation.navigate('Dashboard')}
                />
                <Icon
                  reverseColor="#fff"
                  reverse
                  size={24}
                  name="rs-download"
                  type="restoic"
                  color="transparent"
                  containerStyle={styles.downloadIcon}
                  onPress={() => {
                    downloadList(category.tracks || [], (e) => {
                      dispatch(setDownloadTrigger());
                      dispatch(
                        setAlertBar({visible: true, text: `Track ${e}/${category.tracks.length} has been downloaded`}),
                      );
                    });
                    dispatch(setAlertBar({visible: true, text: 'Downloading category'}));
                  }}
                />
                <View>
                  <AppText style={styles.title}>{category.title}</AppText>
                  <AppText
                    style={
                      styles.subTitle
                    }>{`${category.numberOfSections} tracks \u2022 ${category.durationInMinutes} min`}</AppText>
                </View>
              </View>
            </ImageBackground>
          </View>
        </SafeAreaView>
        <AppText style={styles.pageCopy}>{category.description}</AppText>

        <View style={styles.orangeButtonContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={async () => {
              const newArray = [...category.tracks];
              const tracksList = newArray.map((category) => ({
                ...category,
                artist: 'Restoic',
                id: category.id.toString(),
                artwork: category.thumbnail,
              }));
              addTrack(tracksList);
              skip(tracksList[0].id);
              await play();
              dispatch(addPlaylist(tracksList));
              dispatch(addCurrentTrack(tracksList[0].id));
              navigation.navigate('Player', {category, trackIndex: tracksList[0].id});
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Icon name="play" type="ionicon" color="white" style={{marginRight: 10}} />
              <AppText style={styles.nextButtonText}>PLAY</AppText>
            </View>
          </TouchableOpacity>
        </View>

        {category.tracks.map((track, index) => {
          return (
            <TrackListItem
              navigation={navigation}
              isUserPremium={isUserPremium}
              key={track.id}
              track={track}
              index={index}
              category={category}
              onPress={async () => {
                const newArray = [...category.tracks];
                const tracksList = newArray.map((category) => ({
                  ...category,
                  artist: 'Restoic',
                  id: category.id.toString(),
                  artwork: category.thumbnail,
                }));
                addTrack(tracksList);
                skip(track.id.toString());
                await play();
                dispatch(addPlaylist(tracksList));
                dispatch(addCurrentTrack(track.id.toString()));
                navigation.navigate('Player', {category, trackIndex: track.id.toString()});
              }}
              onAction={toggleBottomMenu}
            />
          );
        })}
      </ScrollView>
    </>
  );
};

const TrackListItem = ({track, index, category, onPress, onAction, isUserPremium, navigation}) => {
  const [isExpanded, setisExpanded] = useState(false);

  const isPremium = track.is_premium;
  const shouldLockTrack = isPremium && !isUserPremium;

  return (
    <TouchableOpacity
      onPress={() => {
        shouldLockTrack ? navigation.navigate('UpgradePlanScreen') : onPress();
      }}>
      <View style={itemStyles.itemContainer}>
        {shouldLockTrack ? (
          <Image source={_Icon.lockIcon} />
        ) : (
          <AppText style={itemStyles.indexPart}>{index + 1}</AppText>
        )}
        <View style={itemStyles.middlePart}>
          <AppText numberOfLines={2} style={itemStyles.caption}>
            {track.title}
          </AppText>
          <AppText numberOfLines={1} style={itemStyles.subCaption}>{`${category.title} \u2022 ${formatTrackDuration(
            track.duration,
          )}`}</AppText>
        </View>
        <TouchableOpacity
          style={{position: 'absolute', right: 50, zIndex: 10}}
          onPress={() => setisExpanded(!isExpanded)}>
          <Image source={_Icon.info} />
        </TouchableOpacity>
        <View style={itemStyles.threeDotsPart}>
          {!shouldLockTrack && (
            <Icon
              containerStyle={{right: -20}}
              reverse
              reverseColor="black"
              name="ellipsis-v"
              type="font-awesome"
              color={'#fff'}
              onPress={() => onAction(track)}
              size={20}
            />
          )}
        </View>
      </View>
      {isExpanded && (
        <AppText style={{paddingLeft: 40, paddingRight: 30, paddingTop: 20, paddingBottom: 40}}>
          {track.description}
        </AppText>
      )}
      <Line />
    </TouchableOpacity>
  );
};

const Line = () => (
  <View
    style={{
      width: '100%',
      justifyContent: 'center',
    }}>
    <View
      style={{
        height: 1,
        left: 4,
        right: 4,
        backgroundColor: 'rgba(144, 160, 175, 0.25)',
      }}
    />
  </View>
);

const formatTrackDuration = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s].filter(Boolean).join(':');
};

const itemStyles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
  },
  indexPart: {
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: 24,
    color: '#0C0C0A',
  },

  middlePart: {
    alignItems: 'flex-start',
    width: 196,
    left: -20,
  },
  threeDotsPart: {
    width: 30,
    alignItems: 'flex-end',
  },
  caption: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0C0C0A',
    marginBottom: 5,
  },
  subCaption: {
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#90A0AF',
  },
});
const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  imgBackground: {
    width: '100%',
    height: 243,
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,.24)',
  },

  title: {
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 36,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  subTitle: {
    fontStyle: 'italic',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  collapseIcon: {
    position: 'absolute',
    top: 6,
    left: 11,
  },
  downloadIcon: {
    position: 'absolute',
    top: 6,
    right: 11,
  },
  pageCopy: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 21,
    color: '#000000',
    padding: 24,
  },

  orangeButtonContainer: {
    height: 56,
    marginBottom: 26,
    marginHorizontal: 24,
  },
  nextButton: {
    backgroundColor: '#E83A1F',
    flex: 1,
    borderRadius: 4,
    height: 56,
    position: 'relative',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    letterSpacing: -0.17,
    textAlign: 'center',
    color: 'white',
    marginRight: 20,
  },
});

export default TrackListScreen;
