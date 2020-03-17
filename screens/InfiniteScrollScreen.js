import React, { useState, useEffect } from 'react'
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import randomWords from 'random-words';
import ItemTile from "../components/ItemTile.js";

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

const INITIAL_LOAD = 25
const PAGE_SIZE = 25

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
	// Simulate fetch of next 25 items (25 if initial load)
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
	    }, 400)
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
            return <ItemTile item={item} />
          }}
        />
        {isFetching && (
          <ActivityIndicator size="large" color="#444" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', padding: 0}} />
        )}
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
	flex: 1,
	marginTop: 0,
	backgroundColor: '#fff'
    },
    blueBox: {
	height: 40,
	/* backgroundColor: '#08f', */
	opacity: 0.5,
	justifyContent: 'center',
	alignItems: 'center'
    },
    bigWhiteBoldText: {
	color: '#aaa',
	fontSize: 14,
	fontWeight: 'bold'
    }
})

export default InfiniteScrollScreen;
