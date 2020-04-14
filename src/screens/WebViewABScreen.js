import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  TabView,
  TabBar,
  SceneMap,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view';
import {WebView} from 'react-native-webview';

const WebViewABScreen = ({route, navigation}) => {
  const startUrl1 = route.params.url1;
  const startUrl2 = route.params.url2;
  const headerTitle = route.params.headerTitle;
  navigation.setOptions({headerTitle: headerTitle});

  type State = NavigationState<{
    key: string,
    title: string,
  }>;

  const OGRoute = () => (
    <View
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.9,
        marginTop: 0,
      }}>
      <WebView
        ref={ref => (webview1 = ref)}
        originWhitelist={['*']}
        style={{marginTop: 0}}
        source={{uri: startUrl1}}
      />
    </View>
  );

  const OneAppRoute = () => (
    <View
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.9,
        marginTop: 0,
      }}>
      <WebView
        ref={ref => (webview2 = ref)}
        originWhitelist={['*']}
        style={{marginTop: 0, borderWidth: 1}}
        source={{uri: startUrl2}}
      />
    </View>
  );

  const initialLayout = {width: Dimensions.get('window').width};

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'og', title: 'OG'},
    {key: 'oneapp', title: 'OneApp'},
  ]);

  const renderScene = SceneMap({
    og: OGRoute,
    oneapp: OneAppRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      getLabelText={({route}) => route.title}
      tabStyle={{flex: 1, alignItems: 'center'}}
      labelStyle={{fontSize: 14, color: '#000'}}
      indicatorStyle={{backgroundColor: 'tomato'}}
      style={{backgroundColor: 'white'}}
    />
  );

  /*
  const renderTabBar = () => {
    return (
      <TabBar
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
        labelStyle={styles.label}
      />
    );
  };
  */

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff', // util.getRandomColor()
    borderRadius: 4,
    margin: 0,
  },
  tabbar: {
    backgroundColor: '#fff',
  },
  tab: {
    width: 120,
  },
  indicator: {
    backgroundColor: '#000',
  },
  label: {
    fontWeight: '400',
    color: '#000',
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

export default WebViewABScreen;
