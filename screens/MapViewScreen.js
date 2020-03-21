import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  NativeModules,
  Dimensions,
} from 'react-native';
import MapView from 'react-native-maps';

const MapViewScreen = () => {
  // Example of Native Module talking to Calendar API. Commenting for now
  /*
    var CalendarManager = NativeModules.CalendarManager;
    CalendarManager.addEvent('Birthday Party', '4 Privet Drive, Surrey', (new Date()).getTime());
    CalendarManager.findEvents((error, events) => {
	if (error) {
	    console.error(error);
	} else {
	    console.log("EVENTS: ", events);
	}
    });
    */
  var region = {
    latitude: 37.36,
    longitude: -122.05,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <MapView
          region={region}
          zoomEnabled={true}
          style={styles.map}
          onRegionChange={this.onRegionChange}
        />
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
    marginTop: 10,
    width: Dimensions.get('window').width * 0.96,
    height: Dimensions.get('window').height * 0.8,
  },
});

export default MapViewScreen;
