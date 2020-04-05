import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import randomWords from 'random-words';
import {ItemTile} from '../components/item_tile/ItemTile.js';

const FavoritesScreen = () => {
  // Populate Favorites data here
  /*
  var keyCount = 1;
  const getFavoritesData = () => {
    FAVDATA = [];
    for (var i = 0; i < departmentTitles.length; i++) {
      // Populate each department with a FlatList
      var departmentData = [];
      var randCount = 1 + Math.floor(Math.random() * 10);
      for (var j = 0; j < randCount; j++) {
        var randInt = 1 + Math.floor(Math.random() * 1000);
        var image_url =
          'https://i.picsum.photos/id/' + randInt + '/100/100.jpg';
        var key = keyCount.toString();
        var randDescr =
          randomWords({min: 5, max: 10, join: ' '}) + ` (id: ${key})`;
        var width = Dimensions.get('window').width * 0.4;
        const item = {
          id: '' + key,
          favorite: true,
          thumbnail: image_url,
          name: randDescr,
          width: width,
          quantity: 0,
          hasVariants: false,
        };
        departmentData.push(item);
        keyCount++;
      }
      FAVDATA.push({
        id: i + 1,
        title: departmentTitles[i],
        data: departmentData,
      });
    }
  };
  */

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/favorites/1')
      .then((response) => response.json())
      .then((json) => setData(json.favorites))
      .catch((error) => console.error(error))
      .finally(() => {
        // console.log('3333 isLoading: ', isLoading);
        setLoading(false);
      });
  }, [isLoading]);

  // For Quick Look Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState({});
  const showQuickLookModal = (itemHash) => {
    setModalItem(itemHash.item);
    setModalVisible(true);
  };
  const hideQuickLookModal = () => {
    setModalVisible(false);
  };

  // getFavoritesData();

  const Department = (departmentHash) => {
    var deptKey = 'D' + (1 + Math.floor(Math.random() * 1000));
    const department = departmentHash.department;
    return (
      <FlatList
        numColumns={2}
        data={department}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return (
            <ItemTile item={item} showQuickLookModal={showQuickLookModal} />
          );
        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <QuickLookModal
        visible={modalVisible}
        props={{
          item: modalItem,
          hideQuickLookModal: hideQuickLookModal,
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={true}
        numColumns={1}
        data={data}
        keyExtractor={(item) => item.title}
        renderItem={({item}) => (
          <View key={item.title}>
            <Text
              style={[styles.bigWhiteBoldText, {marginLeft: 8, marginTop: 8}]}>
              {item.title} ({item.items.length})
            </Text>
            <Department department={item.items} />
          </View>
        )}></FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#fff',
  },
  blueBox: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 8,
  },
  bigWhiteBoldText: {
    color: '#444',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 12,
    color: '#007AFF',
  },
  subView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 50,
    opacity: 0.5,
    height: Dimensions.get('window').height - 50,
    backgroundColor: '#faa',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 20,
  },
});

export default FavoritesScreen;
