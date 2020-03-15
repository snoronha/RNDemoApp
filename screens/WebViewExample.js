import React, { useState } from "react";
import {
    Alert,
    TouchableOpacity, 
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { WebView } from 'react-native-webview';
import util from "../util/util.js";

const getAvailableRoutes = navigation => {
    let availableRoutes = [];
    if (!navigation) return availableRoutes;
    const parent = navigation.dangerouslyGetParent();
    if (parent) {
	if (parent.router && parent.router.childRouters) {
	    availableRoutes = [...availableRoutes, ...Object.keys(parent.router.childRouters)];
	}
	availableRoutes = [...availableRoutes, ...getAvailableRoutes(parent)];
    }
    // De-dupe the list and then remove the current route from the list
    return [...new Set(availableRoutes)].filter(
	route => route !== navigation.state.routeName
    );
};

const WebViewExample = ({ navigation }) => {
    // hook to set url
    let webview = null;
    const [url, setUrl] = useState('');

    const _onGotoURL = () => {
	const redirectTo = 'window.location = "' + url + '"';
	webview.injectJavaScript(redirectTo);
    }

    return (
      <View style={styles.container}>
        <View style = {{flexDirection: 'row'}}>
          {getAvailableRoutes(navigation).map(route => (
	  <TouchableOpacity
	    onPress = {() => navigation.navigate(route)}
	    key     = {route}
	    style   = {styles.nav_pill}
	    >
	    <Text style = {{alignSelf: "center"}}>{route}</Text>
	  </TouchableOpacity>
          ))}
	</View>
	<View style = {{flexDirection: 'row'}}>
	  <TextInput
            style = {[
            styles.text_input,
              { width: 300, height: 35, marginRight: 8}
            ]}
	    placeholder = "Enter URL"
	    placeholderTextColor = "#aaa"
            maxLength = {40}
	    autoCapitalize = 'none'
            onChangeText = {(txt) => setUrl(txt)}
	    value = {url}
	    />
          <TouchableOpacity
            onPress={() => _onGotoURL("GO!")}
            style={[
              styles.item_touchable,
              {width: 40, backgroundColor: "#0d0"}
	    ]}
	    >
            <Text>Go!</Text>
          </TouchableOpacity>

	</View>
	<View style = {{width: 360, height: 500}}>
	  <WebView
	    ref = {(ref) => (webview = ref)}
            originWhitelist = {['*']}
            style = {{marginTop: 10}}
            source = {{ uri: 'http://grocery.walmart.com/?_xf=dIUjO&wm_preview_date=1580760608359' }} 
            />
	</View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
	flexDirection: "column",
	alignItems: "center",
	backgroundColor: "#f80", // util.getRandomColor()
    },
    nav_pill: {
        backgroundColor: "#fff",
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    text_input: {
	borderColor: 'gray',
	backgroundColor: "#eee",
	paddingLeft: 5,
	borderRadius: 10,
	borderWidth: 1 
    },
    item_touchable: {
	alignItems: 'center',
	alignSelf: 'stretch',
	height: 35,
	color: "#aaa",
	borderColor: "#aaa",
	borderWidth: 1,
	borderRadius: 10,
	backgroundColor: "#eee",
	justifyContent: 'center',
    },

});

export default WebViewExample;
