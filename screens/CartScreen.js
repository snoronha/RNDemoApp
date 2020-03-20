import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
} from "react-native";
import util from "../util/util.js";

const CartScreen = ({ navigation }) => {
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
	  <Text>Cart</Text>
	</View>
      </SafeAreaView>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
	flex: 1,
	marginTop: 0,
	backgroundColor: '#fff'
    },
})      
