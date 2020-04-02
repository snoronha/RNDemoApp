import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {QuantityPicker} from '../components/item_tile/QuantityPicker';

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

const getCart = (items, cart) => {
  var cartWithItems = [];
  for (var idx in cart) {
    var item = items[cart[idx].id];
    cartWithItems.push(item);
  }
  return cartWithItems;
};

const getTotal = (items, cart) => {
  var total = 0;
  for (var idx in cart) {
    var item = items[cart[idx].id];
    total += item.list * cart[idx].qty;
  }
  return total;
};

const CartItemTile = itemHash => {
  const item = itemHash.item;
  const qty = useSelector(state => {
    return getQuantity(item, state.cart);
  });
  return (
    <View style={styles.item_row}>
      <Image style={[styles.item_image]} source={{uri: item.thumbnail}} />
      <View style={{width: Dimensions.get('window').width * 0.5}}>
        <Text style={[styles.item_description]}>{item.name}</Text>
        <View style={styles.quantity_picker}>
          <QuantityPicker item={item} />
        </View>
      </View>
      <View style={{width: 70, alignItems: 'flex-end'}}>
        <View
          style={{
            width: 70,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{marginTop: 8, marginLeft: 8, fontSize: 18, color: '#888'}}>
            $
          </Text>
          <Text style={{marginTop: 8, fontSize: 18, marginRight: 8}}>
            {(item.list * qty).toFixed(2)}
          </Text>
        </View>
        <Text style={{paddingTop: 10, marginRight: 8, color: '#888'}}>
          Qty {qty}
        </Text>
      </View>
    </View>
  );
};

const CartScreen = () => {
  const cart = useSelector(state => {
    return getCart(state.items, state.cart);
  });
  const cartTotal = useSelector(state => {
    return getTotal(state.items, state.cart);
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        {/* Show big gray shopping cart if no items in cart */}
        {cart.length <= 0 && (
          <View style={styles.shopping_cart_icon_container}>
            <Icon name={'shopping-cart'} size={150} color={'#ddd'} />
            <Text style={styles.shopping_cart_text}>No items in cart</Text>
          </View>
        )}
        <SwipeListView
          useFlatList={true}
          data={cart}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return <CartItemTile item={item} />;
          }}
          renderHiddenItem={(rowData, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity
                onPress={() => rowMap[rowData.item.key].closeRow()}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={75}
          rightOpenValue={-150}
          onRowOpen={(rowKey, rowMap) => {
            setTimeout(() => {
              rowMap[rowKey].closeRow();
            }, 2000);
          }}
        />
        <View
          style={[
            {
              position: 'absolute',
              width: Dimensions.get('window').width,
              height: 60,
              bottom: 0,
              borderTopColor: '#ddd',
              borderTopWidth: 1,
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}>
          <Text
            style={{
              fontSize: 24,
              marginLeft: 20,
              marginTop: 8,
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            Total
          </Text>
          <Text style={{fontSize: 24, marginRight: 8, marginTop: 8}}>
            $ {cartTotal.toFixed(2)}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#fff',
  },
  list: {
    height: Dimensions.get('window').height,
  },
  item_row: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  item_image: {
    width: 72,
    height: 72,
    marginTop: 4,
    marginLeft: 8,
    borderRadius: 4,
    justifyContent: 'center',
  },
  item_description: {
    width: Dimensions.get('window').width * 0.45,
    fontSize: 12,
    marginLeft: 4,
    marginTop: 8,
    justifyContent: 'flex-start',
  },
  quantity_picker: {
    flex: 1,
    fontSize: 14,
    marginTop: 8,
    justifyContent: 'center',
  },
  shopping_cart_icon_container: {
    height: Dimensions.get('window').height * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopping_cart_text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ddd',
  },
});
