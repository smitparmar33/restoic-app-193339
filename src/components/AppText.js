import React from 'react';
import {Text} from 'react-native';

const AppText = ({children, style, onPress}) => {
  return (
    <Text onPress={onPress} allowFontScaling={false} style={style}>
      {children}
    </Text>
  );
};

export default AppText;
