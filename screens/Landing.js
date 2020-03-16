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

const getAvailableRoutes = navigation => {
    let availableRoutes = [];
    if (!navigation) return availableRoutes;
    const parent = navigation.dangerouslyGetParent();
    if (parent) {
	if (parent.router && parent.router.childRouters) {
	    // Grab all the routes the parent defines and add it the list
	    availableRoutes = [...availableRoutes, ...Object.keys(parent.router.childRouters)];
	}
	// Recursively work up the tree until there are none left
	availableRoutes = [...availableRoutes, ...getAvailableRoutes(parent)];
    }
    // De-dupe the list and then remove the current route from the list
    return [...new Set(availableRoutes)].filter(
	route => route !== navigation.state.routeName
    );
};

const NUM_IMAGES = 50;
const DATA = [];
for (var i = 0; i < NUM_IMAGES; i++) {
    DATA.push({id: util.getRandomId(), title: "Item " + i, image_url: `https://i.picsum.photos/id/${i+1}/100/100.jpg`});
}

const fetchImages = () => {
    const urls = [
	"https://source.unsplash.com/random/100x100/",
	"https://source.unsplash.com/user/erondu/100x100",
	"https://source.unsplash.com/collection/190727/100x100",
	"https://i.picsum.photos/id/1/100/100",
	"https://i.picsum.photos/id/5/100/100",
	"https://i.picsum.photos/id/10/100/100",
    ];
    const allRequests = urls.map(
	url => fetch(url).then(response => response.url)
    );
    return Promise.all(allRequests);
};

const Item = ({ id, title, image_url, selected, onSelect }) => {
    return (
      <View style={{flex: 1, flexDirection: 'row', width: 360}}>
        <Image
          style = {styles.item_image}
          source={{uri: image_url}}
         />
        <Text style={[styles.item_text, {width: 140}]}>{id}</Text>
	<View style={{alignItems: 'stretch', width: 180, height: 40}}>
          <TouchableOpacity
            onPress={() => onSelect(id)}
            style={[
              styles.item_touchable,
              { backgroundColor: selected ? '#0af' : '#fff' },
            ]}
            >
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
	</View>
      </View>
    );
};

const Landing = ({ navigation }) => {
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
      <View style={styles.container}>
	<FlatList
          styles     = {styles.flatlist}
          data       = {DATA}
          numColumns = {1}
          renderItem = {({ item }) => (
            <Item
              id        = {item.id}
              title     = {item.title}
              image_url = {item.image_url}
              selected  = {!!selected.get(item.id)}
	      onSelect  = {onSelect}
             />
          )}
          keyExtractor = {item => item.id}
          extraData={false}
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
	backgroundColor: "#f80", // util.getRandomColor()
    },
    title: {
	fontSize: 16,
    },
    flatlist: {
	alignItems: 'stretch',
    },
    item_touchable: {
	alignItems: 'center',
	alignSelf: 'stretch',
	height: 40,
	color: "#aaa",
	borderColor: "#aaa",
	borderWidth: 1,
	borderRadius: 10,
	justifyContent: 'center',
    },
    item_text: {
	fontFamily: 'Verdana',
	color: 'black',
	paddingLeft: 5,
	fontSize: 12,
	backgroundColor: "#ddd"
    },
    item_image: {
	width: 40,
	height: 40,
	borderRadius: 4,
    },
    touchable_full: {
	backgroundColor: "#fff",
	alignSelf: 'stretch',
	padding: 5,
	marginBottom: 2,
	borderRadius: 5,
    },
    touchable_text: {
	fontFamily: 'Verdana',
	textAlign: 'center',
	fontSize: 16,
    }
});

export default Landing;
