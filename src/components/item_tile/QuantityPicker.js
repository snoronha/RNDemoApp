import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

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
    return getQuantity(item, state.cart);
  });
  const [quantity, setQuantity] = useState(qty);
  const [isQtyLoading, setQtyLoading] = useState(true); // used for change qty
  const dispatch = useDispatch();

  decrementItemCount = () => {
    // POST /order_item/:order_id
    let orderId = 1;
    let decrQty = qty > 0 ? qty - 1 : 0;
    // Begin Dispatch redux event optimistically
    setQuantity(decrQty);
    dispatch({
      type: 'SET_CART_QUANTITY',
      payload: {item: item, qty: decrQty},
    });
    // End Dispatch redux event optimistically
    let url = `http://localhost:8080/order_item/${orderId}`;
    let body = JSON.stringify({
      itemId: props.item.id,
      orderId: orderId,
      quantity: decrQty,
    });
    // setQtyLoading(true);
    fetch(url, {method: 'post', body: body})
      .then(response => response.json())
      .then(json => {
        // setQtyLoading(true);
      })
      .catch(error => console.error(error)) // handle this
      .finally(() => {
        // setQtyLoading(false)
      });
  };

  incrementItemCount = () => {
    let orderId = 1;
    let addQty = qty + 1;
    // Begin Dispatch redux event optimistically
    dispatch({
      type: 'SET_CART_QUANTITY',
      payload: {item: item, qty: addQty},
    });
    setQuantity(addQty);
    // End Dispatch redux event optimistically
    let url = `http://localhost:8080/order_item/${orderId}`;
    let body = JSON.stringify({
      itemId: props.item.id,
      orderId: orderId,
      quantity: addQty,
    });
    // setQtyLoading(true);
    fetch(url, {method: 'post', body: body})
      .then(response => response.json())
      .then(json => {
        // setQtyLoading(true);
        // TODO if the DB update fails, need to unwind the ATC here
      })
      .catch(error => console.error(error)) // handle this
      .finally(() => {
        // setQtyLoading(false)
      });
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
