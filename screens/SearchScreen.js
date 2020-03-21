import React, {PureComponent, useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import randomWords from 'random-words';
import {ItemTile} from '../components/ItemTile.js';

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
var isHidden = true;

class SortFilterFlyout extends PureComponent {
  state = {
    bounceValue: new Animated.Value(400), // This is the initial position of the subview
    buttonText: 'Sort & Filter',
  };

  _toggleSubview() {
    this.setState({
      buttonText: !isHidden ? 'Sort & Filter' : 'Hide Sort',
    });

    var toValue = 400;

    if (isHidden) {
      toValue = 0;
    }

    // This will animate the transalteY of the subview between 0 & 100 depending on its current state
    // 100 comes from the style below, which is the height of the subview.
    Animated.spring(this.state.bounceValue, {
      toValue: toValue,
      velocity: 5,
      tension: 2,
      friction: 5,
    }).start();

    isHidden = !isHidden;
  }

  render() {
    return (
      <View style={{right: 8, top: 40, height: 30, zIndex: 1}}>
        <TouchableHighlight
          style={{alignSelf: 'flex-end'}}
          onPress={() => {
            this._toggleSubview();
          }}>
          <Text style={styles.buttonText}>{this.state.buttonText}</Text>
        </TouchableHighlight>
        <View style={styles.sort_filter_flyout}>
          <Animated.View
            style={[
              styles.subView,
              {transform: [{translateX: this.state.bounceValue}]},
            ]}></Animated.View>
        </View>
      </View>
    );
  }
}

const SearchScreen = ({navigation}) => {
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
                width: Dimensions.get('window').width * 0.5,
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

  onPressSortFilter = () => {
    console.log('Pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <SortFilterFlyout /> */}
      <View style={styles.blueBox}>
        <Text style={styles.bigWhiteBoldText}>
          {`${data.length} Items Loaded`}
        </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigWhiteBoldText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sort_filter_flyout: {
    position: 'absolute',
    top: 20,
    /* zIndex: 1, */
    left: Dimensions.get('window').width * 0.2,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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

export default SearchScreen;
