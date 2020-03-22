import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const CartScreen = ({route}) => {
  console.log('ROUTE: ', route);
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.item_row, {width: 150}]}>
        {/*}
        <View
          style={{
            width: props.item.width,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={this.navigateToItemPage}>
            <Image style={styles.item_image} source={{uri: item.image_url}} />
          </TouchableOpacity>
          <Icon
            name={favorite ? 'heart' : 'heart-o'}
            color={'tomato'}
            size={18}
            style={styles.heart}
            onPress={this.toggleHeart}
          />
        </View>
        <Text style={[styles.item_description, {width: item.width}]}>
          {props.item.description}
        </Text>
        <QuantityPicker quantity={0} item={item} />
        */}
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
});
