import React from "react";
import { 
    View,
    StyleSheet,
    Text,
    NativeModules,
    Dimensions
} from "react-native";
import MapView from "react-native-maps";
import util from "../util/util.js";

const MapViewScreen = ({ navigation }) => {
    var CalendarManager = NativeModules.CalendarManager;
    // CalendarManager.addEvent('Birthday Party', '4 Privet Drive, Surrey');
    CalendarManager.addEvent('Birthday Party', '4 Privet Drive, Surrey', (new Date()).getTime());
    CalendarManager.findEvents((error, events) => {
	if (error) {
	    console.error(error);
	} else {
	    console.log("EVENTS: ", events);
	}
    });
    var region = {
	latitude: 37.36,
	longitude: -122.05,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421,
    };
    return (
      <View style={styles.container}>
        <MapView
          region={region}
          zoomEnabled={true}
          style = {styles.map}
          onRegionChange={this.onRegionChange}
          />
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
	flex: 1,
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "flex-start",
	backgroundColor: util.getRandomColor()
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
	backgroundColor: "#ffa"
    },
    map: {
	borderColor: "#f80",
	borderRadius: 10,
	borderWidth: 2,
	marginTop: 10,
	width: Dimensions.get('window').width * 0.960,
	height: Dimensions.get('window').height * 0.700,
    }
});

export default MapViewScreen;
