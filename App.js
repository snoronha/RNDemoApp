import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import {StoreFinderScreen} from './src/screens/StoreFinderScreen';
import MoreScreen from './src/screens/MoreScreen';
import WebViewScreen from './src/screens/WebViewScreen';
import WebViewABScreen from './src/screens/WebViewABScreen';
import {SearchScreen} from './src/screens/SearchScreen';
import {SearchBaseScreen} from './src/screens/SearchScreen';

import ItemPageScreen from './src/screens/ItemPageScreen';
import CartScreen from './src/screens/CartScreen';

import {HeaderBackLink} from './src/components/header/HeaderBackLink';
import {HeaderCartLink} from './src/components/header/HeaderCartLink';
import {HeaderSearchBar} from './src/components/header/HeaderSearchBar';
import {HamburgerPlusScreen} from './src/components/header/HamburgerMenu';

import {IconWithBadge} from './src/components/footer/IconWithBadge';

//-------- REDUX ---------//
import {Provider} from 'react-redux';
import store from './src/stores/store';

// Hack to ensure FontAwesome loads
Icon.loadFont();

const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const FavoritesStack = createStackNavigator();
const MoreStack = createStackNavigator();
const StoreFinderStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = ({navigation, route}) => {
  let tabBarVisible = true;
  let lastRoute =
    route.state && route.state.index > 0
      ? route.state.routes[route.state.routes.length - 1].name
      : '';
  if (lastRoute == 'Cart' || lastRoute == 'ItemPage') {
    tabBarVisible = false;
  }
  navigation.setOptions({tabBarVisible: tabBarVisible});
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
            return <HeaderBackLink props={{icon: 'times'}} />;
          },
          headerTitleAlign: 'center',
          headerTitle: 'Cart',
        }}
      />
    </HomeStack.Navigator>
  );
};

export function Search({navigation, route}) {
  let tabBarVisible = true;
  let lastRoute =
    route.state && route.state.index > 0
      ? route.state.routes[route.state.routes.length - 1].name
      : '';
  if (lastRoute == 'Cart' || lastRoute == 'ItemPage') {
    tabBarVisible = false;
  }
  navigation.setOptions({tabBarVisible: tabBarVisible});
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
          headerTitleAlign: 'center',
          headerTitle: props => <HeaderSearchBar {...props} />,
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
            return <HeaderBackLink props={{icon: 'times'}} />;
          },
          headerTitleAlign: 'center',
          headerTitle: 'Cart',
        }}
      />
    </SearchStack.Navigator>
  );
}

const Favorites = ({navigation, route}) => {
  let tabBarVisible = true;
  let lastRoute =
    route.state && route.state.index > 0
      ? route.state.routes[route.state.routes.length - 1].name
      : '';
  if (lastRoute == 'Cart' || lastRoute == 'ItemPage') {
    tabBarVisible = false;
  }
  navigation.setOptions({tabBarVisible: tabBarVisible});
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
            return <HeaderBackLink props={{icon: 'times'}} />;
          },
          headerTitleAlign: 'center',
          headerTitle: 'Cart',
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
      <MoreStack.Screen
        name="WebViewAB"
        component={WebViewABScreen}
        options={{
          headerLeft: () => {
            return <HeaderBackLink />;
          },
          headerTitleAlign: 'center',
          headerTitle: 'WebViewAB',
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

export default (App = () => {
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
                  return <Icon name={iconName} size={size} color={color} />;
                } else if (route.name === 'Search') {
                  iconName = focused ? 'search' : 'search';
                  return <Icon name={iconName} size={size} color={color} />;
                } else if (route.name === 'Favorites') {
                  iconName = focused ? 'heart' : 'heart-o';
                  return (
                    <IconWithBadge
                      name={iconName}
                      size={size}
                      color={color}
                      badgeCount={3}
                    />
                  );
                } else if (route.name === 'StoreFinder') {
                  iconName = focused ? 'map-marker' : 'map-marker';
                  return <Icon name={iconName} size={size} color={color} />;
                } else if (route.name === 'NEW!') {
                  iconName = focused ? 'ellipsis-h' : 'ellipsis-h';
                  return <Icon name={iconName} size={size} color={color} />;
                }
                // return <Icon name={iconName} size={size} color={color} />;
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
});
