import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Images from '../assets/images';
import Icon from '../assets/icons';

const AppImage = ({type, style, source, onPress}) => {
  if (!type || !source) return null;
  const src = {
    image: !!source && Images[source],
    icon: !!source && Icon[source],
  };
  if (!!onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Image transition={false} style={style} source={src[type]} />
      </TouchableOpacity>
    );
  }
  return <Image transition={false} style={style} source={src[type]} />;
};

export default AppImage;
