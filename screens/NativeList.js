import React from "react";
import { 
    View,
    StyleSheet,
    Text,
    NativeModules
} from "react-native";
import MapView from "react-native-maps";
import util from "../util/util.js";

const NativeList = ({ navigation }) => {
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
          style={{ borderColor: "#f80", borderRadius: 10, borderWidth: 2, marginTop: 10, width: 360, height: 400}}
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
    flatlist: {
	width: 360,
	alignItems: 'stretch',
    },
    item_text: {
	fontFamily: 'Verdana',
	color: 'black',
	textAlign: 'left',
	padding: 5,
	marginBottom: 1,
	fontSize: 14,
	backgroundColor: "#ddd"
    },
});

export default NativeList;
