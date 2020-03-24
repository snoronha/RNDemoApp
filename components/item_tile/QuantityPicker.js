import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

//-------- REDUX -------//
import {useDispatch} from 'react-redux';

export function QuantityPicker(props) {
  // Set quantity in state to props.item.quantity || 0
  var item = props.item;
  if (!item.quantity) {
    item.quantity = 0;
  }
  const [quantity, setQuantity] = useState(props.quantity);
  const dispatch = useDispatch();
  decrementItemCount = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      dispatch({type: 'DECREMENT'});
      if (
        global.CART.itemIds[item.id] !== undefined &&
        global.CART.itemIds[item.id] !== null
      ) {
        const index = global.CART.itemIds[item.id];
        if (quantity == 1) {
          global.CART.items.splice(index, 1);
          delete global.CART.itemIds[item.id];
        } else {
          global.CART.items[index].quantity -= 1;
        }
      }
    }
  };

  incrementItemCount = () => {
    setQuantity(quantity + 1);
    dispatch({type: 'INCREMENT'});
    // Add to/Update global.CART
    if (
      global.CART.itemIds[item.id] !== undefined &&
      global.CART.itemIds[item.id] !== null
    ) {
      const index = global.CART.itemIds[item.id];
      global.CART.items[index].quantity += 1;
    } else {
      item.quantity += 1;
      global.CART.items.push(item);
      global.CART.itemIds[item.id] = global.CART.items.length - 1;
    }
  };

  if (quantity > 0) {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.item_touchable_left}
          hitSlop={{top: 10, left: 10, bottom: 10, right: 0}}
          onPress={this.decrementItemCount}>
          <Text style={styles.item_text}> - </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item_touchable_center}
          hitSlop={{top: 10, left: 0, bottom: 10, right: 0}}>
          <Text style={styles.item_text}>{quantity}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item_touchable_right}
          hitSlop={{top: 10, left: 0, bottom: 10, right: 10}}
          onPress={this.incrementItemCount}>
          <Text style={styles.item_text}>+</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.item_touchable_center_atc}
          hitSlop={{top: 10, left: 0, bottom: 10, right: 0}}
          onPress={this.incrementItemCount}>
          <Text style={styles.item_text}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item_text: {
    fontSize: 14,
  },
  item_touchable_center_atc: {
    alignItems: 'center',
    height: 30,
    width: 60,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 14,
    justifyContent: 'center',
    backgroundColor: '#fff',
    opacity: 1,
    shadowColor: '#aaa',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.9,
  },
  item_touchable_center: {
    alignItems: 'center',
    height: 30,
    width: 60,
    borderTopColor: '#aaa',
    borderBottomColor: '#aaa',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    opacity: 1,
    shadowColor: '#aaa',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.7,
  },
  item_touchable_left: {
    alignItems: 'center',
    height: 30,
    width: 30,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    borderColor: '#aaa',
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    opacity: 1,
    shadowColor: '#aaa',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.9,
  },
  item_touchable_right: {
    alignItems: 'center',
    height: 30,
    width: 30,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    borderColor: '#aaa',
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    opacity: 1,
    shadowColor: '#aaa',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.9,
  },
});
