import React, {useState, useEffect} from 'react';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import {withTheme} from 'react-native-elements';
import Toolbar from './Toolbar';

const ScreenLoader = React.memo(props => {
  const {theme, headerText, onBackPressed, onClosePressed} = props;
  const [showLoader, setLoader] = useState(false);

  //This is needed to remove the bug where the loader freezes when showing this component right after another
  //screen(or the app) already showed the loader.
  useEffect(() => {
    setLoader(true);
  }, [setLoader]);

  return (
    <SafeAreaView style={theme.mainContainer}>
      <Toolbar headerText={headerText} onBackPressed={onBackPressed} onClosePressed={onClosePressed} />
      {showLoader ? <ActivityIndicator style={theme.fullSpace} size={70} color={theme.colors.secondary} /> : null}
    </SafeAreaView>
  );
});

export default withTheme(ScreenLoader);