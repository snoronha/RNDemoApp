import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MoreScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tile_row}>
        <View style={styles.tile}>
          <TouchableOpacity
            style={styles.tile_image}
            onPress={() => {
              navigation.navigate('WebView', {
                url: 'https://www.walmart.com/order-ahead/cake#!/browse',
                showUrlBar: false,
                headerTitle: 'Cakes',
              });
            }}
            key={1}>
            <Icon name={'birthday-cake'} size={72} color={'tomato'} />
          </TouchableOpacity>
          <Text style={styles.tile_text}>Cakes</Text>
        </View>
        <View style={styles.tile}>
          <TouchableOpacity
            style={styles.tile_image}
            onPress={() => {
              navigation.navigate('WebView', {
                url:
                  'https://grocery.walmart.com/?_xf=dIUjO&wm_preview_date=1580760608359',
                showUrlBar: false,
                headerTitle: 'Groceries',
              });
            }}
            key={2}>
            <Icon name={'shopping-basket'} size={72} color={'#08f'} />
          </TouchableOpacity>
          <Text style={styles.tile_text}>Online Grocery</Text>
        </View>
      </View>
      <View style={styles.tile_row}>
        <View style={styles.tile}>
          <TouchableOpacity
            style={styles.tile_image}
            onPress={() =>
              navigation.navigate('WebView', {
                url: 'https://www.google.com',
                showUrlBar: true,
                headerTitle: 'Browser',
              })
            }
            key={3}>
            <Icon name={'chrome'} size={72} color={'#0c0'} />
          </TouchableOpacity>
          <Text style={styles.tile_text}>Browser</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#fff',
  },
  tile_row: {
    flex: 1,
    flexDirection: 'row',
  },
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
  tile_image: {
    width: Dimensions.get('window').width * 0.45,
    height: Dimensions.get('window').width * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 20,
    shadowColor: '#aaa',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.7,
  },
  tile_text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
