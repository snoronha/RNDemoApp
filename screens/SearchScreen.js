import React, {useState, useEffect} from 'react';
import {
  Button,
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import randomWords from 'random-words';
import {ItemTile} from '../components/item_tile/ItemTile.js';
import SortFilterScreen from './SortFilterScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';

const useInfiniteScroll = load => {
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    let didCancel = false;
    if (!isFetching) return;

    const loadAsync = async () => {
      const lastIndex = data.length;
      const lastItem = data.length ? data[lastIndex] : null;

      const newData = await load({lastIndex, lastItem});
      if (!didCancel) {
        setData(prevState => [...prevState, ...newData]);
        setIsFetching(false);
      }
    };

    loadAsync();

    return () => {
      didCancel = true;
    };
  }, [isFetching]);

  return [data, isFetching, setIsFetching];
};

const INITIAL_LOAD = 25;
const PAGE_SIZE = 25;
const Drawer = createDrawerNavigator();

export default SearchWithSortFilter = () => {
  return (
    <Drawer.Navigator
      drawerPosition={'right'}
      drawerContent={() => <SortFilterScreen />}>
      <Drawer.Screen name="Search" component={SearchScreen} />
      <Drawer.Screen name="Sort & Filter" component={SortFilterScreen} />
    </Drawer.Navigator>
  );
};

const SearchScreen = () => {
  /**
   * Right now, I'm mandating that whatever this method is accepts as a
   * parameter an object containing the objects `lastIndex` and `lastObject`
   * respectively. I believe this should suffice for effective paging.
   *
   * @param lastIndex
   * @returns {Promise<R>}
   */
  const fetchMoreListItems = ({lastIndex}) => {
    // Simulate fetch of next 25 items (25 if initial load)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          ...Array.from(
            Array(lastIndex === 0 ? INITIAL_LOAD : PAGE_SIZE).keys(),
            n => {
              n = n + lastIndex;
              var randInt = 1 + Math.floor(Math.random() * 1000);
              var isHearted = Math.floor(Math.random() * 5) == 0;
              var randWords =
                randomWords({min: 5, max: 10, join: ' '}) + ` (id: ${n})`;
              return {
                number: n.toString(),
                id: n.toString(),
                description: randWords,
                image_url:
                  'https://i.picsum.photos/id/' + randInt + '/100/100.jpg',
                favorite: isHearted,
                width: Dimensions.get('window').width * 0.45,
                quantity: 0,
              };
            },
          ),
        ]);
      }, 400);
    });
  };

  const [data, isFetching, setIsFetching] = useInfiniteScroll(
    fetchMoreListItems,
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.blueBox}>
        <Text style={styles.bigWhiteBoldText}>
          {`${data.length} Items Loaded`}
        </Text>
        <TouchableOpacity>
          <Text>Sort & Filter</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        onEndReachedThreshold={3}
        numColumns={2}
        onEndReached={() => {
          if (!isFetching) {
            setIsFetching(true);
          }
        }}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return <ItemTile item={item} />;
        }}
      />
      {isFetching && (
        <ActivityIndicator
          size="large"
          color="#444"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
          }}
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
    margin: 8,
    justifyContent: 'space-between',
  },
  bigWhiteBoldText: {
    color: '#aaa',
    fontSize: 14,
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
