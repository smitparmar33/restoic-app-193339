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

const WelcomeScreen = ({navigation, route}) => {
  const {firstName} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.pageContainer}>
        {/* <AppText> Nile</AppText> */}
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/back-icon.png')} style={styles.backIcon} />
        </TouchableWithoutFeedback>
        <Image source={require('../assets/images/first-step-dots.png')} style={styles.dots} />
        <Image source={require('../assets/images/first-welcome-image.png')} style={styles.welcomeImage} />
        <View style={styles.textContainer}>
          <AppText style={styles.textTitle}> {`Welcome, ${firstName}`}</AppText>
          <AppText style={styles.textDesc}>Your journey to become a mindful athlete has begun!</AppText>
        </View>
        <View style={styles.orangeButtonContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() =>
              navigation.navigate('WelcomeScreenTwo', {
                // firstName,
              })
            }>
            <AppText style={styles.nextButtonText}>NEXT</AppText>
          </TouchableOpacity>
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
  },
  orangeButtonContainer: {
    height: 56,
    marginTop: 60,
    marginBottom: 30,
    width: '100%',
    alignItems: 'stretch',
  },
  nextButton: {
    backgroundColor: '#E83A1F',
    flex: 1,
    borderRadius: 4,
    height: 56,
    position: 'relative',
    justifyContent: 'center',
    alignContent: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    lineHeight: 18,
    letterSpacing: -0.17,
    textAlign: 'center',
    color: 'white',
    marginTop: 4,
  },
  textDesc: {
    fontStyle: 'italic',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    color: '#000000',
  },
  textTitle: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#000000',

    marginBottom: 5,
  },
});

export default WelcomeScreen;
