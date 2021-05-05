import React, {Component, useState} from 'react';
import {Text, StyleSheet, TouchableWithoutFeedback, View, SafeAreaView} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

export default (props) => {
  // const sheetRef = React.useRef(null);
  const {defaultClosed = true} = props;
  // console.log(props.sheetRef);
  setTimeout(() => {
    // console.log(props.sheetRef);
  }, 2000);
  const [closed, setclosed] = useState(defaultClosed);
  return (
    <SafeAreaView
      style={[styles.containerView, !closed ? {zIndex: 101, backgroundColor: 'rgba(0,0,0, 0.2)'} : null]}
      // pointerEvents="box-none"
      // pointerEvents="box-none"
      // pointerEvents={closed ? 'box-none' : 'box-none'}
      //
    >
      {/* <View
        style={{flex: 1}}
        pointerEvents={closed ? 'box-none' : 'none'}
        // onPress=()
      /> */}
      <BottomSheet
        ref={props.sheetRef}
        {...props}
        onCloseEnd={() => {
          // console.log('====');
          // console.log('closing now');
          props.onCloseEnd && props.onCloseEnd();
          setclosed(true);
        }}
        onOpenStart={() => {
          props.onOpenEnd && props.onOpenEnd();
          setclosed(false);
        }}
        // pointerEvents="all"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    width: '100%',
    zIndex: -1,
    // backgroundColor: 'rgba(0,0,0, 0.2)',
  },
});
