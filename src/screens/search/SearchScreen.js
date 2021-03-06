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
import LinearGradient from 'react-native-linear-gradient';

import {ItemTile} from '../../components/item_tile/ItemTile';
import SortFilterScreen from '../SortFilterScreen';
import {QuickLook} from '../../components/item_page/QuickLook';
import {SearchNotFoundAnimation} from './SearchNotFoundAnimation';
import server from '../../conf/server';

const SortDrawer = createDrawerNavigator();
// const LeftNavDrawer = createDrawerNavigator();

/*
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
*/

export function SearchScreen() {
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
  const navigation = props.navigation;
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [grid, setGrid] = useState(true);
  const Screen = Dimensions.get('window');

  const searchKwds = useSelector(state => {
    return state.searchKwds;
  });

  useEffect(() => {
    setLoading(true);
    fetch(`${server.domain}/items/search?kwd=${searchKwds}`)
      .then(response => response.json())
      .then(json => setData(json.items))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [searchKwds]);

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

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const toggleGridDisplay = () => {
    setGrid(!grid);
  };

  return (
    <SafeAreaView style={styles.container}>
      {showQuickLook && (
        <QuickLook props={{hideQuickLook: hideQuickLook, item: modalItem}} />
      )}
      {data.length > 0 && (
        <View style={styles.blueBox}>
          <Text style={styles.bigWhiteBoldText}>
            {`${data.length} Items Loaded`}
          </Text>
          <TouchableOpacity onPress={toggleGridDisplay}>
            {grid && <Icon name={'list'} size={16} color={'gray'} />}
            {!grid && <Icon name={'th'} size={16} color={'gray'} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleDrawer}>
            <Text>Sort & Filter</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Show big gray search icon if no search results */}
      {data.length <= 0 && (
        <View style={styles.search_icon_container}>
          <View
            style={{
              height: Screen.height * 0.5,
              width: Screen.width * 0.8,
            }}>
            <SearchNotFoundAnimation searchKwds={searchKwds} />
          </View>
          {searchKwds.length > 0 && (
            <>
              <Text style={styles.search_icon_text}>No search results for</Text>
              <Text style={styles.search_icon_text}>"{searchKwds}"</Text>
            </>
          )}
          {searchKwds.length <= 0 && (
            <Text style={styles.search_icon_text}>
              Please enter a search term
            </Text>
          )}
        </View>
      )}
      <View style={{zIndex: 1, marginBottom: 50}}>
        {grid && (
          <FlatList
            onEndReachedThreshold={3}
            numColumns={2}
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              return (
                <ItemTile
                  item={item}
                  tileType={'grid'}
                  showQuickLookModal={showQuickLookModal}
                />
              );
            }}
          />
        )}
        {!grid && (
          <FlatList
            onEndReachedThreshold={3}
            numColumns={1}
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              return (
                <ItemTile
                  item={item}
                  tileType={'list'}
                  showQuickLookModal={showQuickLookModal}
                />
              );
            }}
          />
        )}
      </View>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search_icon_text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
  },
});
