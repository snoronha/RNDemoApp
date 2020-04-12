import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Interactable from 'react-native-interactable';
import ItemPageQuickLook from './ItemPageQuickLook.js';

const Screen = Dimensions.get('window');

export function QuickLook({props}) {
  const hideQuickLook = props.hideQuickLook;
  const item = props.item;
  return (
    <View style={styles.card_container}>
      <Interactable.View
        key="first"
        VerticalOnly={true}
        snapPoints={[{y: 0, damping: 0.5}]}>
        <View style={styles.card}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', margin: 4}}
            onPress={hideQuickLook}>
            <Icon
              name={'times'}
              size={24}
              color={'#000'}
              style={{alignSelf: 'flex-end', margin: 10}}
            />
          </TouchableOpacity>
          <ItemPageQuickLook props={{item: item}} />
        </View>
      </Interactable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card_container: {
    position: 'absolute',
    zIndex: 2,
    marginLeft: Screen.width * 0.05,
    justifyContent: 'center',
    alignContent: 'center',
  },
  card: {
    flex: 1,
    width: Screen.width * 0.9,
    height: Screen.height * 0.75,
    backgroundColor: '#fff',
    opacity: 0.95,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#aaa',
    marginVertical: 6,
  },
});
