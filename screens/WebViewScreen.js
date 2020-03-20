import React, { useState } from "react";
import {
    Alert,
    Dimensions,
    TouchableOpacity, 
    StyleSheet,
    Text,
    TextInput,
    View,
    SafeAreaView,
} from "react-native";
import { WebView } from 'react-native-webview';
import util from "../util/util.js";

const WebViewScreen = ({ navigation }) => {
    // const startUrl = 'http://grocery.walmart.com/?_xf=dIUjO&wm_preview_date=1580760608359'
    const startUrl = 'https://www.walmart.com/order-ahead/cake#!/browse'

    // hook to set url
    let webview = null;
    const [url, setUrl] = useState('');

    const _onGotoURL = () => {
	const redirectTo = 'window.location = "' + url + '"';
	webview.injectJavaScript(redirectTo);
    }

    return (
      <SafeAreaView>
	<View style={styles.container}>
          <View style = {{flexDirection: 'row', marginTop: 8, }}>
            <TextInput
              style = {[
                styles.text_input,
                { width: Dimensions.get('window').width * 0.8, height: 35, marginRight: 8}
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
          <View style = {{
	    width: Dimensions.get('window').width * 0.980,
	    height: Dimensions.get('window').height * 0.80,
            marginTop: 8, borderTopColor: "#ddd", borderTopWidth: 1,
            borderRadiusBottom: 10,
            }}>
            <WebView
              ref = {(ref) => (webview = ref)}
              originWhitelist = {['*']}
              style = {{marginTop: 10}}
              source = {{ uri: startUrl }}
              />
          </View>
	</View>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
	flexDirection: "column",
	alignItems: "center",
	backgroundColor: "#fff", // util.getRandomColor()
	borderColor: "#ccc",
	borderWidth: 1,
	borderRadius: 4,
	margin: 2, 
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

export default WebViewScreen;
