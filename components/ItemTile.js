import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

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

// export ItemTile as a function (not a class)
export function ItemTile(props) {
  const navigation = useNavigation();

  // Set favorite in state to props.item.favorite
  const [favorite, setFavorite] = useState(props.item.favorite);

  const [imageLoaded, setImageLoaded] = useState(true);

  toggleHeart = () => {
    // toggle the value of state variable favorite
    setFavorite(!favorite);
  };

  navigateToItemPage = () => {
    navigation.navigate('ItemPage', {item: props.item});
  };

  displayFallBackImage = () => {
    setImageLoaded(false);
  };

  return (
    <View style={[styles.item_row, {width: props.item.width}]}>
      <View
        style={{
          width: props.item.width,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={this.navigateToItemPage}>
          <Image
            style={styles.item_image}
            source={
              imageLoaded
                ? {uri: props.item.image_url}
                : {uri: 'https://i.picsum.photos/id/1/100/100.jpg'}
            }
            onError={this.displayFallBackImage}
          />
        </TouchableOpacity>
        <Icon
          name={favorite ? 'heart' : 'heart-o'}
          color={'tomato'}
          size={18}
          style={styles.heart}
          onPress={this.toggleHeart}
        />
      </View>
      <Text style={[styles.item_description, {width: props.item.width}]}>
        {props.item.description}
      </Text>
      <View style={styles.item_picker}>
        <QuantityPicker quantity={0} item={props.item} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item_row: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 4,
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
  heart: {
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  item_description: {
    fontSize: 12,
    marginHorizontal: 8,
    marginVertical: 8,
    justifyContent: 'center',
  },
  item_picker: {
    flex: 1,
    fontSize: 14,
    marginBottom: 16,
    marginHorizontal: 8,
    justifyContent: 'flex-end',
  },
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
