import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {QuantityPicker} from './QuantityPicker';
import server from '../../conf/server';

// export ItemTile as a function (not a class)
export function ItemTile(props) {
  const Screen = Dimensions.get('window');
  const tileType = props.tileType; // enum: ['home', 'grid', 'list']
  const isListType = tileType == 'list';
  // tileType determines layout of tile
  let itemWidth = Screen.width * 0.5; // default
  switch (tileType) {
    case 'home':
      itemWidth = Screen.width * 0.4;
      break;
    case 'grid':
      itemWidth = Screen.width * 0.5;
      break;
    case 'list':
      itemWidth = Screen.width;
      break;
  }
  const item = props.item;
  const navigation = useNavigation();
  const [favorite, setFavorite] = useState(item.favorite);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [isHeartLoading, setHeartLoading] = useState(true); // used for heart-ing
  const dispatch = useDispatch();

  toggleHeart = () => {
    let action = favorite ? 'delete' : 'insert';
    let url = `${server.domain}/favorites/${item.id}?action=${action}`;
    let body = JSON.stringify({itemId: item.id, userId: 1});
    setHeartLoading(true);
    fetch(url, {method: 'post', body: body})
      .then(response => response.json())
      .then(json => {
        setHeartLoading(true);
        if (action === 'delete') {
          dispatch({type: 'UNHEART_ITEM', payload: {item: item}});
        } else {
          dispatch({type: 'HEART_ITEM', payload: {item: item}});
        }
      })
      .catch(error => console.error(error)) // handle this
      .finally(() => setHeartLoading(false));
    setFavorite(!favorite);
  };

  navigateToItemPage = () => {
    navigation.navigate('ItemPage', {item: item});
  };

  displayFallBackImage = () => {
    setImageLoaded(false);
  };

  // Pick alternate tiles to show ItemPageModal + ItemPageScreen
  // Real use case: variants show (Quick Look) modal first
  const modalOrScreen = () => {
    if (
      props.showQuickLookModal &&
      props.item &&
      props.item.type == 'VARIANT'
    ) {
      return (
        <TouchableOpacity
          onPress={() => props.showQuickLookModal({item: item})}>
          <Image
            style={styles.item_image}
            source={
              imageLoaded
                ? {uri: item.thumbnail}
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
                ? {uri: item.thumbnail}
                : {uri: 'https://i.picsum.photos/id/1/100/100.jpg'}
            }
            onError={this.displayFallBackImage}
          />
        </TouchableOpacity>
      );
    }
  };

  const seeOptions = () => {
    if (props.item && item.type == 'VARIANT') {
      if (props.showQuickLookModal) {
        // showQuickModal has been passed in
        return (
          <View style={styles.item_picker}>
            <TouchableOpacity
              onPress={() => props.showQuickLookModal({item: item})}>
              <Text style={styles.options_text}>See Options</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        // if no showQuickModal present, navigate to Item Page
        return (
          <View style={styles.item_picker}>
            <TouchableOpacity onPress={this.navigateToItemPage}>
              <Text style={styles.options_text}>See Options</Text>
            </TouchableOpacity>
          </View>
        );
      }
    } else {
      // if not VARIANT show regular Item Page
      return (
        <View style={styles.item_picker}>
          <QuantityPicker item={item} />
        </View>
      );
    }
  };
  if (isListType) {
    return (
      <View style={[styles.item_row, {width: itemWidth}]}>
        <View
          style={{
            width: itemWidth,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={this.navigateToItemPage}>
            <Image
              style={styles.list_item_image}
              source={
                imageLoaded
                  ? {uri: item.thumbnail}
                  : {uri: 'https://i.picsum.photos/id/1/100/100.jpg'}
              }
              onError={this.displayFallBackImage}
            />
          </TouchableOpacity>
          <Text style={[styles.list_item_description]}>{props.item.name}</Text>
          <TouchableOpacity
            style={styles.list_heart}
            onPress={this.toggleHeart}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Icon
              name={favorite ? 'heart' : 'heart-o'}
              color={'tomato'}
              size={18}
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', width: itemWidth}}>
          <Text style={styles.list_item_price}>
            ${props.item.list.toFixed(2)}
          </Text>
          <Text style={styles.display_unit}>
            ${props.item.displayUnitPrice}
          </Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>{seeOptions()}</View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={[styles.item_row, {width: itemWidth}]}>
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
        <View style={{flexDirection: 'row', width: itemWidth}}>
          <Text style={styles.item_price}>${props.item.list.toFixed(2)}</Text>
          <Text style={styles.display_unit}>
            ${props.item.displayUnitPrice}
          </Text>
        </View>
        <Text style={[styles.item_description, {width: itemWidth}]}>
          {props.item.name}
        </Text>
        {seeOptions()}
      </View>
    );
  }
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
  list_item_image: {
    width: 72,
    height: 72,
    marginTop: 8,
    marginHorizontal: 8,
    justifyContent: 'center',
  },
  heart: {
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  list_heart: {
    alignSelf: 'flex-start',
    margin: 12,
  },
  item_price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 8,
    marginVertical: 4,
  },
  list_item_price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 12,
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
  list_item_description: {
    flex: 1,
    fontSize: 12,
    marginHorizontal: 8,
    marginTop: 20,
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
  options_text: {
    fontSize: 14,
    color: '#444',
    textDecorationLine: 'underline',
  },
});
