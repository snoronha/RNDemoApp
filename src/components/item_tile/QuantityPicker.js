import React, {useState, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import QuantityPickerModal from './QuantityPickerModal';
import Icon from 'react-native-vector-icons/FontAwesome';

import server from '../../conf/server';

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

  const [quantity, setQuantity] = useState(qty);
  const [expanded, setExpanded] = useState(false);
  // Handle QuantityPickerModal
  const [componentLocation, setComponentLocation] = useState({
    w: 0,
    h: 0,
    pageX: 0,
    pageY: 0,
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const dispatch = useDispatch();

  const qty = useSelector(state => {
    // Side-effect set expanded for all items != currentItem
    if (state.currentItem.id && state.currentItem.id !== item.id && expanded) {
      // console.log(`CurrentId = ${state.currentItem.id} thisid = ${item.id}`);
      setExpanded(false);
    }
    return getQuantity(item, state.cart);
  });

  decrementItemCount = () => {
    setExpanded(true);
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
    let url = `${server.domain}/order_item/${orderId}`;
    let body = JSON.stringify({
      itemId: props.item.id,
      orderId: orderId,
      quantity: decrQty,
    });
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
    setExpanded(true);
    let orderId = 1;
    let addQty = qty + 1;
    // Begin Dispatch redux event optimistically
    dispatch({
      type: 'SET_CART_QUANTITY',
      payload: {item: item, qty: addQty},
    });
    setQuantity(addQty);
    // End Dispatch redux event optimistically
    let url = `${server.domain}/order_item/${orderId}`;
    let body = JSON.stringify({
      itemId: props.item.id,
      orderId: orderId,
      quantity: addQty,
    });
    fetch(url, {method: 'post', body: body})
      .then(response => response.json())
      .then(json => {
        // TODO if the DB update fails, need to unwind the ATC here
      })
      .catch(error => console.log(error)) // handle this
      .finally(() => {
        // setQtyLoading(false)
      });
  };

  showQtyScroll = () => {
    this.quantityPicker.measure((x, y, w, h, pX, pY) => {
      console.log('w=', w, ' h=', h, ' pageX=', pX, ' pageY=', pY);
      setComponentLocation({w: w, h: h, pageX: pX, pageY: pY});
      setModalVisible(true);
    });
  };

  contractPicker = () => {
    // console.log(`Contracting picker qty = ${qty} expanded = ${expanded}`);
    setExpanded(false);
  };

  expandPicker = () => {
    // console.log(`Expanding picker expanded = ${expanded} id = ${item.id}`);
    // Dummy event to set currentItem
    // Consider creating a separate SET_CURRENT_ITEM event
    dispatch({
      type: 'SET_CART_QUANTITY',
      payload: {item: item, qty: qty},
    });
    setExpanded(true);
  };

  return (
    <>
      <QuantityPickerModal
        isVisible={isModalVisible}
        useNativeDriver={true}
        backdropColor="#aaa"
        backdropOpacity={0.4}
        onSwipeComplete={() => setModalVisible(false)}
        onRequestClose={() => setModalVisible(false)}
        onDismiss={() => setModalVisible(false)}
        toggleModal={toggleModal}
        componentLocation={componentLocation}
      />
      {qty > 0 && expanded && (
        <View
          ref={qp => {
            this.quantityPicker = qp;
          }}
          style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.item_touchable_left}
            hitSlop={{top: 10, left: 10, bottom: 10, right: 0}}
            onPress={this.decrementItemCount}>
            <Icon name={'minus'} size={14} color={'#444'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item_touchable_center}
            hitSlop={{top: 10, left: 0, bottom: 10, right: 0}}
            onPress={this.showQtyScroll}>
            <Text style={styles.item_text}>{qty}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item_touchable_right}
            hitSlop={{top: 10, left: 0, bottom: 10, right: 10}}
            onPress={this.incrementItemCount}>
            <Icon name={'plus'} size={14} color={'#444'} />
          </TouchableOpacity>
        </View>
      )}
      {qty > 0 && !expanded && (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.item_touchable_center_atc_qty}
            hitSlop={{top: 10, left: 0, bottom: 10, right: 0}}
            onPress={this.expandPicker}>
            <Text style={styles.item_text_white}>{qty}</Text>
          </TouchableOpacity>
        </View>
      )}

      {qty <= 0 && (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.item_touchable_center_atc}
            hitSlop={{top: 10, left: 0, bottom: 10, right: 0}}
            onPress={this.incrementItemCount}>
            <Text style={styles.item_text}>Add</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  item_text: {
    fontSize: 16,
  },
  item_text_white: {
    color: '#fff',
    fontSize: 16,
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
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.9,
  },
  item_touchable_center_atc_qty: {
    alignItems: 'center',
    height: 30,
    width: 60,
    borderColor: '#04a',
    borderWidth: 1,
    borderRadius: 14,
    justifyContent: 'center',
    backgroundColor: '#08f',
    opacity: 1,
    shadowColor: '#04a',
    shadowOffset: {width: 1, height: 1},
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
    shadowOffset: {width: 1, height: 1},
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
    shadowOffset: {width: 1, height: 1},
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
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.9,
  },
});
