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
import {createDrawerNavigator} from '@react-navigation/drawer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ItemTile} from '../components/item_tile/ItemTile.js';
import SortFilterScreen from './SortFilterScreen';
import QuickLookModal from '../components/item_page/QuickLookModal';

/*
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
*/

const INITIAL_LOAD = 25;
const PAGE_SIZE = 25;
const SortDrawer = createDrawerNavigator();
const LeftNavDrawer = createDrawerNavigator();

/*
export function SearchScreen() {
  return (
    <LeftNavDrawer.Navigator
      initialRouteName="RightDrawer"
      drawerPosition="left"
      drawerType="back">
      <LeftNavDrawer.Screen name="SearchBase" component={SearchBaseScreen} />
      <LeftNavDrawer.Screen
        name="SortAndFilter"
        component={SortFilterDrawerScreen}
      />
    </LeftNavDrawer.Navigator>
  );
}
*/

export function SearchScreen(props) {
  return (
    <LeftNavDrawer.Navigator
      initialRouteName="RightDrawer"
      drawerPosition="left"
      drawerType="back">
      <LeftNavDrawer.Screen
        name="SortAndFilterDrawer"
        component={SortFilterDrawerScreen}
        {...props}
      />
    </LeftNavDrawer.Navigator>
  );
}

function SortFilterDrawerScreen() {
  return (
    <SortDrawer.Navigator
      drawerPosition={'right'}
      drawerContent={() => <SortFilterScreen />}>
      <SortDrawer.Screen name="SearchBase" component={SearchBaseScreen} />
      <SortDrawer.Screen name="SortAndFilter" component={SortFilterScreen} />
    </SortDrawer.Navigator>
  );
}

export function SearchBaseScreen(props) {
  /**
   * Right now, I'm mandating that whatever this method is accepts as a
   * parameter an object containing the objects `lastIndex` and `lastObject`
   * respectively. I believe this should suffice for effective paging.
   *
   * @param lastIndex
   * @returns {Promise<R>}
   */
  /*
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
                name: randWords,
                thumbnail:
                  'https://i.picsum.photos/id/' + randInt + '/100/100.jpg',
                favorite: isHearted,
                width: Dimensions.get('window').width * 0.45,
                hasVariants: n % 2 == 0,
              };
            },
          ),
        ]);
      }, 400);
    });
  };
  */

  /*
  const [data, isFetching, setIsFetching] = useInfiniteScroll(
    fetchMoreListItems,
  );
  */

  const navigation = props.navigation;
  // let searchKwds =
  //   props.route && props.route.params ? props.route.params.searchKwds : '';
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const searchKwds = useSelector((state) => {
    return state.searchKwds;
  });

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8080/items/search?kwd=' + searchKwds)
      .then((response) => response.json())
      .then((json) => setData(json.items))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [searchKwds]);

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

  const toggleDrawer = () => {
    navigation.toggleDrawer();
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
      {data.length > 0 && (
        <View style={styles.blueBox}>
          <Text style={styles.bigWhiteBoldText}>
            {`${data.length} Items Loaded`}
          </Text>
          <TouchableOpacity onPress={toggleDrawer}>
            <Text>Sort & Filter</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Show big gray search icon if no search results */}
      {data.length <= 0 && (
        <View style={styles.search_icon_container}>
          <Icon name={'search'} size={150} color={'#ddd'} />
          <Text style={styles.search_icon_text}>No search results</Text>
        </View>
      )}
      <FlatList
        onEndReachedThreshold={3}
        numColumns={2}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return (
            <ItemTile item={item} showQuickLookModal={showQuickLookModal} />
          );
        }}
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
}

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
  search_icon_container: {
    height: Dimensions.get('window').height * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search_icon_text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ddd',
  },
});
