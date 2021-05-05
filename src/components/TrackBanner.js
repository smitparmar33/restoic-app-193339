import React from 'react';
import {View, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import {AppText} from '../components';

const TrackBanner = ({item: {track}, onPress, style}) => {
  return (
    <TouchableOpacity onPress={() => onPress && onPress()} style={[styles.item, style]}>
      <ImageBackground
        resizeMode="cover"
        imageStyle={{borderRadius: 8}}
        source={{uri: track.thumbnail}}
        style={[styles.imgBackground]}>
        <View
          style={{
            flex: 1,
            borderRadius: 8,
            justifyContent: 'flex-end',
            paddingHorizontal: 24,
            paddingBottom: 14,
            backgroundColor: 'rgba(0,0,0,.24)',
          }}>
          <AppText style={styles.title}>{track.title}</AppText>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default TrackBanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginRight: 15,
    height: 108,
    width: 211,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 18,
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
    height: 108,
    width: 211,
    borderRadius: 8,
  },
});
