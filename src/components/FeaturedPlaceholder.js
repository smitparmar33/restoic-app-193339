import React from 'react';
import {ImageBackground, View, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import {AppText} from '../components';

const FeaturedPlaceholder = ({item, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <ImageBackground
        resizeMode="cover"
        imageStyle={{borderRadius: 8}}
        source={require('../assets/images/featuredBanner.png')}
        style={styles.imgBackground}>
        <View
          style={{
            borderRadius: 8,
            height: '100%',
            justifyContent: 'space-between',
            paddingLeft: 24,
            paddingBottom: 20,
            paddingTop: 12,
          }}>
          <AppText style={styles.title}>FEATURED</AppText>
          <AppText style={[styles.subTitle, {marginTop: 16}]}>Introduction {'\n'}to Restoic</AppText>
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
    marginHorizontal: 24,
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
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 42,
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  subTitle: {
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: 18,
    color: '#FFFFFF',
    paddingRight: 50,
  },
  imgBackground: {
    height: 154,
    borderRadius: 8,
  },
});

export default FeaturedPlaceholder;
