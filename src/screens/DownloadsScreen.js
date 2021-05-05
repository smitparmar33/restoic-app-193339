import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-navigation';
import {View} from 'react-native';

import {AppHeader, AppInfoBox, AppFlatList, CategoryBanner, TrackListItem, AppLoader} from '../components';
import {getDownloads, downloadedListSelector, downloadLoadingSelector} from '../redux/downloadedList';
import {navigateToPlayer} from '../services/NavigationService';
import {addPlaylist, addCurrentTrack} from '../redux/playlist';
import {addTrack, play, skip} from './player/playerFunctions';
import {categoriesSelector} from '../redux/tracks';
import BottomMenu from './player/BottomMenu';

const DownloadsScreen = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDownloads());
  }, []);
  const [pressedTrack, setPressedTrack] = useState({});
  const bottomMenuRef = useRef();

  const categories = useSelector(categoriesSelector);
  const dow = useSelector(downloadedListSelector);

  const menuPress = (track) => {
    setPressedTrack(track);
    bottomMenuRef.current.snapTo(0);
  };
  const test = async (track) => {
    const currentId = track?.id;
    const trackId = currentId.toString();
    const tracksList = dow.map((item) => ({
      ...item,
      artist: 'Restoic',
      id: item.id.toString(),
      artwork: item.thumbnail,
    }));
    addTrack(tracksList);
    skip(trackId);
    await play();
    dispatch(addPlaylist(tracksList));
    dispatch(addCurrentTrack(trackId));
    navigation.navigate('Player');
  };

  const isLoading = useSelector(downloadLoadingSelector);

  return (
    <>
      {isLoading && <AppLoader />}
      <BottomMenu
        refTest={bottomMenuRef}
        fromTrackList
        track={{
          ...pressedTrack,
          artist: 'Restoic',
          url: pressedTrack?.track,
          id: pressedTrack?.id?.toString(),
          duration: pressedTrack?.track_duration,
          favorite: {
            status: true,
          },
        }}
      />
      <SafeAreaView>
        <AppHeader title="Downloads" navigation={navigation} />
        {!!dow?.length && (
          <AppFlatList
            style={{height: '90%'}}
            onPress={test}
            vertical
            data={dow}
            renderItem={(props) => TrackListItem({...props, menuPress})}
          />
        )}
        {!!!dow?.length && (
          <>
            <View style={{padding: 24}}>
              <AppInfoBox
                icon="redDownload"
                title="no downloads yet"
                subtitle={`Download any track to save it for offline${'\n'}listening in this area`}
              />
            </View>
            <AppFlatList
              onPress={navigateToPlayer}
              title="Categories"
              horizontal
              data={categories}
              renderItem={CategoryBanner}
            />
          </>
        )}
      </SafeAreaView>
    </>
  );
};

export default DownloadsScreen;
