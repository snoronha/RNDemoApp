import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import ItemPageScreen from '../ItemPageScreen';
import CartScreen from '../CartScreen';
import HomeScreen from './HomeScreen';
import {HeaderBackLink} from '../../components/header/HeaderBackLink';
import {HeaderCartLink} from '../../components/header/HeaderCartLink';
import {HamburgerMenu} from '../../components/header/HamburgerMenu';

const HomeStack = createStackNavigator();
const HomeDrawer = createDrawerNavigator();

const Screen = Dimensions.get('window');
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={({focused, color, size}) => (
          <Icon color={color} size={size} name={'home'} />
        )}
        label="Home"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        icon={({focused, color, size}) => (
          <Icon color={color} size={size} name={'heart'} />
        )}
        label="Favorites"
        onPress={() => props.navigation.jumpTo('Favorites')}
      />
      <DrawerItem
        icon={({focused, color, size}) => (
          <Icon color={color} size={size} name={'search'} />
        )}
        label="Search"
        onPress={() => props.navigation.jumpTo('Search')}
      />
    </DrawerContentScrollView>
  );
}

// height = 0 hides the HomeContent Screen
export function Home({navigation, route}) {
  return (
    <HomeDrawer.Navigator
      initialRouteName="HomeContent"
      drawerStyle={{
        backgroundColor: '#eee',
        width: Screen.width * 0.8,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerContentOptions={{itemStyle: {height: 0}}}>
      <HomeDrawer.Screen name="Hello" component={HomeContent} />
    </HomeDrawer.Navigator>
  );
}

function HomeContent({navigation, route}) {
  // Request permission for Geolocatiom
  Geolocation.requestAuthorization();

  let tabBarVisible = true;
  let lastRoute =
    route.state && route.state.index > 0
      ? route.state.routes[route.state.routes.length - 1].name
      : '';
  if (lastRoute == 'Cart' || lastRoute == 'ItemPage') {
    tabBarVisible = false;
  }
  let parent = navigation.dangerouslyGetParent();
  // navigation.setOptions({tabBarVisible: tabBarVisible});
  parent.setOptions({tabBarVisible: tabBarVisible});
  const openLeftNav = () => {
    navigation.openDrawer();
  };

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => {
            return <HamburgerMenu openLeftNav={openLeftNav} />;
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
}
