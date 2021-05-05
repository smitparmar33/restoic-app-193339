import React from 'react';
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {AppText} from '../components';

const Pulse = require('react-native-pulse').default;

const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.pageContainer}>
        {/* <AppText> Nile</AppText> */}
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/back-icon.png')} style={styles.backIcon} />
        </TouchableWithoutFeedback>
        <Image source={require('../assets/images/third-step-dots.png')} style={styles.dots} />
        <Image source={require('../assets/images/third-welcome-image.png')} style={styles.welcomeImage} />
        <View style={styles.textContainer}>
          {/* <AppTextStroke stroke={1} color={'#000000'}> */}
          <AppText
            style={
              {
                fontSize: 32,
                color: 'black',
                fontStyle: 'italic',
                width: 255,
                // textAlign: 'center',
                textTransform: 'uppercase',
                // marginBottom: -20,
                fontWeight: 'bold',
              }
              // styles.textTitle
            }>
            Are you ready
          </AppText>
          {/* </TextStroke> */}
          <AppText style={styles.textDesc}>to level up?</AppText>
        </View>
        <View style={styles.orangeCircleContainer}>
          <View style={styles.animationContainer}>
            <Pulse color="#E83A1F" numPulses={3} diameter={300} speed={20} duration={2000} />
          </View>
          <View style={styles.orangeButtonContainer}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={
                // () => setisLoggedIn(true)
                // navigation.navigate('Dashboard', {
                //   // firstName,
                // })
                () => {}
              }>
              <AppText style={styles.nextButtonText}>Start</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 24,
    marginRight: 24,
    position: 'relative',
  },
  backIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  dots: {marginTop: 22},
  welcomeImage: {},
  textContainer: {
    width: 284,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  orangeCircleContainer: {
    // backgroundColor: 'rgba(232, 58, 31, 0.22)',
    width: 170,
    height: 170,
    borderRadius: 85,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  orangeButtonContainer: {
    // marginTop: 60,
    width: 124,
    height: 124,
    alignItems: 'stretch',
  },
  nextButton: {
    backgroundColor: '#E83A1F',
    flex: 1,
    width: 124,
    height: 124,
    borderRadius: 62,
    // height: 56,
    position: 'relative',
    justifyContent: 'center',
    alignContent: 'center',
  },
  nextButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    lineHeight: 32,
    letterSpacing: -0.17,
    textAlign: 'center',
    color: 'white',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  textDesc: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 24,
    // lineHeight: 36,
    textAlign: 'center',
    color: '#000000',
    textTransform: 'uppercase',
  },
  textTitle: {
    fontStyle: 'italic',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 24,
    // lineHeight: 36,
    color: '#000000',

    marginBottom: -18,
  },
  animationContainer: {
    position: 'absolute',
  },
});

export default WelcomeScreen;
