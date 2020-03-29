import React, {Component} from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import StoreFinderScreen from './screens/StoreFinderScreen';
import MoreScreen from './screens/MoreScreen';
import WebViewScreen from './screens/WebViewScreen';
import QuickLookScreen from './screens/SearchScreen';

import ItemPageScreen from './screens/ItemPageScreen';
import CartScreen from './screens/CartScreen';

import {HeaderBackLink} from './components/header/HeaderBackLink';
import {HeaderCartLink} from './components/header/HeaderCartLink';
import {HamburgerPlusScreen} from './components/header/HamburgerMenu';

//-------- REDUX ---------//
import {Provider} from 'react-redux';
import store from './stores/store';

// Hack to ensure FontAwesome loads
Icon.loadFont();

const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const FavoritesStack = createStackNavigator();
const MoreStack = createStackNavigator();
const StoreFinderStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = ({navigation}) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => {
            return <HamburgerMenu navigationProps={navigation} />;
          },
          headerRight: () => {
            return <HeaderCartLink />;
          },
          headerTitleAlign: 'center',
          headerTitle: 'Home',
        }}
      />
      <HomeStack.Screen
        name="ItemPage"
        component={ItemPageScreen}
        options={{
          headerLeft: () => {
            return <HeaderBackLink />;
          },
          headerRight: () => {
            return <HeaderCartLink />;
          },
          headerTitleAlign: 'center',
          headerTitle: 'Item Page',
        }}
      />
      <HomeStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerLeft: () => {
            return <HeaderBackLink />;
          },
          headerRight: () => {
            return <HeaderCartLink />;
          },
          headerTitleAlign: 'center',
          headerTitle: 'Cart',
        }}
      />
    </HomeStack.Navigator>
  );
};

const Search = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={QuickLookScreen}
        options={{
          headerLeft: () => {
            return <HeaderBackLink />;
          },
          headerRight: () => {
            return <HeaderCartLink />;
          },
          headerTitleAlign: 'center',
          headerTitle: 'Search',
        }}
      />
      <SearchStack.Screen
        name="ItemPage"
        component={ItemPageScreen}
        options={{
          headerLeft: () => {
            return <HeaderBackLink />;
          },
          headerRight: () => {
            return <HeaderCartLink />;
          },
          headerTitleAlign: 'center',
          headerTitle: 'Item Page',
        }}
      />
      <SearchStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerLeft: () => {
            return <HeaderBackLink />;
          },
          headerRight: () => {
            return <HeaderCartLink />;
          },
          headerTitleAlign: 'center',
          headerTitle: 'Item Page',
        }}
      />
    </SearchStack.Navigator>
  );
};

const Favorites = () => {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          headerLeft: () => {
            return <HeaderBackLink />;
          },
          headerRight: () => {
            return <HeaderCartLink />;
          },
          headerTitleAlign: 'center',
          headerTitle: 'Favorites',
        }}
      />
      <FavoritesStack.Screen
        name="ItemPage"
        component={ItemPageScreen}
        options={{
          headerLeft: () => {
            return <HeaderBackLink />;
          },
          headerRight: () => {
            return <HeaderCartLink />;
          },
          headerTitleAlign: 'center',
          headerTitle: 'Item Page',
        }}
      />
      <FavoritesStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerLeft: () => {
            return <HeaderBackLink />;
          },
          headerRight: () => {
            return <HeaderCartLink />;
          },
          headerTitleAlign: 'center',
          headerTitle: 'Item Page',
        }}
      />
    </FavoritesStack.Navigator>
  );
};

const More = () => {
  return (
    <MoreStack.Navigator>
      <MoreStack.Screen
        name="More"
        component={MoreScreen}
        options={{
          headerLeft: () => {
            return <HeaderBackLink />;
          },
          headerTitleAlign: 'center',
          headerTitle: 'New!',
        }}
      />
      <MoreStack.Screen
        name="WebView"
        component={WebViewScreen}
        options={{
          headerLeft: () => {
            return <HeaderBackLink />;
          },
          headerTitleAlign: 'center',
          headerTitle: 'WebView',
        }}
      />
    </MoreStack.Navigator>
  );
};

const StoreFinder = () => {
  return (
    <StoreFinderStack.Navigator>
      <StoreFinderStack.Screen
        name="More"
        component={StoreFinderScreen}
        options={{
          headerLeft: () => {
            return <HeaderBackLink />;
          },
          headerTitle: 'Store Finder',
        }}
      />
    </StoreFinderStack.Navigator>
  );
};

export default App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home';
                } else if (route.name === 'Search') {
                  iconName = focused ? 'search' : 'search';
                } else if (route.name === 'Favorites') {
                  iconName = focused ? 'heart' : 'heart-o';
                } else if (route.name === 'StoreFinder') {
                  iconName = focused ? 'map-marker' : 'map-marker';
                } else if (route.name === 'NEW!') {
                  iconName = focused ? 'ellipsis-h' : 'ellipsis-h';
                }
                return <Icon name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'black',
              tabStyle: {borderRightColor: '#eee', borderRightWidth: 1},
            }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Favorites" component={Favorites} />
            <Tab.Screen name="StoreFinder" component={StoreFinder} />
            <Tab.Screen name="NEW!" component={More} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};
