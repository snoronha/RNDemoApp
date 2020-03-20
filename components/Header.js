import React, { useState, useEffect, useRef, PureComponent, Component } from 'react'
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export function Header() {    
    const navigation = useNavigation()
    navigateToPage = (pageName) => {
	navigation.navigate(pageName)
    }
    goBack = () => {
	if ( navigation.canGoBack())
	    navigation.goBack()
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
	  style = {styles.back_button}
	  hitSlop = {{top: 10, left: 10, bottom: 10, right: 10}}
          onPress = {this.goBack}>
          {navigation.canGoBack() ?
            <Icon name={'arrow-left'} size={24} color={'#888'}/> :
            <Icon name={'arrow-left'} size={24} color={'#fff'}/>
	  }
        </TouchableOpacity>

        <Icon name = {'heart'} color = {'tomato'} size = {18}  style={{borderWidth: 1}}/>
	<TouchableOpacity
	  style = {styles.cart}
	  hitSlop = {{top: 10, left: 10, bottom: 10, right: 10}}	>
	    <Icon name={'shopping-cart'} size={30} color={'#888'}/>
        </TouchableOpacity>
      </View>
    )
}

export function HeaderBackLink() {    
    const navigation = useNavigation()
    goBack = () => {
	if (navigation.canGoBack())
	    navigation.goBack()
    }

    return (
      <TouchableOpacity
        style = {styles.back_button}
        hitSlop = {{top: 10, left: 10, bottom: 10, right: 10}}
        onPress = {this.goBack}>
        {navigation.canGoBack() ?
          <Icon name={'arrow-left'} size={24} color={'#888'}/> :
          <Icon name={'arrow-left'} size={24} color={'#fff'}/>
        }
      </TouchableOpacity>
    )
}

export function HeaderCartLink() {    
    const navigation = useNavigation()
    goToCart = () => {
	navigation.navigate('Cart')
    }
    const [cartCount, setCartCount] = useState(CART[0])
    useEffect(() => {
	setCartCount(CART[0])
	console.log("CART VALUE, COUNT: ", CART[0], cartCount)
    }, [cartCount])
    
    return (
      <View>
	<View style = {styles.cart_badge_container}>
          <Text style = {styles.cart_badge}>{cartCount}</Text>
	</View>
        <TouchableOpacity
          style = {styles.cart}
          hitSlop = {{top: 10, left: 10, bottom: 10, right: 10}}
          onPress = {this.goToCart}>
          <Icon name={'shopping-cart'} size={30} color={'#888'}/>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
	flex: 1,
	width: Dimensions.get('window').width,
	backgroundColor: '#fff',
	alignItems: 'flex-start',
	flexDirection: 'row',
	justifyContent: 'space-between',
    },
    back_button: {
	alignSelf: 'center',
	marginLeft: 8
	
    },
    title: {
	
    },
    cart: {
	alignSelf: 'center',
	marginRight: 12,
	zIndex: 0,
    },
    cart_badge_container: {
	position: 'absolute',
	alignItems: 'center',
	justifyContent: 'center',
	top: -4,
	right: 4,
	zIndex: 1,
	width: 16,
	height: 16,
	borderRadius: 8,
	backgroundColor: '#ff0',
	borderColor: '#aaa',
	borderWidth: 1
    },
    cart_badge: {
	fontSize: 12,
	fontWeight: 'bold',
	color: '#888',
	alignSelf: 'center',
	justifyContent: 'center',
    },

})
