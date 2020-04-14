import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {QuantityPicker} from '../components/item_tile/QuantityPicker';
import server from '../conf/server';

const Screen = Dimensions.get('window');

const ItemPageScreen = ({route}) => {
  const item = route.params.item;
  const [isLoading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(item.favorite);
  const [data, setData] = useState({});

  // fetch /item_detail/:item_id data
  useEffect(() => {
    fetch(`${server.domain}/item_detail/${item.USItemId}`)
      .then(response => response.json())
      .then(json => setData(json.item_detail))
      .catch(error => console.log(error + ' (ItemPage: /item_detail/:item_id)'))
      .finally(() => setLoading(false));
  }, [isLoading]);

  toggleHeart = () => {
    setFavorite(!favorite);
  };

  // Tab structure
  const DetailsRoute = () => (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#eee',
        padding: 12,
        marginBottom: 50,
      }}>
      <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 8}}>
        Ingredients
      </Text>
      <Text style={{fontSize: 12, color: '#444'}}>{data.ingredients}</Text>
    </View>
  );
  const NutritionRoute = () => (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#eee',
        padding: 12,
        marginBottom: 50,
      }}>
      <Text style={{fontSize: 12, color: '#444'}}>{data.description}</Text>
    </View>
  );
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'details', title: 'Details'},
    {key: 'nutrition', title: 'Nutrition'},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      getLabelText={({route}) => route.title}
      tabStyle={{flex: 1, alignItems: 'center'}}
      labelStyle={{fontSize: 14, color: '#000'}}
      indicatorStyle={{backgroundColor: 'tomato'}}
      style={{backgroundColor: 'white'}}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Icon
            name={favorite ? 'heart' : 'heart-o'}
            color={'tomato'}
            size={36}
            style={styles.heart}
            onPress={this.toggleHeart}
          />
        </View>
        <View>
          <Text
            style={{fontSize: 18, alignSelf: 'center', marginHorizontal: 8}}>
            {data.name}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image style={styles.item_image} source={{uri: data.large}} />
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginTop: 8,
            }}>
            ${item.list.toFixed(2)}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#888',
              alignSelf: 'center',
              marginTop: 4,
            }}>
            {data.displayUnitPrice}
          </Text>
        </View>
        <View>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{index, routes}}
            onIndexChange={setIndex}
            renderScene={SceneMap({
              details: DetailsRoute,
              nutrition: NutritionRoute,
            })}
          />
        </View>
      </ScrollView>
      <View style={styles.quantity_picker}>
        <QuantityPicker quantity={0} item={item} />
      </View>
    </SafeAreaView>
  );
};

export default ItemPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  item_image: {
    width: 224,
    height: 224,
    marginTop: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  heart: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 4,
    marginRight: 12,
  },
  item_description: {
    fontSize: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    justifyContent: 'center',
  },
  item_picker: {
    marginHorizontal: 8,
    alignSelf: 'center',
  },
  item_text: {
    fontSize: 14,
  },
  quantity_picker: {
    position: 'absolute',
    width: Screen.width,
    backgroundColor: '#fff',
    bottom: 0,
    paddingRight: 18,
    paddingTop: 8,
    paddingBottom: 12,
    alignItems: 'flex-end',
  },
});
