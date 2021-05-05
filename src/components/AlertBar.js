import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';
import {AppText} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {alertBarSelector, setAlertBar} from '../redux/globalSetting';

const AlertBar = () => {
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(-100)).current;
  const alertBar = useSelector(alertBarSelector);

  const slideIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const slideOut = () => {
    Animated.timing(fadeAnim, {
      toValue: -100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const wait = () => {
    setTimeout(() => {
      return dispatch(setAlertBar({visible: false, text: ''}));
    }, 2000);
  };
  useEffect(() => {
    !!alertBar.visible ? slideIn() : slideOut();
    !!alertBar.visible && wait();
  }, [alertBar]);
  return (
    <Animated.View
      style={{
        zIndex: 1000,
        width: '100%',
        position: 'absolute',
        top: fadeAnim, // Bind opacity to animated value
        paddingTop: 50,
        paddingBottom: 10,
        backgroundColor: '#E83A1F',
      }}>
      <AppText style={{textAlign: 'center', fontStyle: 'italic', fontSize: 18, fontWeight: '600', color: '#fff'}}>
        {alertBar.text}
      </AppText>
    </Animated.View>
  );
};

export default AlertBar;
