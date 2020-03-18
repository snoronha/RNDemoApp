import React, { PureComponent, useState, useEffect } from 'react'
import {
    SafeAreaView,
    ScrollView, 
    StyleSheet,
    View,
} from 'react-native'
import randomWords from 'random-words'

import util from '../util/util.js'
import { ItemTile } from "../components/ItemTile.js"


const HomeScreen = ({ navigation }) => {
    var HPDATA = []
    const NUM_CAROUSELS = 10
    const MAX_ITEMS_PER_CAROUSEL = 8

    // Populate HomePage data here
    var keyCount = 1;
    const getHomePageData = () => {
	HPDATA = [];
	for( var i = 0; i < NUM_CAROUSELS; i++ ) {
	    // Populate each carousel
	    var carousel = []
	    for ( var j = 0; j < MAX_ITEMS_PER_CAROUSEL; j++ ) {
		var randInt = 1 + Math.floor(Math.random() * 1000)
		var isHearted = Math.floor(Math.random() * 5) == 0
		var image_url = "https://i.picsum.photos/id/" + randInt + "/100/100.jpg"
		var key = keyCount.toString()
		var randDescr = randomWords({min: 5, max: 10, join: ' '}) + ` (id: ${key})`
		const item = <ItemTile item={{id: key, favorite: isHearted, image_url: image_url, description: randDescr}} key={key} />
                carousel.push(item)
		keyCount++
	    }
	    HPDATA.push(carousel)
	}
    }
    
    getHomePageData()

    return (
      <SafeAreaView style={styles.container}>
	<ScrollView>
	  {HPDATA.map((carousel, carouselIndex) => (
            <ScrollView horizontal>
	      {carousel}
            </ScrollView>
          ))}
        </ScrollView>
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
	flexDirection: 'row',
	height: 40,
	justifyContent: 'center',
	alignItems: 'center'
    },
    bigWhiteBoldText: {
	color: '#aaa',
	fontSize: 14,
	fontWeight: 'bold',
    },
})

export default HomeScreen;
