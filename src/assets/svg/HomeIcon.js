import Svg, {Path} from 'react-native-svg';

import React from 'react';

const HomeIcon = ({color = '#fff'}) => {
  return (
    <Svg width="20" height="22" viewBox="0 0 20 22" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.3125 21.1998H15.9125C17.9525 21.1998 19.5125 19.6398 19.5125 17.5998V5.5998L9.9125 0.799805L0.3125 5.5998V17.5998C0.3125 19.6398 1.8725 21.1998 3.9125 21.1998H7.5125V16.1998C7.5125 15.6475 7.96021 15.1998 8.5125 15.1998H11.3125C11.8648 15.1998 12.3125 15.6475 12.3125 16.1998V21.1998Z"
        fill={color}
      />
    </Svg>
  );
};

export default HomeIcon;
