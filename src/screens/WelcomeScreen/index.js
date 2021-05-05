import React, {useState} from 'react';
import {View, Dimensions, ScrollView, StatusBar} from 'react-native';
import Screen from './Screen';
import ScreenTwo from './ScreenTwo';
import BottomSection from './BottomSection';

const WelcomeScreen = ({navigation}) => {
  const [view, setView] = useState(0);
  const windowWidth = Dimensions.get('window').width;

  const handleViewChanged = ({nativeEvent}) => {
    const index = Math.round(nativeEvent.contentOffset.x / windowWidth);
    setView(index);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView onMomentumScrollEnd={handleViewChanged} pagingEnabled decelerationRate="fast" horizontal>
        <Screen windowWidth={windowWidth} />
        <ScreenTwo
          windowWidth={windowWidth}
          image="welcomeTwo"
          title="Driven By Sport Science"
          subtitle="Developed in collaboration with the world’s best performance psychologists to focus on the five mental skills athletes need most"
        />
        <ScreenTwo
          windowWidth={windowWidth}
          image="welcomeThree"
          title="On-Demand Audio Workouts"
          subtitle="Train daily using proven mental strength practices designed to enhance the mind-body connection through premium audio"
        />
        <ScreenTwo
          windowWidth={windowWidth}
          image="welcomeFour"
          title="Unlock Your Competitive Edge"
          subtitle="Train like the pros to increase confidence,
          decrease stress & anxiety, and
          elevate your performance"
        />
      </ScrollView>
      <BottomSection navigation={navigation} view={view} />
    </View>
  );
};

export default WelcomeScreen;
