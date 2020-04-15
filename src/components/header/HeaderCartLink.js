import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export function HeaderCartLink() {
  const navigation = useNavigation();
  goToCart = () => {
    navigation.navigate('Cart');
  };

  const cartCount = useSelector(state => {
    var count = 0;
    for (var idx in state.cart) {
      count += state.cart[idx].qty;
    }
    return count;
  });

  return (
    <View>
      <View style={styles.cart_badge_container}>
        <Text style={styles.cart_badge}>{cartCount}</Text>
      </View>
      <TouchableOpacity
        style={styles.cart}
        hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
        onPress={this.goToCart}>
        <Icon name={'shopping-cart'} size={30} color={'#888'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cart: {
    alignSelf: 'center',
    marginRight: 12,
    zIndex: 0,
  },
  cart_badge_container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: -6,
    right: 4,
    zIndex: 1,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#f00',
  },
  cart_badge: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ff0',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
