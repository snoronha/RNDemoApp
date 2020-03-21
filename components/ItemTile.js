import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

//-------- REDUX -------//
import {useDispatch} from 'react-redux';

export function QuantityPicker() {
  const dispatch = useDispatch();
  decrementItemCount = () => {
    dispatch({type: 'DECREMENT'});
  };

  incrementItemCount = () => {
    dispatch({type: 'INCREMENT'});
  };

  return (
    <View style={styles.item_picker}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.item_touchable_left}
          hitSlop={{top: 10, left: 10, bottom: 10, right: 0}}
          onPress={this.decrementItemCount}>
          <Text style={styles.title}> - </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item_touchable_center}
          hitSlop={{top: 10, left: 0, bottom: 10, right: 0}}>
          <Text style={styles.title}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item_touchable_right}
          hitSlop={{top: 10, left: 0, bottom: 10, right: 10}}
          onPress={this.incrementItemCount}>
          <Text style={styles.title}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// export ItemTile as a function (not a class)
export function ItemTile(props) {
  const navigation = useNavigation();

  // Set favorite in state to props.item.favorite
  const [favorite, setFavorite] = useState(props.item.favorite);

  toggleHeart = () => {
    // toggle the value of state variable favorite
    setFavorite(!favorite);
  };

  navigateToItemPage = () => {
    navigation.navigate('ItemPage');
  };

  return (
    <View style={[styles.item_row, {width: props.item.width}]}>
      <View
        style={{
          width: '80%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={this.navigateToItemPage}>
          <Image
            style={styles.item_image}
            source={{uri: props.item.image_url}}
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
      <Text style={styles.item_description}>{props.item.description}</Text>
      <QuantityPicker
        onIncrement={props.onIncrement}
        onDecrement={props.onDecrement}
      />
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
  item_touchable_center: {
    alignItems: 'center',
    height: 30,
    width: 60,
    borderTopColor: '#aaa',
    borderBottomColor: '#aaa',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
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
  },
});
