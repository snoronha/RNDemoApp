import React, {useState} from 'react';
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from 'react-native';
import {WebView} from 'react-native-webview';

const WebViewScreen = ({route, navigation}) => {
  const startUrl = route.params.url;
  const showUrlBar = route.params.showUrlBar;
  const headerTitle = route.params.headerTitle;
  navigation.setOptions({headerTitle: headerTitle});

  // hook to set url
  let webview = null;
  const [url, setUrl] = useState('');

  const _onGotoURL = () => {
    const redirectTo = 'window.location = "' + url + '"';
    webview.injectJavaScript(redirectTo);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {showUrlBar && (
          <View style={{flexDirection: 'row', marginTop: 0}}>
            <TextInput
              style={[
                styles.text_input,
                {
                  width: Dimensions.get('window').width * 0.8,
                  height: 35,
                  marginRight: 8,
                },
              ]}
              placeholder="Enter URL"
              placeholderTextColor="#aaa"
              maxLength={40}
              autoCapitalize="none"
              onChangeText={(txt) => setUrl(txt)}
              value={url}
            />
            <TouchableOpacity
              onPress={() => _onGotoURL('GO!')}
              style={[
                styles.item_touchable,
                {width: 40, backgroundColor: '#0d0'},
              ]}>
              <Text>Go!</Text>
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height * 0.9,
            marginTop: 0,
          }}>
          <WebView
            ref={(ref) => (webview = ref)}
            originWhitelist={['*']}
            style={{marginTop: 10}}
            source={{uri: startUrl}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff', // util.getRandomColor()
    borderRadius: 4,
    margin: 0,
  },
  text_input: {
    borderColor: 'gray',
    backgroundColor: '#eee',
    paddingLeft: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  item_touchable: {
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 35,
    color: '#aaa',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#eee',
    justifyContent: 'center',
  },
});

export default WebViewScreen;
