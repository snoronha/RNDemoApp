import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

//-------- REDUX -------//
import {useDispatch} from 'react-redux';

const getQuantity = (item, cart) => {
  const itemId = item.id;
  var qty = 0;
  for (var idx in cart) {
    if (cart[idx].id === itemId) {
      qty = cart[idx].qty;
    }
  }
  return qty;
};

export function QuantityPicker(props) {
  // Set quantity in state to props.item.quantity || 0
  var item = props.item;
  const qty = useSelector(state => {
    if (item.id == 1) {
      console.log('CART: ', state.cart);
    }
    return getQuantity(item, state.cart);
  });
  const [quantity, setQuantity] = useState(qty);
  const dispatch = useDispatch();
  decrementItemCount = () => {
    if (qty > 0) {
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: {item: item, qty: qty - 1},
      });
      setQuantity(qty - 1);
    } else {
      dispatch({type: 'REMOVE_FROM_CART', payload: {item: item, qty: 0}});
      setQuantity(0);
    }
  };

  incrementItemCount = () => {
    dispatch({type: 'ADD_TO_CART', payload: {item: item, qty: qty + 1}});
    setQuantity(qty + 1);
  };

  if (qty > 0) {
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
          <Text style={styles.item_text}>{qty}</Text>
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
