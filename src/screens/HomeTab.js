import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView, TouchableOpacity, View, FlatList, StyleSheet, Image, ScrollView, StatusBar} from 'react-native';
import SmallCategoryItem from '../components/SmallCategoryItem';
import FeaturedPlaceholder from '../components/FeaturedPlaceholder';

import TabsTopBar from './TabsTopBar';
import TopBar from '../components/TopBar';
import {addTrack, play, skip} from './player/playerFunctions';
import {useDispatch} from 'react-redux';
import {addPlaylist, addCurrentTrack} from '../redux/playlist';
import {categoriesSelector} from '../redux/tracks';
import {cutLongText} from '../utils/textUtil';
import {AppImage, AppText} from '../components';

const Item = ({item, onPress}) => {
  const {title, subtitle, thumbnail} = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.3,
          shadowRadius: 5,
        }}>
        <Image
          style={{
            height: 108,
            width: 150,
            borderRadius: 8,
          }}
          resizeMode={'cover'}
          source={{
            uri: thumbnail,
          }}
        />
      </View>
      <AppText style={styles.caption}>{cutLongText(title, 20)}</AppText>
      <AppText style={styles.subcaption}>{subtitle}</AppText>
    </TouchableOpacity>
  );
};

const HomeTab = ({navigation}) => {
  const data = useSelector(categoriesSelector);
  const [historyTracks, setHistoryTracks] = useState([]);

  const renderHistoryItem = ({item}) => {
    return (
      <Item
        onPress={async () => {
          const category = data?.filter((e) => e.title === item.subtitle);
          const categoryTracks = category[0].tracks || [];
          const tracksList = categoryTracks.map((item) => ({
            ...item,
            artist: 'Restoic',
            id: item.id.toString(),
            artwork: item.thumbnail,
          }));
          const trackId = item.id.toString();
          addTrack(tracksList);
          skip(trackId);
          await play();
          dispatch(addPlaylist(tracksList));
          dispatch(addCurrentTrack(trackId));
          navigation.navigate('Player', {item, trackIndex: trackId});
        }}
        item={item}
      />
    );
  };

  const navigateToPlayer = (item) => {
    if (item.title === 'Soundscapes') {
      navigation.navigate('SoundScapes', {item});
    } else if (item.title === 'Breathwork') {
      navigation.navigate('ComingSoonScreen');
    } else {
      navigation.navigate('TrackListScreen', {item: item.title});
    }
  };
  const renderCategoryItem = ({item}) => <SmallCategoryItem item={item} onPress={() => navigateToPlayer(item)} />;

  const onFeaturedPress = async () => {
    const category = data?.filter((e) => e.id == 3);
    const categoryTracks = category[0].tracks || [];
    const tracksList = categoryTracks.map((item) => ({
      ...item,
      artist: 'Restoic',
      id: item.id.toString(),
      artwork: item.thumbnail,
    }));
    const trackId = tracksList[0].id.toString();
    addTrack(tracksList);
    skip(trackId);
    await play();
    dispatch(addPlaylist(tracksList));
    dispatch(addCurrentTrack(trackId));
    navigation.navigate('Player');
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const history_categories = data?.filter((item) => item.id === 3 || item.id === 5 || item.id === 7);
    if (history_categories && history_categories.length) {
      const all_tracks = [
        ...history_categories[0].tracks,
        ...history_categories[1].tracks,
        ...history_categories[2].tracks,
      ];
      const history_filtered = all_tracks.filter((item) => item?.history?.status === true);
      if (history_filtered && history_filtered.length) setHistoryTracks(history_filtered);
    }
  }, [data]);
  useEffect(() => {}, [historyTracks]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <TabsTopBar />
      <ScrollView>
        <View style={[styles.pageSection]}>
          {historyTracks.length ? (
            <View style={styles.pageSection}>
              <AppText style={styles.sectionTitle}>Listening history</AppText>
              <FlatList
                ListHeaderComponent={<View style={{width: 16}} />}
                data={historyTracks}
                horizontal
                renderItem={renderHistoryItem}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          ) : (
            <FeaturedPlaceholder onPress={onFeaturedPress} />
          )}
        </View>
        <View style={styles.pageSection}>
          <AppText style={styles.sectionTitle}>Categories</AppText>
          <FlatList
            ListHeaderComponent={<View style={{width: 16}} />}
            data={data}
            horizontal
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <View style={[styles.pageSection]}>
          <AppText style={styles.sectionTitle}>Playlists</AppText>
          <View
            style={{flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 20, justifyContent: 'space-between'}}>
            <TouchableOpacity style={styles.shadow} onPress={() => navigation.navigate('FavoritesScreen')}>
              <AppImage style={styles.thumbnail} type="image" source="favoritePlaceholder" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shadow} onPress={() => navigation.navigate('DownloadsScreen')}>
              <AppImage style={styles.thumbnail} type="image" source="downloadPlaceholder" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TopBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginVertical: 10,
    marginRight: 15,
    width: 150,
  },
  title: {
    fontSize: 32,
  },

  pageSection: {
    marginTop: 20,
    justifyContent: 'center',
  },
  squareCardContainer: {},
  imageContainer: {},
  caption: {
    marginTop: 12,
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 18,
    color: '#0C0C0A',
  },
  subcaption: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 10,
    lineHeight: 15,
    textTransform: 'uppercase',
    color: '#90A0AF',
  },
  sectionTitle: {
    paddingLeft: 16,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 27,
    textTransform: 'uppercase',
    color: '#000000',

    marginBottom: 14,
  },
  flatListContainer: {
    height: 190,
  },
  favouritesPlaceHolderContainer: {
    height: 108,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.19,
    shadowRadius: 8.3,

    elevation: 13,

    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 27,
    paddingVertical: 18,
  },
  starContainer: {
    flex: 1,
    marginTop: 10,
  },
  favouritesPlaceHolderTextContainer: {
    flex: 4,
    marginLeft: 19,
  },

  favouritesPlaceHolderTitle: {
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: 14,
    textTransform: 'uppercase',
    color: '#0C0C0A',
    paddingRight: 20,
    marginBottom: 5,
  },
  favouritesPlaceHolderSubtitle: {
    fontStyle: 'italic',
    fontWeight: '500',
    fontSize: 10,
    color: '#474747',
    paddingRight: 30,
    lineHeight: 13.15,
  },
  thumbnail: {
    flex: 1,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default HomeTab;
