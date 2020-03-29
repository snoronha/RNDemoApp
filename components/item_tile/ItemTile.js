import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

import {QuantityPicker} from './QuantityPicker';

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
                ? {uri: props.item.image_url}
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
                ? {uri: props.item.image_url}
                : {uri: 'https://i.picsum.photos/id/1/100/100.jpg'}
            }
            onError={this.displayFallBackImage}
          />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={[styles.item_row, {width: props.item.width}]}>
      <View
        style={{
          width: props.item.width,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {modalOrScreen()}
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
});
