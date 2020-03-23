import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import StoreFinderScreen from './screens/StoreFinderScreen';
import MoreScreen from './screens/MoreScreen';
import WebViewScreen from './screens/WebViewScreen';
import SearchScreen from './screens/SearchScreen';
import ItemPageScreen from './screens/ItemPageScreen';
import CartScreen from './screens/CartScreen';

import {HeaderBackLink, HeaderCartLink} from './components/Header';

//-------- REDUX ---------//
import {Provider} from 'react-redux';
import store from './stores/store';

//--- GLOBAL CART till figure out Redux further ----//
global.CART = {itemIds: {}, items: []};

// Hack to ensure FontAwesome loads
Icon.loadFont();

const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const FavoritesStack = createStackNavigator();
const MoreStack = createStackNavigator();
const StoreFinderStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => {
            return <HeaderBackLink />;
          },
          headerRight: () => {
            return <HeaderCartLink />;
          },
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
          headerTitle: 'Cart',
        }}
      />
    </HomeStack.Navigator>
  );
}

function Search() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerLeft: () => {
            return <HeaderBackLink />;
          },
          headerRight: () => {
            return <HeaderCartLink />;
          },
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
          headerTitle: 'Item Page',
        }}
      />
    </SearchStack.Navigator>
  );
}

function Favorites() {
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
          headerTitle: 'Item Page',
        }}
      />
    </FavoritesStack.Navigator>
  );
}

function More() {
  return (
    <MoreStack.Navigator>
      <MoreStack.Screen
        name="More"
        component={MoreScreen}
        options={{
          headerLeft: () => {
            return <HeaderBackLink />;
          },
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
          headerTitle: 'WebView',
        }}
      />
    </MoreStack.Navigator>
  );
}

function StoreFinder() {
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
}

function App() {
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
}

export default App;
