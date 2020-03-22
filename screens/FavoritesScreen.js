import React from 'react';
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
import {ItemTile} from '../components/ItemTile.js';

const FavoritesScreen = () => {
  /**
   * Right now, I'm mandating that whatever this method is accepts as a
   * parameter an object containing the objects `lastIndex` and `lastObject`
   * respectively. I believe this should suffice for effective paging.
   *
   * @param lastIndex
   * @returns {Promise<R>}
   */
  var FAVDATA = [];
  const departmentTitles = [
    'Fruits & Vegetables',
    'Snacks & Candy',
    'Household Essentials',
    'Beverages',
    'Meat',
    'Frozen',
    'Eggs & Dairy',
    'Pantry',
    'Beauty & Personal Care',
    'Pets',
    'School Lunch Bix Essentials',
    'Health & Nutrition',
    'Party Supplies & Crafts',
    'Sports & Outdoor',
    'Baby',
    'Bread & Bakery',
    'Deli',
    'Garden & Tools',
    'Groceries & Household Essentials',
    'Organic Shop',
    'More',
  ];

  // Populate Favorites data here
  var keyCount = 1;
  const getFavoritesData = () => {
    FAVDATA = [];
    for (var i = 0; i < departmentTitles.length; i++) {
      // Populate each department with a FlatList
      var departmentData = [];
      var randCount = 1 + Math.floor(Math.random() * 5);
      for (var j = 0; j < randCount; j++) {
        var randInt = 1 + Math.floor(Math.random() * 1000);
        var image_url =
          'https://i.picsum.photos/id/' + randInt + '/100/100.jpg';
        var key = keyCount.toString();
        var randDescr =
          randomWords({min: 5, max: 10, join: ' '}) + ` (id: ${key})`;
        var width = Dimensions.get('window').width * 0.4;
        const item = {
          id: key,
          favorite: true,
          image_url: image_url,
          description: randDescr,
          width: width,
        };
        departmentData.push(item);
        keyCount++;
      }
      FAVDATA.push({
        title: departmentTitles[i],
        data: departmentData,
      });
    }
  };

  getFavoritesData();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        {FAVDATA.map((department, departmentIndex) => (
          <View key={departmentIndex}>
            <View style={styles.blueBox}>
              <Text style={styles.bigWhiteBoldText}>
                {`${department.title} (${department.data.length})`}
              </Text>
            </View>
            <FlatList
              onEndReachedThreshold={10}
              numColumns={2}
              onEndReached={() => {
                // if (!isFetching) {
                // setIsFetching(true);
                // }
              }}
              data={department.data}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return <ItemTile item={item} />;
              }}
            />
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
  blueBox: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 8,
  },
  bigWhiteBoldText: {
    color: '#444',
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

export default FavoritesScreen;
