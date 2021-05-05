import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, StyleSheet, TouchableOpacity, Image, Linking} from 'react-native';
import {Icon} from 'react-native-elements';
import Video from 'react-native-video';
import TabsTopBar from './TabsTopBar';
import AppButton from '../components/AppButton';
import TopBar from '../components/TopBar';
import {AppText} from '../components';

const LinksTab = () => {
  const [paused, setPaused] = useState(true);
  const [linksData, setlinksData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const getLinksData = async () => {
      try {
        setisLoading(true);
        const res = await fetch('https://restoic-app-19339.botics.co/api/v1/quick-links/1/', {
          headers: {
            Accept: 'application/json',
            // Authorization: 'Token bbbc022dc7f17df215d7e29950a4b4460d9d6565',
          },
        });
        const resBody = await res.json();
        setlinksData(resBody);
        setisLoading(false);
      } catch (e) {
        setisLoading(false);
      }
    };
    getLinksData();
  }, []);
  if (linksData) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <TabsTopBar title={'links'} />
        <ScrollView>
          <View style={styles.container}>
            <Video
              source={require('../assets/sounds/links_track.mp3')} // Can be a URL or a local file.
              paused={paused}
              progressUpdateInterval={250}
              onError={(error) => {}}
              playInBackground={true} // Store reference              // Callback when remote video is buffering
            />
            <View
              style={{
                marginTop: 20,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.25,
                shadowRadius: 10,
              }}>
              <Image style={{borderRadius: 8, width: '100%'}} source={require('../assets/images/links-image.png')} />
              <View
                style={{
                  position: 'absolute',
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setPaused(!paused);
                  }}
                  style={{
                    width: 74,
                    height: 74,
                    borderRadius: 37,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(232, 58, 31, 0.6)',
                  }}>
                  <Icon
                    size={26}
                    type="restoic"
                    name={paused ? 'rs-play' : 'rs-pause'}
                    color={'white'}
                    style={{left: paused ? 2 : 0}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{}}>
              <AppText style={styles.title}>{linksData.title} </AppText>
              <AppText style={styles.subtitle}>{linksData.subtitle}</AppText>
            </View>
            <View style={{}}>
              <AppText style={[styles.copy, {marginBottom: 15}]}>{linksData.content}</AppText>
              <AppText style={[styles.secondCopy]}>{linksData.description}</AppText>
            </View>
            <AppButton
              onPress={() => {
                //  TODO: go to web page redirect
                Linking.openURL('https://restoic.com/pages/1-to-1-coaching');
              }}
              label={'learn more'}
            />
            <AppText style={styles.title}>Follow us </AppText>
            <View style={{flexDirection: 'row', marginBottom: 60}}>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/restoic/')}>
                <Image
                  style={{resizeMode: 'contain', width: 58, height: 58}}
                  source={require('../assets/images/instagram-icon.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/restoic/')}>
                <Image
                  style={{resizeMode: 'contain', width: 58, height: 58, marginLeft: 24}}
                  source={require('../assets/images/blue-facebook-icon.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/restoicmind')}>
                <Image
                  style={{resizeMode: 'contain', width: 58, height: 58, marginLeft: 24}}
                  source={require('../assets/images/twitter-icon.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <TopBar />
      </SafeAreaView>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  scene: {},
  container: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    justifyContent: 'space-between',
    height: 660,
  },
  imgBackground: {
    width: '100%',
  },
  title: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 27,
    textTransform: 'uppercase',
    color: '#0C0C0A',
  },
  subtitle: {
    fontStyle: 'italic',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 18,
    color: '#90A0AF',
  },
  copy: {
    fontStyle: 'italic',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
    color: '#474747',
  },
  secondCopy: {
    fontStyle: 'italic',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 18,
    color: '#000000',
  },
});

export default LinksTab;
