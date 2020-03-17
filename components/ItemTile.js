import React, { PureComponent, Component } from 'react'
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import randomWords from 'random-words';


class QuantityPicker extends React.PureComponent {
    render() {
	return (
	  <View style={styles.item_picker}>
	    <View style={{flexDirection: 'row'}}>
              <TouchableOpacity 
		style = {styles.item_touchable_left}
		hitSlop = {{top: 10, left: 10, bottom: 10, right: 0}}
		>
		<Text style = {styles.title}> - </Text>
              </TouchableOpacity>
              <TouchableOpacity
		style={styles.item_touchable_center}
		hitSlop = {{top: 10, left: 0, bottom: 10, right: 0}}
		>
		<Text style = {styles.title}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity
		style = {styles.item_touchable_right}
		hitSlop = {{top: 10, left: 0, bottom: 10, right: 10}}
		>
		<Text style={styles.title}>+</Text>
              </TouchableOpacity>
	    </View>
          </View>		
        )
    }
}

class ItemTile extends PureComponent {    
    render() {    
	var randWords = randomWords({min: 5, max: 15, join: ' '}) + ` (id: ${this.props.item.id})`;
	return (
          <View style={styles.item_row}>
            <Image
              style = {styles.item_image}
              source={{uri: this.props.item.image_url}}
             />
            <Text style={styles.item_description}>{randWords}</Text>
              <QuantityPicker/>
            </View>
	)
    }
}

export default ItemTile;

const styles = StyleSheet.create({
    item_row: {
	flex: 1,
	backgroundColor: '#fff',
	alignItems: 'center',
	flexDirection: 'row',
	justifyContent: 'space-between',
	height: Dimensions.get('window').height * 0.12,
	marginHorizontal: 4,
	borderBottomColor: "#ddd",
	borderBottomWidth: 1,
    },
    item_image: {
	width: 60,
	height: 60,
	marginHorizontal: 8,
	borderRadius: 4,
	justifyContent: 'center',
    },
    item_description: {
	height: 60,
	fontSize: 12,
	flexBasis: Dimensions.get('window').width * 0.50,
    },
    item_picker: {
	flex: 1,
	height: 60,
	fontSize: 14,
	marginRight: 8,
	flexBasis: Dimensions.get('window').width * 0.20,
	justifyContent: 'flex-end',
    },
    item_touchable_center: {
	alignItems: 'center',
	height: 24,
	width: 40,
	borderTopColor: "#aaa",
	borderBottomColor: "#aaa",
	borderTopWidth: 1,
	borderBottomWidth: 1,
	justifyContent: 'center',
    },
    item_touchable_left: {
	alignItems: 'center',
	height: 24,
	width: 20,
	borderTopLeftRadius: 10,
	borderBottomLeftRadius: 10,
	borderColor: "#aaa",
	borderWidth: 1,
	justifyContent: 'center',
    },
    item_touchable_right: {
	alignItems: 'center',
	height: 24,
	width: 20,
	borderTopRightRadius: 10,
	borderBottomRightRadius: 10,
	borderColor: "#aaa",
	borderWidth: 1,
	justifyContent: 'center',
    },
})
