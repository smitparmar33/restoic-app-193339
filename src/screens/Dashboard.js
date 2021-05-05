import React, {useState, useEffect} from 'react';
import {Dimensions, Platform} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';

import NavigationService from '../services/NavigationService';
import {checkIsBinauralSeen} from '../redux/globalSetting';
import {getCategories} from '../redux/tracks';
import {tokenSelector} from '../redux/user';
import Categories from './Categories';
import {AppText} from '../components';
import LinksTab from './LinksTab';
import HomeTab from './HomeTab';
import {CoachingIcon, CategoriesIcon, HomeIcon} from '../assets/svg';

import RNBootSplash from 'react-native-bootsplash';

RNBootSplash.hide(); // immediate

const initialLayout = {width: Dimensions.get('window').width};

const Dashboard = ({route}) => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);

  const tabIndex = route?.params?.tabIndex || undefined;
  const token = useSelector(tokenSelector);

  useEffect(() => {
    if (tabIndex) {
      setIndex(tabIndex);
    }
  }, [route]);

  useEffect(() => {
    dispatch(getCategories(token));
    dispatch(checkIsBinauralSeen());
  }, []);
  return (
    <TabView
      renderTabBar={renderTabBar}
      tabBarPosition={'bottom'}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      swipeEnabled={index === 0 ? false : true}
    />
  );
};

export default Dashboard;

const routes = [
  {
    key: 'home',
    title: 'HOME',
  },
  {key: 'categories', title: 'CATEGORIES'},
  {key: 'links', title: 'COACHING'},
];

const renderScene = ({route}) => {
  switch (route.key) {
    case 'home':
      return <HomeTab navigation={NavigationService} />;
    case 'categories':
      return <Categories navigation={NavigationService} />;
    case 'links':
      return <LinksTab navigation={NavigationService} />;
    default:
      return null;
  }
};

const renderTabBar = (props) => (
  <TabBar
    {...props}
    style={{
      backgroundColor: 'white',
      paddingBottom: Platform.OS == 'ios' ? 28 : 0,
      borderTopColor: 'rgba(144, 160, 175, 0.15)',
      borderTopWidth: 1,
    }}
    activeColor="black"
    inactiveColor={'#90A0AF'}
    indicatorStyle={{backgroundColor: 'transparent'}}
    onTabPress={({route, preventDefault}) => {
      if (route.key === 'home') {
        //   fetchFavotirest();
      }
    }}
    renderLabel={({route, focused, color}) => (
      <AppText style={{color, margin: 4}} numberOfLines={1}>
        {route.title}
      </AppText>
    )}
    renderIcon={({route, focused, color}) => {
      if (route.key === 'home') {
        return <HomeIcon color={color} />;
      }
      if (route.key === 'categories') {
        return <CategoriesIcon color={color} />;
      }
      if (route.key === 'links') {
        return <CoachingIcon color={color} />;
      }
    }}
  />
);
