import React from "react";
import {
    createAppContainer,
    createSwitchNavigator
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import MenuScreen from "./screens/MenuScreen";
import FlatListScreen from "./screens/FlatListScreen";
import MapViewScreen from "./screens/MapViewScreen";
import WebViewScreen from "./screens/WebViewScreen";
import InfiniteScrollScreen from "./screens/InfiniteScrollScreen";

const FeedStack = createStackNavigator({
    Menu: {
	screen: MenuScreen,
	navigationOptions: {
	    headerTitle: "Menu"
	}
    },
    MapView: {
	screen: MapViewScreen,
	navigationOptions: {
	    headerTitle: "MapView Example"
	}
    },
    FlatList: {
	screen: FlatListScreen,
	navigationOptions: {
	    headerTitle: "FlatList Example"
	}
    },
    InfiniteScroll: {
	screen: InfiniteScrollScreen,
	navigationOptions: {
	    headerTitle: "Infinite Scroll Example"
	}
    },
    WebView: {
	screen: WebViewScreen,
	navigationOptions: {
	    headerTitle: "WebView Example"
	}
    },
});

const MainTabs = createBottomTabNavigator({
    Main: {
	screen: FeedStack,
	navigationOptions: {
	    tabBarLabel: "Main"
	}
    },
});

const MainDrawer = createDrawerNavigator({
    MainTabs: MainTabs,
});

const StartModalStack = createStackNavigator(
    {
	Start: MainDrawer,
    },
    {
	mode: "modal",
	headerMode: "none"
    }
);

const App = createSwitchNavigator({
    Back: {
	screen: MenuScreen
    },
    Start: {
	screen: StartModalStack
    },
});

export default createAppContainer(App);
