import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

import React from 'react';
import {View} from 'react-native';

const CategoriesIcon = ({color = '#fff', style}) => {
  return (
    <View style={style}>
      <Svg width="19" height="18" viewBox="0 0 19 18" fill="none">
        <G clipPath="url(#clip0)">
          <Path
            d="M17.7289 5.14307H2.09468C1.66858 5.14307 1.32324 5.48841 1.32324 5.9145V17.2288C1.32324 17.6549 1.66858 18.0002 2.09468 18.0002H17.729C18.1551 18.0002 18.5004 17.6549 18.5004 17.2288V5.9145C18.5004 5.48841 18.155 5.14307 17.7289 5.14307Z"
            fill={color}
          />
          <Path
            d="M16.4437 2.57129H3.38081C2.95472 2.57129 2.60938 2.91663 2.60938 3.34272C2.60938 3.76882 2.95472 4.11416 3.38081 4.11416H16.4437C16.8698 4.11416 17.2151 3.76882 17.2151 3.34272C17.2151 2.91663 16.8698 2.57129 16.4437 2.57129Z"
            fill={color}
          />
          <Path
            d="M15.1574 0H4.66596C4.23987 0 3.89453 0.34534 3.89453 0.771434C3.89453 1.19753 4.23987 1.54287 4.66596 1.54287H15.1574C15.5835 1.54287 15.9288 1.19753 15.9288 0.771434C15.9288 0.34534 15.5835 0 15.1574 0Z"
            fill={color}
          />
        </G>
        <Defs>
          <ClipPath id="clip0">
            <Rect width="18" height="18" fill="white" transform="translate(0.912109)" />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
};

export default CategoriesIcon;
