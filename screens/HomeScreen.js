import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import randomWords from 'random-words';
import {ItemTile} from '../components/item_tile/ItemTile.js';

const HomeScreen = () => {
  var HPDATA = [];
  const NUM_CAROUSELS = 10;
  const MAX_ITEMS_PER_CAROUSEL = 8;
  const carouselTitles = [
    'Featured Items',
    'Reorder Your Essentials',
    'Healthy Snacking',
    'Easy Cleanup',
    'Allergy Relief',
    'Recommended for You',
    'Fresh Fruit',
    'Beef',
    'Nuts & Dried Fruit',
    'Frozen Meat & Seafood',
  ];

  // Quick Look Item Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState({});
  const showQuickLookModal = itemHash => {
    setModalItem(itemHash.item);
    setModalVisible(true);
  };
  const hideQuickLookModal = () => {
    setModalVisible(false);
  };

  // Populate HomePage data here
  var keyCount = 1;
  const getHomePageData = () => {
    HPDATA = [];
    for (var i = 0; i < NUM_CAROUSELS; i++) {
      // Populate each carousel
      var carouselData = [];
      for (var j = 0; j < MAX_ITEMS_PER_CAROUSEL; j++) {
        var randInt = 1 + Math.floor(Math.random() * 1000);
        var isHearted = Math.floor(Math.random() * 5) == 0;
        var image_url =
          'https://i.picsum.photos/id/' + randInt + '/100/100.jpg';
        var key = keyCount.toString();
        var randDescr =
          randomWords({min: 5, max: 10, join: ' '}) + ` (id: ${key})`;
        var width = Dimensions.get('window').width * 0.4;
        const item = (
          <ItemTile
            item={{
              id: key,
              favorite: isHearted,
              image_url: image_url,
              description: randDescr,
              width: width,
            }}
            key={key}
            showQuickLookModal={showQuickLookModal}
          />
        );
        carouselData.push(item);
        keyCount++;
      }
      HPDATA.push({
        carouselTitle: carouselTitles[i],
        carouselData: carouselData,
      });
    }
  };

  getHomePageData();

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
        {HPDATA.map((carousel, carouselIndex) => (
          <View key={carouselIndex}>
            <Text style={styles.carouselTitle}>{carousel.carouselTitle}</Text>
            <ScrollView horizontal>{carousel.carouselData}</ScrollView>
          </View>
        ))}
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
    height: Dimensions.get('window').height * 0.3,
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
