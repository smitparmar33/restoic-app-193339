import React from 'react';
import {ImageBackground, View, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import {AppText} from '../components';

const Item = ({item, onPress, style}) => {
  if (item.title === 'Digital Coaching') return null;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <ImageBackground
        resizeMode="cover"
        imageStyle={{borderRadius: 8}}
        source={{uri: item.thumbnail}}
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
          <AppText style={styles.title}>{item.title}</AppText>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    marginRight: 15,
    height: 108,
    width: 211,
    marginVertical: 10,
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

export default Item;
