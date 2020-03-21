import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const ItemPageScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <Text>Item Page</Text>
      </View>
    </SafeAreaView>
  );
};

export default ItemPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#fff',
  },
});
