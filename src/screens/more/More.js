import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {MoreScreen} from './MoreScreen';
import WebViewScreen from './WebViewScreen';
import WebViewABScreen from './WebViewABScreen';
import {HeaderBackLink} from '../../components/header/HeaderBackLink';

const MoreStack = createStackNavigator();

export function More() {
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
}
