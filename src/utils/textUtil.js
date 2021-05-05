import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size) => (width / guidelineBaseWidth) * size;
const scaleVertical = (size) => (height / guidelineBaseHeight) * size;
const scaleModerate = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const cutLongText = (text, max) => {
  if (text.length > max) {
    return `${text.substring(0, max)}...`;
  }
  return text;
};

export {scale, scaleVertical, scaleModerate, cutLongText};
