import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MenuScreen from "./screens/MenuScreen";
import FlatListScreen from "./screens/FlatListScreen";
import MapViewScreen from "./screens/MapViewScreen";
import WebViewScreen from "./screens/WebViewScreen";
import InfiniteScrollScreen from "./screens/InfiniteScrollScreen";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function App() {
    return (
      <SafeAreaProvider>
	<NavigationContainer>
	  <Tab.Navigator
	    screenOptions={({ route }) => ({
		tabBarIcon: ({ focused, color, size }) => {
		    let iconName;
		    if (route.name === 'Menu') {
			iconName = focused ? 'home' : 'home';
		    } else if (route.name === 'FlatList') {
			iconName = focused ? 'heart' : 'heart-o';
		    } else if (route.name === 'IScroll') {
			iconName = focused ? 'search' : 'search';
		    } else if (route.name === 'MapView') {
			iconName = focused ? 'map-marker' : 'map-marker';
		    } else if (route.name === 'WebView') {
			iconName = focused ? 'chrome' : 'firefox';
		    }
		    return <Icon name={iconName} size={size} color={color} />;
		},
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'black',
            }}
	    >
            <Tab.Screen name="Menu" component={MenuScreen} />
            <Tab.Screen name="FlatList" component={FlatListScreen} />
            <Tab.Screen name="IScroll" component={InfiniteScrollScreen} />
            <Tab.Screen name="MapView" component={MapViewScreen} />
            <Tab.Screen name="WebView" component={WebViewScreen} />
	  </Tab.Navigator>
	</NavigationContainer>
      </SafeAreaProvider>
  );
}

export default App;
