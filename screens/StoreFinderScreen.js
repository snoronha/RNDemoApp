import React from 'react';
import {
  Dimensions,
  NativeModules,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

const StoreFinderScreen = () => {
  // Example of Native Module talking to Calendar API. Commenting for now
  /*
  var CalendarManager = NativeModules.CalendarManager;
  CalendarManager.addEvent(
    'Birthday Party',
    '4 Privet Drive, Surrey',
    new Date().getTime(),
  );
  CalendarManager.findEvents((error, events) => {
    if (error) {
      console.error(error);
    } else {
      console.log('EVENTS: ', events);
    }
  });
  */

  var region = {
    latitude: 37.36,
    longitude: -122.05,
    latitudeDelta: 0.25,
    longitudeDelta: 0.0421,
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <MapView
          initialRegion={region}
          zoomEnabled={true}
          style={styles.map}
          onRegionChange={this.onRegionChange}>
          <Marker
            coordinate={{
              latitude: 37.4008228,
              longitude: -122.1096709,
            }}
            centerOffset={{x: -18, y: -60}}
            anchor={{x: 0.69, y: 1}}>
            <Icon name={'shopping-cart'} size={18} color={'tomato'} />
            <Callout style={styles.plainView}>
              <View>
                <Text style={{fontSize: 12}}>Mountain View</Text>
              </View>
            </Callout>
          </Marker>
          <Marker
            coordinate={{
              latitude: 37.3231123,
              longitude: -121.9401324,
            }}
            centerOffset={{x: -18, y: -60}}
            anchor={{x: 0.69, y: 1}}>
            <Icon name={'cart-plus'} size={18} color={'tomato'} />
            <Callout style={styles.plainView}>
              <View>
                <Text style={{fontSize: 12}}>San Jose Market</Text>
              </View>
            </Callout>
          </Marker>
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
  },
  header: {
    fontFamily: 'Verdana',
    color: 'black',
    alignSelf: 'stretch',
    textAlign: 'center',
    padding: 5,
    marginBottom: 5,
    fontSize: 20,
    backgroundColor: '#ffa',
  },
  map: {
    borderColor: '#ddd',
    borderRadius: 10,
    borderWidth: 1,
    width: Dimensions.get('window').width * 0.96,
    height: Dimensions.get('window').height * 0.6,
  },
  plainView: {
    height: 40,
    width: 80,
  },
});

export default StoreFinderScreen;
