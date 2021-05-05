import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {AppText} from '../components';

const AppInput = ({label, value, onChange, placeholder, style, placeholderTextColor = '#000', error, ...rest}) => {
  return (
    <View style={styles.container}>
      {label && (
        <View opacity={value ? 1 : 0}>
          <AppText style={styles.inputLabel}>{label}</AppText>
        </View>
      )}
      <TextInput
        allowFontScaling={false}
        style={[styles.input, style, error && styles.error]}
        placeholder={placeholder}
        value={value}
        onChangeText={(e) => onChange(e)}
        placeholderTextColor={error ? '#E83A1F' : placeholderTextColor}
        {...rest}
      />
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  input: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '400',
    color: '#000',
    marginVertical: 5,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#E9EBED',
  },
  inputLabel: {
    fontSize: 12,
    lineHeight: 18,
    color: '#8D8D8D',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  error: {
    color: '#E83A1F',
    borderColor: '#E83A1F',
  },
});
