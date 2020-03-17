import React, { useState, useEffect } from 'react'
import {
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    Text,
    Dimensions
} from 'react-native'
import randomWords from 'random-words';

const useInfiniteScroll = load => {
    const [isFetching, setIsFetching] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
	let didCancel = false
	if (!isFetching) return

	const loadAsync = async () => {
	    const lastIndex = data.length
	    const lastItem = data.length ? data[lastIndex] : null
	    
	    const newData = await load({ lastIndex, lastItem })
	    if (!didCancel) {
		setData(prevState => [...prevState, ...newData])
		setIsFetching(false)
	    }
	}
	
	loadAsync()

	return () => {
	    didCancel = true
	}
    }, [isFetching])

    return [data, isFetching, setIsFetching]
}

const INITIAL_LOAD = 30
const PAGE_SIZE = 20

const InfiniteScrollScreen = ({ navigation }) => {
    /**
     * Right now, I'm mandating that whatever this method is accepts as a
     * parameter an object containing the objects `lastIndex` and `lastObject`
     * respectively. I believe this should suffice for effective paging.
     *
     * @param lastIndex
     * @returns {Promise<R>}
     */
    const fetchMoreListItems = ({ lastIndex }) => {
	// Simulate fetch of next 20 items (30 if initial load)
	return new Promise(resolve => {
	    setTimeout(() => {
		resolve([
		    ...Array.from(
			Array(lastIndex === 0 ? INITIAL_LOAD : PAGE_SIZE).keys(),
			n => {
			    n = n + lastIndex
			    var randInt = 1 + Math.floor(Math.random() * 1000)
			    return {
				number: n.toString(),
				id: n.toString(),
				image_url: "https://i.picsum.photos/id/" + randInt + "/100/100.jpg",
			    }
			}
		    )
		])
	    }, 2000)
	})
    }

    const [data, isFetching, setIsFetching] = useInfiniteScroll(
	fetchMoreListItems
    )

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.blueBox}>
          <Text style={styles.bigWhiteBoldText}>
            {`${data.length} Items Loaded`}
          </Text>
        </View>
        <FlatList
          onEndReachedThreshold={3}
          onEndReached={() => {
            if (!isFetching) {
              setIsFetching(true)
            }
          }}
          data={data}
          keyExtractor = {item => item.id}
          renderItem={({ item }) => {
            return <Item item={item} />
          }}
        />
        {isFetching && (
          <View style={styles.blueBox}>
            <Text style={styles.bigWhiteBoldText}>(Fetching More)</Text>
          </View>
        )}
      </SafeAreaView>
    )
}

class Item extends React.PureComponent {
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

const styles = StyleSheet.create({
    container: {
	flex: 1,
	marginTop: 0,
	backgroundColor: '#fa0'
    },
    item_row: {
	flex: 1,
	backgroundColor: '#fff',
	alignItems: 'center',
	flexDirection: 'row',
	justifyContent: 'space-between',
	height: Dimensions.get('window').height * 0.12,
	marginVertical: 2,
	marginHorizontal: 8
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

    blueBox: {
	height: 40,
	backgroundColor: '#08f',
	opacity: 0.5,
	justifyContent: 'center',
	alignItems: 'center'
    },
    bigWhiteBoldText: {
	color: 'white',
	fontSize: 14,
	fontWeight: 'bold'
    }
})

export default InfiniteScrollScreen;
