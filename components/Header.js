import React, { useState, PureComponent, Component } from 'react'
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

    return (
      <TouchableOpacity
        style = {styles.cart}
        hitSlop = {{top: 10, left: 10, bottom: 10, right: 10}}
        onPress = {this.goToCart}>
        <Icon name={'shopping-cart'} size={30} color={'#888'}/>
      </TouchableOpacity>
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
	marginRight: 12
      },

})
