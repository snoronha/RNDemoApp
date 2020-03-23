import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {QuantityPicker} from '../components/ItemTile.js';

const CartItemTile = itemHash => {
  const item = itemHash.item;
  return (
    <View style={styles.item_row}>
      <Image style={styles.item_image} source={{uri: item.image_url}} />
      <View style={{}}>
        <Text style={[styles.item_description, {width: item.width}]}>
          {item.description}
        </Text>
        <View style={styles.quantity_picker}>
          <QuantityPicker quantity={0} item={item} />
        </View>
      </View>
      <View>
        <Text style={{marginTop: 8, fontSize: 18}}>$5.55</Text>
        <Text style={{paddingTop: 20, color: '#888'}}>Qty {item.quantity}</Text>
      </View>
    </View>
  );
};

const CartScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          style={styles.list}
          numColumns={1}
          data={global.CART.items}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <CartItemTile item={item} />;
          }}
        />
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
    justifyContent: 'flex-start',
    marginHorizontal: 4,
    paddingBottom: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  item_image: {
    width: 72,
    height: 72,
    marginTop: 16,
    marginHorizontal: 8,
    borderRadius: 4,
    justifyContent: 'center',
  },
  item_description: {
    fontSize: 12,
    marginHorizontal: 8,
    marginTop: 8,
    justifyContent: 'center',
  },
  quantity_picker: {
    flex: 1,
    fontSize: 14,
    marginTop: 8,
    marginHorizontal: 8,
    justifyContent: 'center',
  },
});
