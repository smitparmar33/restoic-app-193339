import React, {useMemo} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Icon, Button, Header, withTheme} from 'react-native-elements';

const Toolbar = React.memo(props => {
  const {theme, onBackPressed, headerText} = props;
  const onClosePressed = props.onClosePressed ? props.onClosePressed : props.onBackPressed;

  const styles = useMemo(() => {
    return StyleSheet.create({
      header: {
        paddingTop: 0,
        borderBottomColor: theme.colors.primary,
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: Platform.select({android: 56, default: 44}),
      },
      headerText: {
        color: theme.colors.white,
        fontSize: 18,
        fontWeight: 'bold',
      },
    });
  }, [theme]);

  return (
    <Header
      containerStyle={[styles.header, theme.shadowNormal]}
      placement="left"
      leftComponent={
        onBackPressed ? (
          <Button
            onPress={onBackPressed}
            type="clear"
            icon={<Icon type="material-community" name="arrow-left" size={24} color={theme.colors.white} />}
            containerStyle={theme.roundedButton}
          />
        ) : null
      }
      centerComponent={{
        text: headerText,
        style: styles.headerText,
      }}
      rightComponent={
        <Button
          onPress={onClosePressed}
          type="clear"
          icon={<Icon type="material-community" name="close" size={24} color={theme.colors.white} />}
          containerStyle={theme.roundedButton}
        />
      }
    />
  );
});

export default withTheme(Toolbar);
