import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {ItemTile} from '../../components/item_tile/ItemTile';
import {QuickLook} from '../../components/item_page/QuickLook.js';
import server from '../../conf/server';

const FavoritesScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // For Quick Look
  const [showQuickLook, setQuickLook] = useState(false);
  const [modalItem, setModalItem] = useState({});
  const showQuickLookModal = itemHash => {
    setModalItem(itemHash.item);
    setQuickLook(true);
  };
  const hideQuickLook = () => {
    setQuickLook(false);
  };

  useEffect(() => {
    fetch(`${server.domain}/favorites/1`)
      .then(response => response.json())
      .then(json => setData(json.favorites))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [isLoading]);

  // Listen for redux changes to favs
  useSelector(state => {
    let favCount = 0;
    if (data && data.length > 0) {
      data.forEach(dept => {
        dept.items.forEach(item => {
          favCount++;
        });
      });
      if (favCount > 0 && favCount != state.favorites.length) {
        // Update favorites from API
        fetch(`${server.domain}/favorites/1`)
          .then(response => response.json())
          .then(json => setData(json.favorites))
          .catch(error => console.log(error))
          .finally(() => setLoading(false));
      }
    }
  });

  const Department = departmentHash => {
    const department = departmentHash.department;
    return (
      <FlatList
        numColumns={2}
        data={department}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return <ItemTile item={item} />;
        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {showQuickLook && (
        <QuickLook props={{hideQuickLook: hideQuickLook, item: modalItem}} />
      )}
      <FlatList
        showsVerticalScrollIndicator={true}
        numColumns={1}
        data={data}
        keyExtractor={item => item.title}
        renderItem={({item}) => (
          <View key={item.title}>
            <Text
              style={[styles.bigWhiteBoldText, {marginLeft: 8, marginTop: 8}]}>
              {item.title} ({item.items.length})
            </Text>
            <Department department={item.items} />
          </View>
        )}
      />
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#444"
          style={styles.activity_indicator}
        />
      )}
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
  activity_indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
});

export default FavoritesScreen;
