import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Triangle = props => {
  return <View style={[styles.triangle, props.style]} />;
};

const QuantityPickerModal = props => {
  const WIDTH = 75;
  const HEIGHT = 175;
  let pageX = 0;
  let pageY = 0;
  let triangleStyle = {
    position: 'absolute',
    transform: [{rotate: '90deg'}, {translateY: -75}],
  };
  const loc = props.componentLocation;
  if (loc.pageX > 0) {
    if (loc.pageX < WIDTH + 20) {
      // too little space on left
      pageX = loc.pageX + loc.w;
      triangleStyle = {
        position: 'absolute',
        transform: [{rotate: '-90deg'}, {translateY: -40}],
      };
    } else {
      pageX = loc.pageX - (WIDTH + 20);
    }
    if (loc.pageY < HEIGHT / 2) {
      // too little space on top
      pageY = loc.pageY - HEIGHT / 2;
    } else {
      pageY = loc.pageY - HEIGHT / 2;
    }
  }

  return (
    <Modal
      isVisible={props.isVisible}
      animationType={'none'}
      useNativeDriver={true}
      backdropColor={props.backdropColor}
      backdropOpacity={props.backdropOpacity}
      onRequestClose={props.onRequestClose}
      onDismiss={props.onDismiss}>
      <View
        style={[
          styles.modal_container,
          {width: WIDTH, height: HEIGHT, left: pageX, top: pageY},
        ]}>
        <Triangle style={triangleStyle} />
        <ScrollView>
          {['Remove', 1, 2, 3, 4, 5, 6, 7, 8].map((num, numIdx) => (
            <View
              key={numIdx.toString()}
              style={{
                height: 36,
                alignItems: 'center',
                borderBottomColor: '#eee',
                borderBottomWidth: 1,
              }}>
              <TouchableOpacity
                onPress={() => {
                  props.onSetQuantity(num);
                }}
                hitSlop={{left: WIDTH / 2, right: WIDTH / 2}}
                style={{flex: 1, justifyContent: 'center'}}>
                <Text>{num}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal_container: {
    position: 'absolute',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 40,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
  },
});

export default QuantityPickerModal;
