import React from "react";
import {
    createAppContainer,
    createSwitchNavigator
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import Example from "./screens/Example";
import Landing from "./screens/Landing";
import NativeList from "./screens/NativeList";
import WebViewExample from "./screens/WebViewExample";
import InfiniteScrollExample from "./screens/InfiniteScrollExample";

const FlatListStack = createStackNavigator({
    Landing: {
	screen: Landing,
	navigationOptions: {
	    headerTitle: "Landing"
	}
    },
});

const InfiniteScrollStack = createStackNavigator({
    InfiniteScroll: {
	screen: InfiniteScrollExample,
	navigationOptions: {
	    headerTitle: "Infinite Scroll Example"
	}
    },
});


const WebViewStack = createStackNavigator({
    WebView: {
	screen: WebViewExample,
	navigationOptions: {
	    headerTitle: "WebView Example"
	}
    },
});

const FeedStack = createStackNavigator({
    Feed: {
	screen: Example,
	navigationOptions: {
	    headerTitle: "Feed"
	}
    },
    MapView: {
	screen: NativeList,
	navigationOptions: {
	    headerTitle: "Map Native Module"
	}
    },
    FlatList: {
	screen: Landing,
	navigationOptions: {
	    headerTitle: "FlatList"
	}
    },
    InfiniteScroll: {
	screen: InfiniteScrollExample,
	navigationOptions: {
	    headerTitle: "Infinite Scroll"
	}
    },
    WebView: {
	screen: WebViewExample,
	navigationOptions: {
	    headerTitle: "WebView Example"
	}
    },
});

const SearchStack = createStackNavigator({
    Search: {
	screen: Example,
	navigationOptions: {
	    headerTitle: "Search"
	}
    },
    Details: {
	screen: Example,
	navigationOptions: {
	    headerTitle: "Details"
	}
    }
});

const MainTabs = createBottomTabNavigator({
    Feed: {
	screen: FeedStack,
	navigationOptions: {
	    tabBarLabel: "Feed"
	}
    },
});

const MainDrawer = createDrawerNavigator({
    MainTabs: MainTabs,
});

const AppModalStack = createStackNavigator(
    {
	App: MainDrawer,
    },
    {
	mode: "modal",
	headerMode: "none"
    }
);

const App = createSwitchNavigator({
    Loading: {
	screen: Example
    },
    /*
    FlatList: {
	    screen: FlatListStack
    },
    InfiniteScroll: {
	screen: InfiniteScrollStack
    },
    */
    App: {
	screen: AppModalStack
    },
    /*
    WebView: {
	screen: WebViewStack
    },
    */
});

export default createAppContainer(App);
