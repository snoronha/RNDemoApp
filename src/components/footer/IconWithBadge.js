import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';

export function IconWithBadge({name, color, size}) {
  const favCount = useSelector((state) => {
    return state.favorites.length;
  });

  return (
    <View style={{width: 24, height: 24, margin: 5}}>
      <Icon name={name} size={size} color={color} />
      {favCount > 0 && (
        <View style={styles.icon_badge}>
          <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
            {favCount}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  icon_badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 7,
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
