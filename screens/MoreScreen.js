import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
} from "react-native";
import util from "../util/util.js";

const MoreScreen = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.container}>	
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
	  }}
	  >
          <TouchableOpacity
            onPress={() => navigation.navigate('WebView')}
            key={1}
            style={{
              backgroundColor: "#fff",
              padding: 10,
              margin: 10,
              borderRadius: 10,
            }}>
            <Text>Simple Browser</Text>
          </TouchableOpacity>

	</View>
      </SafeAreaView>
    );
};

export default MoreScreen;

const styles = StyleSheet.create({
    container: {
	flex: 1,
	marginTop: 0,
	backgroundColor: '#fff'
    },
})      
