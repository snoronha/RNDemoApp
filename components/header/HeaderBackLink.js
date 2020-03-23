import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export function HeaderBackLink() {
  const navigation = useNavigation();
  goBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  return (
    <TouchableOpacity
      style={styles.back_button}
      hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
      onPress={this.goBack}>
      {navigation.canGoBack() ? (
        <Icon name={'arrow-left'} size={24} color={'#888'} />
      ) : (
        <Icon name={'arrow-left'} size={24} color={'#fff'} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  back_button: {
    alignSelf: 'center',
    marginLeft: 8,
  },
});
