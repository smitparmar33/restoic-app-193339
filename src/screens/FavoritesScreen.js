import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-navigation';
import {View} from 'react-native';

import {AppHeader, AppInfoBox, AppFlatList, CategoryBanner, TrackListItem, AppLoader} from '../components';
import {getFavorites, favoritesSelector, favoritesLoadingSelector} from '../redux/favorites';
import {navigateToPlayer} from '../services/NavigationService';
import {addPlaylist, addCurrentTrack} from '../redux/playlist';
import {addTrack, play, skip} from './player/playerFunctions';
import {categoriesSelector} from '../redux/tracks';
import BottomMenu from './player/BottomMenu';
import {tokenSelector} from '../redux/user';

const FavoritesScreen = ({navigation}) => {
  const bottomMenuRef = useRef();
  const dispatch = useDispatch();

  const token = useSelector(tokenSelector);

  useEffect(() => {
    dispatch(getFavorites(token));
  }, []);

  const [pressedTrack, setPressedTrack] = useState({});
  const favorites = useSelector(favoritesSelector);
  const categories = useSelector(categoriesSelector);

  const menuPress = (track) => {
    setPressedTrack(track);
    bottomMenuRef.current.snapTo(0);
  };
  const test = (track) => {
    const currentId = track?.id;
    const trackId = currentId.toString();
    const tracksList = favorites.map((item) => ({
      ...item,
      artist: 'Restoic',
      id: item.id.toString(),
      artwork: item.thumbnail,
    }));
    addTrack(tracksList);
    skip(trackId);
    play();
    dispatch(addPlaylist(tracksList));
    dispatch(addCurrentTrack(trackId));
    navigation.navigate('Player');
  };
  const isLoading = useSelector(favoritesLoadingSelector);

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
        <AppHeader title="Favorites" navigation={navigation} />
        {!!favorites?.length && (
          <AppFlatList
            style={{height: '90%'}}
            onPress={test}
            vertical
            data={favorites}
            renderItem={(props) => TrackListItem({...props, menuPress})}
          />
        )}
        {!!!favorites?.length && (
          <>
            <View style={{padding: 24}}>
              <AppInfoBox
                icon="redStar"
                title="no favorites yet"
                subtitle={`Tap the star icon on any track to save it${'\n'}to this area.`}
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

export default FavoritesScreen;
