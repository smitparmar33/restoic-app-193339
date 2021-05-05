import React from 'react';
import {SafeAreaView, View, ImageBackground, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {AppText, AppHeader} from '../components';

const SORTED_SOUNDSCAPES = [8, 4, 7, 5, 6];

const TrackListScreen = ({navigation, route}) => {
  const {item} = route.params;

  const sortArray = SORTED_SOUNDSCAPES.map((id) => item.tracks.find((e) => e.id === id)) || [];

  return (
    <SafeAreaView>
      <AppHeader title="soundscapes" navigation={navigation} />
      <ScrollView>
        {!!item.description && <AppText style={styles.pageCopy}>{item.description}</AppText>}
        <View style={{marginTop: 40, marginBottom: 40}}>
          {sortArray.map((track, index) => (
            <Item
              key={index}
              index={index}
              item={track}
              onPress={() => navigation.navigate('SoundScapePlayer', {track: track})}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const Item = ({item, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <ImageBackground
        resizeMode={'cover'}
        imageStyle={{borderRadius: 8, opacity: 0.96}}
        source={{uri: item.small_thumbnail}}
        style={styles.itemImgBackground}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.24)',
            flex: 1,
            borderRadius: 8,
            justifyContent: 'flex-end',
            paddingHorizontal: 24,
            paddingBottom: 14,
          }}>
          <AppText style={styles.itemTitle}>{item.title}</AppText>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
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
    fontWeight: 'bold',
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
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  collapseIcon: {
    position: 'absolute',
    top: 6,
    left: 11,
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

  item: {
    height: 154,
    marginVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 24,
  },
  itemTitle: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 36,
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  itemSubTitle: {
    fontStyle: 'italic',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  itemImgBackground: {
    height: 154,
    borderRadius: 8,
  },
});

export default TrackListScreen;
