import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import {QuantityPicker} from '../components/item_tile/QuantityPicker';
import server from '../conf/server';

const Screen = Dimensions.get('window');

const ItemPageScreen = ({navigation, route}) => {
  const item = route.params.item;
  const [isLoading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(item.favorite);
  const [data, setData] = useState({});
  // navigation.setOptions({tabBarVisible: false});

  // fetch /item_detail/:item_id data
  useEffect(() => {
    fetch(`${server.domain}/item_detail/${item.USItemId}`)
      .then(response => response.json())
      .then(json => {
        let nutritionFacts = JSON.parse(json.item_detail.nutritionFacts);
        json.item_detail.nutritionFacts = nutritionFacts;
        // console.log(nutritionFacts);
        setData(json.item_detail);
      })
      .catch(error => console.log(error + ' (ItemPage: /item_detail/:item_id)'))
      .finally(() => setLoading(false));
  }, [isLoading]);

  toggleHeart = () => {
    setFavorite(!favorite);
  };

  const toTitleCase = str => {
    let result = str.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
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
      <Text style={{fontSize: 12, color: '#444', marginBottom: 8}}>
        {data.ingredients}
      </Text>
      <View style={{height: 1, backgroundColor: '#aaa', marginBottom: 12}} />
      <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 8}}>
        Product features
      </Text>
      <Text style={{fontSize: 11, color: '#444'}}>{data.description}</Text>
    </View>
  );
  const NutritionRoute = () => {
    // console.log('NutFacts: ', data.nutritionFacts);
    let nFacts = data.nutritionFacts;
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: '#eee',
          padding: 12,
          marginBottom: 50,
        }}>
        <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 10}}>
          Nutrition Facts
        </Text>
        {nFacts &&
          nFacts.servingInformation &&
          nFacts.servingInformation.servingsPerContainer && (
            <Text style={{fontSize: 12, color: '#888', marginBottom: 8}}>
              {nFacts.servingInformation.servingsPerContainer} servings per
              container
            </Text>
          )}
        {nFacts &&
          nFacts.servingInformation &&
          nFacts.servingInformation.servingSize && (
            <View style={{flexDirection: 'row', marginBottom: 4}}>
              <Text style={{flex: 1, fontSize: 12, fontWeight: 'bold'}}>
                Serving Size
              </Text>
              <Text style={{fontSize: 12, color: '#888'}}>
                {nFacts.servingInformation.servingSize}
              </Text>
            </View>
          )}
        <View style={{height: 8, backgroundColor: '#000'}} />
        <Text
          style={{fontSize: 12, color: '#444', marginTop: 4, marginBottom: 4}}>
          Amount per serving
        </Text>
        {nFacts &&
          nFacts.calorieInformation &&
          nFacts.calorieInformation.caloriesPerServing && (
            <View style={{flexDirection: 'row', marginBottom: 4, marginTop: 8}}>
              <Text style={{flex: 1, fontSize: 18, fontWeight: 'bold'}}>
                Calories
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {nFacts.calorieInformation.caloriesPerServing}
              </Text>
            </View>
          )}
        <View style={{height: 4, backgroundColor: '#000'}} />
        <View style={{flexDirection: 'row', marginBottom: 4, marginTop: 6}}>
          <Text style={{flex: 1}} />
          <Text style={{fontSize: 11}}>% Daily Value*</Text>
        </View>
        <View style={{height: 1, backgroundColor: '#aaa'}} />

        {nFacts &&
          nFacts.keyNutrients &&
          nFacts.keyNutrients.map((keyNutrient, idx) => (
            <View key={idx.toString()}>
              <View
                style={{flexDirection: 'row', marginBottom: 4, marginTop: 6}}>
                <Text style={{flex: 1, fontSize: 11}}>
                  {toTitleCase(keyNutrient.name)} {keyNutrient.amountPerServing}
                </Text>
                {keyNutrient.dailyValue && (
                  <Text style={{fontSize: 11}}>{keyNutrient.dailyValue}%</Text>
                )}
              </View>
              <View style={{height: 1, backgroundColor: '#aaa'}} />
            </View>
          ))}
        <View style={{height: 4, backgroundColor: '#000'}} />

        {nFacts &&
          nFacts.vitaminsAndMinerals &&
          nFacts.vitaminsAndMinerals.map((vitmin, idx) => (
            <View key={idx.toString()}>
              <View
                style={{flexDirection: 'row', marginBottom: 4, marginTop: 6}}>
                <Text style={{flex: 1, fontSize: 11}}>
                  {toTitleCase(vitmin.name.replace('Dvp', ''))}
                </Text>
                {vitmin.dailyValue && (
                  <Text style={{fontSize: 11}}>{vitmin.dailyValue}%</Text>
                )}
              </View>
              <View style={{height: 1, backgroundColor: '#aaa'}} />
            </View>
          ))}

        <View style={{height: 8, backgroundColor: '#000'}} />
      </View>
    );
  };
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
        {data.large && (
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image style={styles.item_image} source={{uri: data.large}} />
          </View>
        )}
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
