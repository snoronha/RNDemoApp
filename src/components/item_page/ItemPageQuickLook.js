import React, {useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {QuantityPicker} from '../item_tile/QuantityPicker';

const ItemPageQuickLook = ({props}) => {
  const item = props && props.item ? props.item : {};
  const [favorite, setFavorite] = useState(item.favorite);

  toggleHeart = () => {
    setFavorite(!favorite);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: Dimensions.get('window').width,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image style={styles.item_image} source={{uri: item.thumbnail}} />
        <Icon
          name={favorite ? 'heart' : 'heart-o'}
          color={'tomato'}
          size={36}
          style={styles.heart}
          onPress={this.toggleHeart}
        />
      </View>
      <Text style={[styles.item_description]}>{item.description}</Text>
      <View style={styles.quantity_picker}>
        <QuantityPicker quantity={0} item={item} />
      </View>
    </View>
  );
};

export default ItemPageQuickLook;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    backgroundColor: '#fff',
  },
  item_image: {
    width: 224,
    height: 224,
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  heart: {
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  item_description: {
    fontSize: 16,
    marginHorizontal: 16,
    marginVertical: 16,
    justifyContent: 'center',
  },
  item_picker: {
    marginHorizontal: 8,
    alignSelf: 'center',
  },
  item_text: {
    fontSize: 14,
  },
  quantity_picker: {
    alignSelf: 'center',
  },
});
