import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

const HamburgerScreen = () => {
  return (
    <View>
      <Text>Hamburger Menu Here</Text>
    </View>
  );
};

export default HamburgerMenu = () => {
  const Drawer = createDrawerNavigator();

  const HamburgerPlusScreen = () => {
    return (
      <Drawer.Navigator
        drawerPosition={'left'}
        drawerContent={() => <HamburgerScreen />}>
        <Drawer.Screen name="Hamburger" component={HamburgerScreen} />
      </Drawer.Navigator>
    );
  };

  const navigation = useNavigation();
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.hamburger}
        hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
        onPress={toggleDrawer}>
        <Icon name={'bars'} size={24} color={'#888'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hamburger: {
    alignSelf: 'center',
    marginLeft: 12,
    zIndex: 0,
  },
});
