import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ItemPageScreen from '../ItemPageScreen';
import CartScreen from '../CartScreen';
import BrowseScreen from './BrowseScreen';
import {HeaderBackLink} from '../../components/header/HeaderBackLink';
import {HeaderCartLink} from '../../components/header/HeaderCartLink';

const BrowseStack = createStackNavigator();

export function Browse({navigation, route}) {
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
    <BrowseStack.Navigator>
      <BrowseStack.Screen
        name="Browse"
        component={BrowseScreen}
        options={{
          headerLeft: () => {
            return <HeaderBackLink />;
          },
          headerRight: () => {
            return <HeaderCartLink />;
          },
          headerTitleAlign: 'center',
          headerTitle: 'Browse',
        }}
      />
      <BrowseStack.Screen
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
      <BrowseStack.Screen
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
    </BrowseStack.Navigator>
  );
}
