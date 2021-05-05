import {CommonActions, StackActions} from '@react-navigation/native';

export default class NavigationService {
  // core navigator
  static navigator;

  // sets the core navigator
  static setTopLevelNavigator(navigatorRef) {
    NavigationService.navigator = navigatorRef;
  }
  // naviget to a route
  static navigate(name, params) {
    NavigationService.navigator.dispatch(CommonActions.navigate({name, params}));
  }

  static goBack() {
    return NavigationService.navigator.dispatch(CommonActions.goBack());
  }

  static popToTop() {
    NavigationService.navigator.dispatch(StackActions.popToTop());
  }
}

export const navigateToPlayer = (item) => {
  if (item.title === 'Soundscapes') {
    NavigationService.navigate('SoundScapes', {item});
  } else if (item.title === 'Breathwork') {
    NavigationService.navigate('ComingSoonScreen');
  } else {
    NavigationService.navigate('TrackListScreen', {item: item.title});
  }
};
