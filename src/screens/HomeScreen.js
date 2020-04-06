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

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  // fetch /home data
  useEffect(() => {
    fetch('http://localhost:8080/home')
      .then((response) => response.json())
      .then((json) => setData(json.carousels))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [isLoading]);

  // Preload favorites
  useEffect(() => {
    fetch('http://localhost:8080/favorites/1')
      .then((response) => response.json())
      .then((json) => {
        let deptFavs = json.favorites;
        let favs = [];
        deptFavs.forEach((dept) => {
          dept.items.forEach((item) => {
            favs.push(item);
          });
        });
        dispatch({type: 'SET_FAVORITES', payload: {favorites: favs}});
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [isLoading]);

  // Load Cart
  let orderId = 1; // Needs to be populated
  let userId = 1; // Needs to be populated
  useEffect(() => {
    fetch(`http://localhost:8080/order/${orderId}/user/${userId}`)
      .then((response) => response.json())
      .then((json) => {
        let cart = json.order;
        dispatch({type: 'SET_CART', payload: {cart: cart}});
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [isLoading]);

  // Quick Look Item Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState({});
  const showQuickLookModal = (itemHash) => {
    setModalItem(itemHash.item);
    setModalVisible(true);
  };
  const hideQuickLookModal = () => {
    setModalVisible(false);
  };

  const itemWidth = (width = Dimensions.get('window').width * 0.4);

  return (
    <SafeAreaView style={styles.container}>
      <QuickLookModal
        visible={modalVisible}
        props={{
          item: modalItem,
          hideQuickLookModal: hideQuickLookModal,
        }}
      />
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
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({item}) => {
                    return (
                      <ItemTile
                        item={item}
                        width={itemWidth}
                        showQuickLookModal={showQuickLookModal}
                      />
                    );
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
