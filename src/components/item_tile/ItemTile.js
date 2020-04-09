import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {QuantityPicker} from './QuantityPicker';

// export ItemTile as a function (not a class)
export function ItemTile(props) {
  const navigation = useNavigation();
  const [favorite, setFavorite] = useState(props.item.favorite);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [isHeartLoading, setHeartLoading] = useState(true); // used for heart-ing
  const dispatch = useDispatch();

  toggleHeart = () => {
    let action = favorite ? 'delete' : 'insert';
    let url = `http://localhost:8080/favorites/${props.item.id}?action=${action}`;
    let body = JSON.stringify({itemId: props.item.id, userId: 1});
    setHeartLoading(true);
    fetch(url, {method: 'post', body: body})
      .then((response) => response.json())
      .then((json) => {
        setHeartLoading(true);
        if (action === 'delete') {
          dispatch({type: 'UNHEART_ITEM', payload: {item: props.item}});
        } else {
          dispatch({type: 'HEART_ITEM', payload: {item: props.item}});
        }
      })
      .catch((error) => console.error(error)) // handle this
      .finally(() => setHeartLoading(false));
    setFavorite(!favorite);
  };

  navigateToItemPage = () => {
    navigation.navigate('ItemPage', {item: props.item});
  };

  displayFallBackImage = () => {
    setImageLoaded(false);
  };

  // Pick alternate tiles to show ItemPageModal + ItemPageScreen
  // Real use case: variants show (Quick Look) modal first
  const modalOrScreen = () => {
    if (props.item && props.item.hasVariants) {
      return (
        <TouchableOpacity
          onPress={() => props.showQuickLookModal({item: props.item})}>
          <Image
            style={styles.item_image}
            source={
              imageLoaded
                ? {uri: props.item.thumbnail}
                : {uri: 'https://i.picsum.photos/id/1/100/100.jpg'}
            }
            onError={this.displayFallBackImage}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={this.navigateToItemPage}>
          <Image
            style={styles.item_image}
            source={
              imageLoaded
                ? {uri: props.item.thumbnail}
                : {uri: 'https://i.picsum.photos/id/1/100/100.jpg'}
            }
            onError={this.displayFallBackImage}
          />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={[styles.item_row, {width: props.width}]}>
      <View
        style={{
          width: props.item.width,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {modalOrScreen()}
        <TouchableOpacity
          style={styles.heart}
          onPress={this.toggleHeart}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Icon
            name={favorite ? 'heart' : 'heart-o'}
            color={'tomato'}
            size={18}
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', width: props.width}}>
        <Text style={styles.item_price}>${props.item.list.toFixed(2)}</Text>
        <Text style={styles.display_unit}>${props.item.displayUnitPrice}</Text>
      </View>
      <Text style={[styles.item_description, {width: props.width}]}>
        {props.item.name}
      </Text>
      <View style={styles.item_picker}>
        <QuantityPicker item={props.item} />
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
    justifyContent: 'space-between',
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
  item_price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 8,
    marginVertical: 4,
  },
  display_unit: {
    fontSize: 12,
    color: '#aaa',
    marginHorizontal: 0,
    marginVertical: 6,
  },
  item_description: {
    flex: 1,
    fontSize: 12,
    marginHorizontal: 8,
    marginVertical: 8,
    justifyContent: 'center',
  },
  item_picker: {
    fontSize: 14,
    marginBottom: 16,
    marginHorizontal: 8,
    justifyContent: 'flex-end',
  },
  item_text: {
    fontSize: 14,
  },
});