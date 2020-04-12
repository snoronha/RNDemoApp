import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {ItemTile} from '../components/item_tile/ItemTile.js';
import server from '../conf/server';

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  // fetch /home data
  useEffect(() => {
    fetch(`${server.domain}/home`)
      .then(response => response.json())
      .then(json => setData(json.carousels))
      .catch(error => console.log(error + ' (HomePage: getHome)'))
      .finally(() => setLoading(false));
  }, [isLoading]);

  // Preload favorites
  useEffect(() => {
    fetch(`${server.domain}/favorites/1`)
      .then(response => response.json())
      .then(json => {
        let favs = [];
        if (json.favorites && json.favorites.length > 0) {
          let deptFavs = json.favorites;
          deptFavs.forEach(dept => {
            dept.items.forEach(item => {
              favs.push(item);
            });
          });
        }
        dispatch({type: 'SET_FAVORITES', payload: {favorites: favs}});
      })
      .catch(error => console.log(error + ' (HomePage: getFavorites)'))
      .finally(() => setLoading(false));
  }, [isLoading]);

  // Load Cart
  let orderId = 1; // Needs to be populated
  let userId = 1; // Needs to be populated
  useEffect(() => {
    fetch(`${server.domain}/order/${orderId}/user/${userId}`)
      .then(response => response.json())
      .then(json => {
        let cart = json.order;
        dispatch({type: 'SET_CART', payload: {cart: cart}});
      })
      .catch(error => console.log(error + ' (HomePage: getCart)'))
      .finally(() => setLoading(false));
  }, [isLoading]);

  const itemWidth = (width = Dimensions.get('window').width * 0.4);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          style={styles.banner_image}
          source={{
            uri:
              'https://s.yimg.com/ny/api/res/1.2/mdknwWiRXB9ISzYWSMqIbg--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/https://media.zenfs.com/en-US/scary_mommy_602/681ccac5b578857a330cde82ea2f08e7',
          }}
        />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>
            {data.map((carousel, carouselIndex) => (
              <View style={{flex: 1}} key={carouselIndex}>
                <Text style={styles.carouselTitle}>{carousel.title}</Text>
                <FlatList
                  horizontal={true}
                  data={carousel.items}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => {
                    return <ItemTile item={item} width={itemWidth} />;
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#fff',
  },
  banner_image: {
    alignSelf: 'center',
    margin: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.25,
  },
  carouselTitle: {
    marginTop: 8,
    marginLeft: 12,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
  },
  blueBox: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigWhiteBoldText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
