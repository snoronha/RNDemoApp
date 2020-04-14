import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import ItemPageScreen from '../ItemPageScreen';
import CartScreen from '../CartScreen';
import HomeScreen from './HomeScreen';
import {HeaderBackLink} from '../../components/header/HeaderBackLink';
import {HeaderCartLink} from '../../components/header/HeaderCartLink';
import {HamburgerMenu} from '../../components/header/HamburgerMenu';

const HomeStack = createStackNavigator();
const HomeDrawer = createDrawerNavigator();
/*
export function HomePlus({navigation, route}) {
  return (
    <HomeDrawer.Navigator initialRouteName="Home">
      <HomeDrawer.Screen name="Home" component={Home} />
      <HomeDrawer.Screen name="Search" component={Search} />
      <HomeDrawer.Screen name="Favorites" component={Favorites} />
      <HomeDrawer.Screen name="More" component={More} />
    </HomeDrawer.Navigator>
  );
}
*/

export function Home({navigation, route}) {
  return (
    <HomeDrawer.Navigator initialRouteName="HomeContent">
      <HomeDrawer.Screen name="Home" component={HomeContent} />
    </HomeDrawer.Navigator>
  );
}

function HomeContent({navigation, route}) {
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
