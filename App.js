import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MenuScreen from "./screens/MenuScreen";
import HomeScreen from "./screens/HomeScreen";
import FlatListScreen from "./screens/FlatListScreen";
import MapViewScreen from "./screens/MapViewScreen";
import WebViewScreen from "./screens/WebViewScreen";
import SearchScreen from "./screens/SearchScreen";
import ItemPageScreen from "./screens/ItemPageScreen";
import CartScreen from "./screens/CartScreen";

import { Header, HeaderBackLink, HeaderCartLink } from "./components/Header";


// Hack to ensure FontAwesome loads
Icon.loadFont();

const HomeStack   = createStackNavigator()
const SearchStack = createStackNavigator()
const Tab         = createBottomTabNavigator();

function Home({navigation}) {
    // console.log("NAV: ", navigation.dangerouslyGetState())
    const header = {
	headerTitle: "Hello",
	headerLeft: () => { return <HeaderBackLink /> },
	headerRight: () => { return <HeaderCartLink /> },
    }
    // options={{ headerBackTitle: "", headerTitle: props => <Header {...props} /> }}
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={header}
	  />
        <HomeStack.Screen
	  name="ItemPage"
          component={ItemPageScreen}
	  options={header}
	  />
        <HomeStack.Screen
	  name="Cart"
          component={CartScreen}
	  options={header}
	  />
      </HomeStack.Navigator>
    )
}

function Search({navigation}) {
    return (
      <SearchStack.Navigator>
   	<SearchStack.Screen name="Search" component={SearchScreen} />
        <SearchStack.Screen name="ItemPage" component={ItemPageScreen} />
        <SearchStack.Screen name="Cart" component={CartScreen} />
      </SearchStack.Navigator>
    )
}

function App() {
    return (
      <SafeAreaProvider>
 	<NavigationContainer>
	  <Tab.Navigator
            screenOptions={({ route }) => ({
		tabBarIcon: ({ focused, color, size }) => {
		    let iconName;
		    if (route.name === 'Home') {
			iconName = focused ? 'home' : 'home';
		    } else if (route.name === 'Search') {
			iconName = focused ? 'search' : 'search';
		    } else if (route.name === 'Favorites') {
			iconName = focused ? 'heart' : 'heart-o';
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
		tabStyle: { borderRightColor: "#eee", borderRightWidth: 1}
            }}
	    >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Favorites" component={FlatListScreen} />
            <Tab.Screen name="MapView" component={MapViewScreen} />
            <Tab.Screen name="WebView" component={WebViewScreen} />
	  </Tab.Navigator>
	</NavigationContainer>
      </SafeAreaProvider>
  );
}

export default App;
