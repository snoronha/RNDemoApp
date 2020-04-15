import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Home} from './src/screens/home/Home';
import {Favorites} from './src/screens/favorites/Favorites';
import {Search} from './src/screens/search/Search';
import {More} from './src/screens/more/More';
import {StoreFinderScreen} from './src/screens/StoreFinderScreen';

import {HeaderBackLink} from './src/components/header/HeaderBackLink';
import {IconWithBadge} from './src/components/footer/IconWithBadge';

//-------- REDUX ---------//
import {Provider} from 'react-redux';
import store from './src/stores/store';

// Hack to ensure FontAwesome loads
Icon.loadFont();

const StoreFinderStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StoreFinder = () => {
  return (
    <StoreFinderStack.Navigator>
      <StoreFinderStack.Screen
        name="More"
        component={StoreFinderScreen}
        options={{
          headerLeft: () => {
            return <HeaderBackLink />;
          },
          headerTitle: 'Store Finder',
        }}
      />
    </StoreFinderStack.Navigator>
  );
};

export default (App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home';
                  return <Icon name={iconName} size={size} color={color} />;
                } else if (route.name === 'Search') {
                  iconName = focused ? 'search' : 'search';
                  return <Icon name={iconName} size={size} color={color} />;
                } else if (route.name === 'Favorites') {
                  iconName = focused ? 'heart' : 'heart-o';
                  return (
                    <IconWithBadge
                      name={iconName}
                      size={size}
                      color={color}
                      badgeCount={3}
                    />
                  );
                } else if (route.name === 'StoreFinder') {
                  iconName = focused ? 'map-marker' : 'map-marker';
                  return <Icon name={iconName} size={size} color={color} />;
                } else if (route.name === 'NEW!') {
                  iconName = focused ? 'ellipsis-h' : 'ellipsis-h';
                  return <Icon name={iconName} size={size} color={color} />;
                }
                // return <Icon name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'black',
              tabStyle: {borderRightColor: '#eee', borderRightWidth: 1},
            }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Favorites" component={Favorites} />
            <Tab.Screen name="StoreFinder" component={StoreFinder} />
            <Tab.Screen name="NEW!" component={More} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
});
