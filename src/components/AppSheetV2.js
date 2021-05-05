import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {BottomSheet, Overlay} from '.';

const AppSheet = ({refTest, snapPoints, children, onClose}) => {
  const [visible, setVisible] = useState(false);

  const close = () => {
    setVisible(false);
    refTest?.current?.snapTo(1);
    onClose && onClose();
  };

  const open = () => setVisible(true);

  return (
    <>
      <Overlay onPress={close} visible={visible} />
      <BottomSheet
        renderContent={() => <View style={styles.textHolder}>{children}</View>}
        onClose={close}
        onOpenStart={open}
        sheetRef={refTest}
        snapPoints={snapPoints}
        onCloseStart={close}
      />
    </>
  );
};

export default AppSheet;

const styles = StyleSheet.create({
  textHolder: {
    backgroundColor: 'white',
    height: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
