import React from 'react';
import {View, StyleSheet, ImageBackground, Image, TouchableOpacity, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';

import {StreakBadge, AppText} from '../components';
import {userSelector} from '../redux/user';

export default ({navigation}) => {
  const userData = useSelector(userSelector);
  const joinedFormatteDate = moment('2021-01-05T21:35:07.175141Z').format('MMM YYYY');
  const showFileUri = () => {
    if (userData.image) {
      return {
        source: {
          uri: userData.image,
        },
      };
    } else {
      return {};
    }
  };

  if (userData) {
    const containImage = !!!userData?.image?.includes('default.jpg');
    return (
      <SafeAreaView forceInset={{bottom: 'never'}} style={{flex: 1, backgroundColor: '#000'}}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            overflow: 'hidden',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View style={styles.topHalf}>
            <ImageBackground
              style={{
                width: '100%',
                height: '100%',
                flex: 1,
              }}
              {...showFileUri()}>
              <LinearGradient
                style={[{height: '100%'}, {justifyContent: 'center', alignItems: 'center'}]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                colors={['rgba(255, 255, 255, 0.05)', 'rgba(0, 0, 0, 0.06)', 'rgba(0, 0, 0, 0.13)']}>
                <Icon
                  containerStyle={{
                    position: 'absolute',
                    top: 15,
                    right: -2,
                  }}
                  reverse
                  reverseColor={containImage ? 'white' : 'black'}
                  name="ellipsis-v"
                  type="font-awesome"
                  color="transparent"
                  onPress={() => {
                    navigation.navigate('ProfileSettings');
                  }}
                  size={24}
                />
                <Icon
                  containerStyle={{
                    position: 'absolute',
                    top: 20,
                    left: 10,
                    borderRadius: 24,
                    padding: 4,
                  }}
                  name={'close-outline'}
                  onPress={() => {
                    // closeScreen();
                    navigation.navigate('Dashboard');
                  }}
                  type="ionicon"
                  color={containImage ? 'white' : 'black'}
                  size={40}
                />
                {!containImage && (
                  <View style={{padding: 40, backgroundColor: 'rgba(144, 160, 175, 0.25)', borderRadius: 70}}>
                    <Image source={require('../assets/images/user-profile.png')} />
                  </View>
                )}
                {/* </View> */}
                <AppText style={[styles.nameLabel, {color: containImage ? 'white' : 'black'}]}>
                  {userData.first_name + ' ' + userData.last_name}
                </AppText>
                <AppText style={[styles.levelLabel, {color: containImage ? 'white' : 'black'}]}>
                  {userData.competition &&
                    competitionLevelMap.find((cmp) => Number(cmp.id) === Number(userData.competition)).label}
                </AppText>
              </LinearGradient>
            </ImageBackground>
          </View>
          <View style={styles.bottomHalf}>
            <View style={{marginBottom: 20}}>
              <StreakBadge current={userData?.streak?.current || 0} longest={userData?.streak?.highest || 0} />
            </View>
            <View style={{marginBottom: 20}}>
              <AppText style={styles.planLabel}>Plan: Free</AppText>
              <AppText style={styles.planSecondLabel}>{`Using Restoic since ${joinedFormatteDate}`}</AppText>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('UpgradePlanScreen')}
              style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Image
                resizeMode={'cover'}
                // imageStyle={{borderRadius: 8, opacity: 0.96}}
                // source={image}
                source={require('../assets/images/premium-membership-banner.png')}
                style={{width: '90%', height: 178, borderRadius: 8}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  planLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
    color: '#000000',
  },
  planSecondLabel: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    color: '#474747',
  },
  nameLabel: {
    marginTop: 28,
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 36,
    textAlign: 'center',
    color: '#000000',
  },
  levelLabel: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    color: '#000000',
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  topHalf: {
    flex: 1,
    backgroundColor: '#E3E7EB',
  },
  bottomHalf: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
});

const competitionLevelMap = [
  {id: '0', label: 'Choose Competition Level'},
  {id: '1', label: 'High School'},
  {id: '2', label: 'College'},
  {id: '3', label: 'Professional'},
  {id: '4', label: 'Recreational'},
  {id: '5', label: 'Other'},
];
