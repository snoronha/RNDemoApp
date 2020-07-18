import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ItemPageScreen from '../ItemPageScreen';
import CartScreen from '../CartScreen';
import {SearchScreen} from './SearchScreen';
import {HeaderBackLink} from '../../components/header/HeaderBackLink';
import {HeaderCartLink} from '../../components/header/HeaderCartLink';
import {HeaderSearchBar} from '../../components/header/HeaderSearchBar';

const SearchStack = createStackNavigator();

export function Search({navigation, route}) {
  let tabBarVisible = true;
  let lastRoute =
    route.state && route.state.index > 0
      ? route.state.routes[route.state.routes.length - 1].name
      : '';
  if (lastRoute == 'Cart' || lastRoute == 'ItemPage') {
    tabBarVisible = false;
  }
  // navigation.setOptions({tabBarVisible: tabBarVisible});
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
