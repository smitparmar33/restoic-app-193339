import React, {useState, useEffect, useContext} from 'react';
import {View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import Picker from '@gregfrench/react-native-wheel-picker';
import {SafeAreaView} from 'react-navigation';

import {userSelector} from '../redux/user';
import Icon from '../assets/icons';
import {AppButton, AppText, AppHeader} from '../components';
import {pause} from './player/playerFunctions';

const PickerItem = Picker.Item;

const Line = () => (
  <View
    style={{
      height: 24,
      width: '100%',
      justifyContent: 'center',
    }}>
    <View
      style={{
        height: 1,
        left: 4,
        right: 4,
        backgroundColor: 'rgba(144, 160, 175, 0.25)',
      }}
    />
  </View>
);
const TimePicker = ({duration, onTimerUpdate}) => {
  const h = Math.floor(duration / 3600);
  const m = Math.floor((duration % 3600) / 60);
  const s = Math.floor(duration % 60);

  const [selectedHours, setSelectedHours] = useState(h);
  const hoursOptions = Array(24)
    .fill()
    .map((_, i) => `${i} hours`);
  const [hoursList, setHoursList] = useState(hoursOptions);

  const [selectedMinutes, setSelectedMinutes] = useState(m);
  const minutesOptions = Array(60)
    .fill()
    .map((_, i) => `${i} min`);
  const [minutesList, setMinutesList] = useState(minutesOptions);

  const [selectedSeconds, setSelectedSeconds] = useState(s);
  const secondsOptions = Array(60)
    .fill()
    .map((_, i) => `${i} sec`);
  const [secondsList, setSecondsList] = useState(secondsOptions);

  const parseDuration = (s, m, h) => {
    return s + m * 60 + h * 60 * 60;
  };

  useEffect(() => {
    const h = Math.floor(duration / 3600);
    const m = Math.floor((duration % 3600) / 60);
    const s = Math.floor(duration % 60);
    setSelectedHours(h);
    setSelectedMinutes(m);
    setSelectedSeconds(s);
  }, [duration]);

  return (
    <View>
      <Line />
      <View style={{flexDirection: 'row'}}>
        <Picker
          style={{flex: 1, height: 200}}
          lineColor="#1C1E21" //to set top and bottom line color (Without gradients)
          // lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
          // lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
          selectedValue={selectedHours}
          itemStyle={{color: 'black', fontSize: 26}}
          onValueChange={(index) => {
            onTimerUpdate(parseDuration(selectedSeconds, selectedMinutes, index));
          }}>
          {hoursList.map((value, i) => (
            <PickerItem label={value} value={i} key={i} />
          ))}
        </Picker>
        <Picker
          style={{flex: 1, height: 200}}
          lineColor="#1C1E21" //to set top and bottom line color (Without gradients)
          // lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
          // lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
          selectedValue={selectedMinutes}
          itemStyle={{color: 'black', fontSize: 26}}
          onValueChange={(index) => {
            onTimerUpdate(parseDuration(selectedSeconds, index, selectedHours));
          }}>
          {minutesList.map((value, i) => (
            <PickerItem label={value} value={i} key={i} />
          ))}
        </Picker>
        <Picker
          style={{flex: 1, height: 200}}
          lineColor="#1C1E21" //to set top and bottom line color (Without gradients)
          // lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
          // lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
          selectedValue={selectedSeconds}
          itemStyle={{color: 'black', fontSize: 26}}
          onValueChange={(index) => {
            onTimerUpdate(parseDuration(index, selectedMinutes, selectedHours));
          }}>
          {secondsList.map((value, i) => (
            <PickerItem label={value} value={i} key={i} />
          ))}
        </Picker>
      </View>
      <Line />
    </View>
  );
};

const SoundScapePlayer = ({route, navigation}) => {
  const userInfo = useSelector(userSelector);
  const isPremium = userInfo?.premium_to;
  const labelStyles = {
    fontStyle: 'italic',
    // fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',

    // position adjustment
    paddingTop: 12,
  };
  const {track} = route.params;

  const [duration, setDuration] = useState(0);

  return (
    <SafeAreaView forceInset={{bottom: 'never'}} style={{flex: 1}}>
      <AppHeader title="Soundscape time" navigation={navigation} />
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View style={{flex: 1}}>
          <View
            style={{
              // flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 60,
            }}>
            <AppText style={labelStyles}>Please select your soundscape time.</AppText>
          </View>
          {!isPremium && (
            <View style={{alignItems: 'center', paddingRight: 24, paddingLeft: 24, marginTop: 50}}>
              <Image source={Icon.redLockIcon} />
              <AppText style={{textAlign: 'center', margin: 15, fontSize: 18, fontWeight: '600', fontStyle: 'italic'}}>
                Unlock <AppText style={{color: '#E83A1F'}}>Premium Access</AppText> for{'\n'}custom durations
              </AppText>
              <AppButton label="Upgrade to premium" />
            </View>
          )}
          {isPremium && (
            <TimePicker
              duration={duration}
              onTimerUpdate={(newDuration) => {
                setDuration(newDuration);
              }}
              style={{flex: 5}}
            />
          )}
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1}} />
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingRight: 24,
              paddingLeft: 24,
              width: '100%',
              flexWrap: 'wrap',
            }}>
            <View
              style={{
                width: '49%',
                justifyContent: 'space-between',
              }}>
              <AppButton
                container={{marginVertical: 3}}
                onPress={() => {
                  setDuration(5 * 60);
                }}
                type="disabled-look"
                label="5 MIN"
              />
              <AppButton
                container={{marginVertical: 3}}
                disabled={!isPremium}
                onPress={() => {
                  setDuration(30 * 60);
                }}
                type="disabled-look"
                label="30 MIN"
                style={!isPremium && {backgroundColor: '#f9fafb'}}
                labelStyle={!isPremium && {color: '#cccccc'}}
              />
            </View>
            <View
              style={{
                width: '49%',
                justifyContent: 'space-between',
                // flex: 1,
              }}>
              <AppButton
                container={{marginVertical: 3}}
                disabled={!isPremium}
                onPress={() => {
                  setDuration(15 * 60);
                }}
                type="disabled-look"
                label="15 MIN"
                style={!isPremium && {backgroundColor: '#f9fafb'}}
                labelStyle={!isPremium && {color: '#cccccc'}}
              />
              <AppButton
                container={{marginVertical: 3}}
                disabled={!isPremium}
                onPress={() => {
                  setDuration(60 * 60);
                }}
                type="disabled-look"
                label="60 MIN"
                style={!isPremium && {backgroundColor: '#f9fafb'}}
                labelStyle={!isPremium && {color: '#cccccc'}}
              />
            </View>
          </View>

          <View style={{flex: 1.5}}>
            <View
              style={{
                justifyContent: 'center',
                paddingRight: 24,
                paddingLeft: 24,
              }}>
              <AppButton
                label="PLAY"
                onPress={() => {
                  pause();
                  navigation.navigate('MyModal', {duration, track});
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SoundScapePlayer;
