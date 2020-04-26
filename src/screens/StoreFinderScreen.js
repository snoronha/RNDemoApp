import React, {useState, useEffect, useRef} from 'react';
import {
  Button,
  Dimensions,
  NativeModules,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import server from '../conf/server';
import {ScrollView} from 'react-native-gesture-handler';
import {Transitioning, Transition} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';

const Screen = Dimensions.get('window');

export function StoreFinderScreen(props) {
  // Example of Native Module talking to Calendar API. Commenting for now
  /*
  var CalendarManager = NativeModules.CalendarManager;
  CalendarManager.addEvent(
    'Birthday Party',
    '4 Privet Drive, Surrey',
    new Date().getTime(),
  );
  CalendarManager.findEvents((error, events) => {
    if (error) {
      console.error(error);
    } else {
      console.log('EVENTS: ', events);
    }
  });
  */

  let initLoc = [37.33459, -122.00919];
  const [isLoading, setLoading] = useState(false);
  const [stores, setStores] = useState([]);
  const [curLat, setLatitude] = useState(37.420814);
  const [curLng, setLongitude] = useState(-122.081949);
  const [region, setRegion] = useState({
    latitude: 37.36,
    longitude: -122.05,
    // latitudeDelta: 0.0422,
    // longitudeDelta: 0.0421,
  });
  let pos = {latitude: curLat, longitude: curLng};

  /*
  Geolocation.getCurrentPosition(info => {
    initLoc = [info.coords.latitude, info.coords.longitude];
    // console.log('SET COORDS: ', lat, lng, region);
  });
  */

  const changeLatitude = lat => {
    if (isNaN(lat)) {
      setLatitude(0);
    } else {
      setLatitude(lat);
    }
  };

  const changeLongitude = lng => {
    if (isNaN(lng)) {
      setLongitude(0);
    } else {
      setLongitude(lng);
    }
  };

  const getStores = () => {
    let getUrl = '';
    if (initLoc.length > 0 && curLat == 0) {
      getUrl = `${server.domain}/stores/${initLoc[0]}/${initLoc[1]}`;
    } else {
      getUrl = `${server.domain}/stores/${curLat}/${curLng}`;
    }
    // console.log('Fetching from: ', getUrl);
    fetch(getUrl)
      .then(response => response.json())
      .then(json => {
        setStores(json.stores);
        // console.log('len(stores) = ' + json.stores.length);
      })
      .catch(error => console.log(error + ' (StoreFinder: getStores)'))
      .finally(() => setLoading(false));
  };

  // hook to fetch /store data
  useEffect(() => {
    setTimeout(getStores, 250);
  }, [isLoading]);

  const onRegionChange = region => {
    console.log('Setting Region:', region);
    setRegion({region});
  };

  const onMarkerPress = id => {
    if (this.scrollView) {
      this.scrollView.scrollTo({x: id * 200});
    }
  };

  const searchLocation = () => {
    console.log('Searching (' + pos.latitude + ',' + pos.longitude + ')');
    this.map.animateCamera({center: {latitude: curLat, longitude: curLng}});
    setLoading(true); // force re-render
  };

  // Experimental use of react-native-reanimated
  this.ref = useRef();
  const transition = (
    <Transition.Together>
      <Transition.Out type="scale" durationMs={500} />
      <Transition.Out type="fade" durationMs={500} />
      <Transition.Change type="scale" durationMs={500} />
      <Transition.Change type="fade" durationMs={500} />
    </Transition.Together>
  );
  let [showText, setShowText] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{flexDirection: 'row', height: 48}}>
          <TextInput
            style={[
              styles.text_input,
              {width: Screen.width * 0.35, height: 36, margin: 8},
            ]}
            placeholder="Latitude"
            placeholderTextColor="#aaa"
            maxLength={20}
            autoCapitalize="none"
            onChangeText={lt => changeLatitude(parseFloat(lt))}
          />
          <TextInput
            style={[
              styles.text_input,
              {width: Screen.width * 0.35, height: 36, margin: 8},
            ]}
            placeholder="Longitude"
            placeholderTextColor="#aaa"
            maxLength={20}
            autoCapitalize="none"
            onChangeText={ln => changeLongitude(parseFloat(ln))}
          />
          <TouchableOpacity
            onPress={() => searchLocation('GO!')}
            style={[styles.item_touchable, {width: 40}]}>
            <Text>Go</Text>
          </TouchableOpacity>
        </View>
        {/* MapView */}
        <MapView
          ref={el => (this.map = el)}
          initialRegion={{
            latitude: curLat,
            longitude: curLng,
            latitudeDelta: 0.4,
            longitudeDelta: 0.4,
          }}
          zoomEnabled={true}
          style={styles.map}>
          {stores &&
            stores.map((store, idx) => (
              <Marker
                key={idx.toString()}
                coordinate={{latitude: store.lat, longitude: store.lng}}
                title={store.vicinity.split(',')[0]}
                description={store.vicinity.split(',')[1]}
                onPress={() => onMarkerPress(idx)}
              />
            ))}
        </MapView>
        {/* ScrollView for the store details */}
        <Transitioning.View
          style={{
            width: Screen.width * 0.96,
            height: Screen.height * 0.25,
            marginTop: 8,
          }}
          ref={ref}
          transition={transition}>
          {showText && (
            <ScrollView horizontal={true} ref={el => (this.scrollView = el)}>
              {stores.map((store, routeIdx) => (
                <View key={routeIdx.toString()} style={styles.tile}>
                  <Text style={styles.text_header}>
                    {store.vicinity.split(',')[1]}
                  </Text>
                  <Text style={[styles.text_line, {height: 16}]}>
                    {store.vicinity.split(',')[0]}
                  </Text>
                  <Text style={styles.text_line}>
                    Loc: ({store.lat.toFixed(4)}, {store.lng.toFixed(4)})
                  </Text>
                </View>
              ))}
            </ScrollView>
          )}
          <Button
            title="show or hide"
            color="#FF5252"
            onPress={() => {
              ref.current.animateNextTransition();
              setShowText(!showText);
            }}
          />
        </Transitioning.View>
      </View>
    </SafeAreaView>
  );
}

/*
<Marker
  coordinate={{
    latitude: 37.3231123,
    longitude: -121.9401324,
  }}
  centerOffset={{x: -18, y: -60}}
  anchor={{x: 0.69, y: 1}}>
  <Icon name={'shopping-cart'} size={18} color={'red'} />
  <Callout style={styles.plainView}>
    <View>
      <Text style={{fontSize: 12}}>San Jose Market</Text>
    </View>
  </Callout>
</Marker>
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
  },
  header: {
    fontFamily: 'Verdana',
    color: 'black',
    alignSelf: 'stretch',
    textAlign: 'center',
    padding: 5,
    marginBottom: 5,
    fontSize: 20,
    backgroundColor: '#ffa',
  },
  map: {
    borderColor: '#ddd',
    borderRadius: 4,
    borderWidth: 1,
    width: Screen.width * 0.96,
    height: Screen.height * 0.5,
  },
  plainView: {
    height: 40,
    width: 80,
  },
  text_input: {
    borderColor: 'gray',
    backgroundColor: '#eee',
    paddingLeft: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  item_touchable: {
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 36,
    margin: 8,
    color: '#aaa',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#eee',
    justifyContent: 'center',
  },
  tile: {
    width: 200,
    height: Screen.height * 0.25,
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  text_header: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
  },
  text_line: {
    fontSize: 14,
    color: '#888',
    margin: 8,
  },
});
