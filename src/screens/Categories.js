import React, {useState} from 'react';
import {ImageBackground, FlatList, SafeAreaView, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {categoriesSelector} from '../redux/tracks';
import TabsTopBar from './TabsTopBar';
import TopBar from '../components/TopBar';
import {AppText} from '../components';

const Item = ({item, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <ImageBackground
        resizeMode={'cover'}
        imageStyle={{borderRadius: 8}}
        source={item.thumbnail ? {uri: item.thumbnail} : require('../assets/images/digital_coaching.png')}
        style={styles.imgBackground}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.24)',
            flex: 1,
            borderRadius: 8,
            justifyContent: 'flex-end',
            paddingHorizontal: 24,
            paddingBottom: 14,
          }}>
          <AppText style={styles.title}>{item.title}</AppText>
          <AppText style={styles.subTitle} numberOfLines={1}>
            {item.title !== 'Soundscapes' &&
              item.title !== 'Digital Coaching' &&
              `${item.numberOfSections} sections • ${item.durationInMinutes} min`}
            {item.title === 'Soundscapes' && `5 Types • Customizable length`}
            {item.title === 'Digital Coaching' && '1-to-1 mental performance training'}
          </AppText>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const CategoriesTab = ({navigation}) => {
  const categories = useSelector(categoriesSelector);
  const [selectedId, setSelectedId] = useState(null);

  const navigateToPlayer = (item) => {
    if (item.title === 'Soundscapes') {
      navigation.navigate('SoundScapes', {item});
    } else if (item.title === 'Breathwork') {
      navigation.navigate('ComingSoonScreen');
    } else if (item.title === 'Digital Coaching') {
      navigation.navigate('Dashboard', {tabIndex: 2});
    } else {
      navigation.navigate('TrackListScreen', {item: item.title});
    }
  };

  const renderItem = ({item}) => {
    return <Item item={item} onPress={() => navigateToPlayer(item)} />;
  };
  return (
    <SafeAreaView style={styles.container}>
      <TabsTopBar title={'Categories'} />
      <FlatList
        style={{paddingHorizontal: 24}}
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedId}
      />
      <TopBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 154,
    marginVertical: 8,
    borderRadius: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 36,
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  subTitle: {
    fontStyle: 'italic',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  imgBackground: {
    height: 154,
    borderRadius: 8,
  },
});

export default CategoriesTab;
