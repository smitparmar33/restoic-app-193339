import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const BottomSection = ({navigation, view}) => (
  <View style={styles.wrapper}>
    <View style={styles.container}>
      <View style={[styles.dot, {backgroundColor: `rgba(255, 255, 255, ${view === 0 ? 1 : 0.5})`}]} />
      <View style={[styles.dot, {backgroundColor: `rgba(255, 255, 255, ${view === 1 ? 1 : 0.5})`}]} />
      <View style={[styles.dot, {backgroundColor: `rgba(255, 255, 255, ${view === 2 ? 1 : 0.5})`}]} />
      <View style={[styles.dot, {backgroundColor: `rgba(255, 255, 255, ${view === 3 ? 1 : 0.5})`}]} />
    </View>
    <TouchableOpacity onPress={() => navigation.navigate('SignIn', {view: 'SIGN_UP_EMAIL'})}>
      <View style={styles.button}>
        <Text style={styles.buttonLabel}>Sign up for free</Text>
      </View>
    </TouchableOpacity>
    <Text style={styles.note}>
      Already a member?{' '}
      <Text style={styles.noteAction} onPress={() => navigation.navigate('SignIn', {view: 'SIGN_IN_EMAIL'})}>
        Log in
      </Text>
    </Text>
  </View>
);

export default BottomSection;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '23%',
    alignItems: 'center',
  },
  container: {
    marginBottom: 32,
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginHorizontal: 4.5,
  },
  button: {
    backgroundColor: '#fff',
    width: 204,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 37,
    marginBottom: 37,
  },
  buttonLabel: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 21,
    textTransform: 'uppercase',
  },
  note: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 18,
  },
  noteAction: {
    fontWeight: '700',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    textDecorationLine: 'underline',
  },
});
