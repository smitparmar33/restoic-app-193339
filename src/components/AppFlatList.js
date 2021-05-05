import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {AppText} from '../components';

const AppFlatList = ({title, horizontal, vertical, data, renderItem, onPress, style}) => {
  if (!renderItem) return null;
  return (
    <View style={styles.container}>
      {title && <AppText style={styles.title}>{title}</AppText>}
      <FlatList
        ListHeaderComponent={<View style={{width: 24}} />}
        data={data}
        horizontal={horizontal}
        vertical={vertical}
        renderItem={({item, index}) => renderItem({item, index, onPress})}
        keyExtractor={(item, key) => key.toString()}
        style={style}
      />
    </View>
  );
};

export default AppFlatList;

const styles = StyleSheet.create({
  container: {},
  title: {
    textTransform: 'uppercase',
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '600',
    marginBottom: 25,
    marginLeft: 24,
  },
});
