import React, {useState, useEffect} from 'react';
import {Alert, Modal, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableHighlight} from 'react-native-gesture-handler';
import ItemPageQuickLook from './ItemPageQuickLook';

export default QuickLookModal = ({visible, props}) => {
  const hideQuickLookModal = props.hideQuickLookModal;

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        presentationStyle={'overFullScreen'}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View
          style={{
            flex: 1,
            marginVertical: 30,
            marginHorizontal: 10,
            backgroundColor: '#fff',
            borderRadius: 20,
            borderColor: '#aaa',
            borderWidth: 1,
          }}>
          <View>
            <TouchableHighlight
              style={{alignSelf: 'flex-end', margin: 10}}
              onPress={hideQuickLookModal}>
              <Icon name={'times'} size={24} />
            </TouchableHighlight>
            <ItemPageQuickLook props={{item: props.item}} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
