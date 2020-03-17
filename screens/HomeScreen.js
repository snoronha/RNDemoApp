import React from "react";
import { 
    Image,
    View,
    SafeAreaView,
    TouchableOpacity, 
    FlatList,
    StyleSheet,
    Text
} from "react-native";
import util from "../util/util.js";

const HomeScreen = ({ navigation }) => {
    const [selected, setSelected] = React.useState(new Map());

    const onSelect = React.useCallback(
	id => {
	    const newSelected = new Map(selected);
	    newSelected.set(id, !selected.get(id));
	    setSelected(newSelected);
	},
	[selected],
    );

    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={styles.container}>
	  <Text>Hello World</Text>
        </View>
      </SafeAreaView>	    
    );
};

const styles = StyleSheet.create({
    container: {
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "flex-start",
    },
});

export default HomeScreen;
