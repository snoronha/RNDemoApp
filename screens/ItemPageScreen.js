import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {QuantityPicker} from '../components/ItemTile';

const ItemPageScreen = ({route}) => {
  const item = route.params.item;
  const [favorite, setFavorite] = useState(item.favorite);

  toggleHeart = () => {
    setFavorite(!favorite);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: Dimensions.get('window').width,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image style={styles.item_image} source={{uri: item.image_url}} />
        <Icon
          name={favorite ? 'heart' : 'heart-o'}
          color={'tomato'}
          size={36}
          style={styles.heart}
          onPress={this.toggleHeart}
        />
      </View>
      <Text style={[styles.item_description]}>{item.description}</Text>
      <View
        style={{
          width: Dimensions.get('window').width,
          height: 60,
        }}>
        <QuantityPicker quantity={0} item={item} />
      </View>
    </SafeAreaView>
  );
};

export default ItemPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  item_image: {
    width: 224,
    height: 224,
    marginTop: 30,
    marginHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  heart: {
    alignSelf: 'flex-start',
    marginTop: 30,
  },
  item_description: {
    fontSize: 16,
    marginHorizontal: 16,
    marginVertical: 16,
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
  quantity_picker: {
    alignSelf: 'center',
  },
});
