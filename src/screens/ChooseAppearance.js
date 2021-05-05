import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native';
import {AppText} from '../components';

const ChooseAppearance = ({navigation, route}) => {
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const {firstName} = route.params;

  return (
    <View style={styles.pageContainer}>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={{height: '50%', width: '100%'}}
          onPress={() => {
            setSelectedTheme('dark');
          }}>
          {selectedTheme === 'dark' && (
            <Image
              style={{resizeMode: 'contain', width: '100%'}}
              source={require('../assets/images/dark-mode-selected.png')}
            />
          )}
          {selectedTheme !== 'dark' && (
            <Image style={{resizeMode: 'contain', width: '100%'}} source={require('../assets/images/dark-mode.png')} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{height: '50%', width: '100%'}}
          onPress={() => {
            setSelectedTheme('light');
          }}>
          {selectedTheme === 'light' && (
            <Image
              style={{resizeMode: 'contain', width: '100%'}}
              source={require('../assets/images/light-mode-selected.png')}
            />
          )}
          {selectedTheme !== 'light' && (
            <Image style={{resizeMode: 'contain', width: '100%'}} source={require('../assets/images/light-mode.png')} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.orangeButtonContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() =>
            navigation.navigate('CreateAccount', {
              firstName,
            })
          }>
          <AppText style={styles.nextButtonText}>NEXT</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChooseAppearance;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    marginLeft: 24,
    marginRight: 24,
  },
  orangeButtonContainer: {
    height: 56,
    marginTop: 60,
    marginBottom: 60,
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
  optionShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  optionsContainer: {
    flex: 1,
    marginTop: 20,
    // height: Dimensions.get('screen').height - 60,
    height: 300,
  },
});
