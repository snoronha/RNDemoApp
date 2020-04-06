import React, {useState} from 'react';
import {Dimensions, StyleSheet, Switch, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default SortFilterScreen = () => {
  const [collapse1, setCollapse1] = useState(false);
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(false);
  const [switch3, setSwitch3] = useState(false);
  const [switch4, setSwitch4] = useState(false);

  const toggleCollapse1 = () => {
    setCollapse1(!collapse1);
  };

  const toggleSwitch1 = itemValue => {
    if (itemValue) {
      setSwitch2(false);
      setSwitch3(false);
      setSwitch4(false);
    }
    setSwitch1(itemValue);
  };
  const toggleSwitch2 = itemValue => {
    if (itemValue) {
      setSwitch1(false);
      setSwitch3(false);
      setSwitch4(false);
    }
    setSwitch2(itemValue);
  };
  const toggleSwitch3 = itemValue => {
    if (itemValue) {
      setSwitch1(false);
      setSwitch2(false);
      setSwitch4(false);
    }
    setSwitch3(itemValue);
  };
  const toggleSwitch4 = itemValue => {
    if (itemValue) {
      setSwitch1(false);
      setSwitch2(false);
      setSwitch3(false);
    }
    setSwitch4(itemValue);
  };
  return (
    <View style={styles.container}>
      <View style={styles.section_header}>
        <View style={styles.switch_text_container}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Sort by</Text>
        </View>
        <TouchableOpacity onPress={toggleCollapse1}>
          {collapse1 ? (
            <Icon name={'angle-up'} size={30} color={'blue'} />
          ) : (
            <Icon name={'angle-down'} size={30} color={'blue'} />
          )}
        </TouchableOpacity>
      </View>
      {!collapse1 && (
        <View>
          <View style={styles.switch_row}>
            <Switch onValueChange={toggleSwitch1} value={switch1}></Switch>
            <View style={[styles.switch_text_container, {marginLeft: 12}]}>
              {switch1 ? (
                <Text style={{fontWeight: 'bold'}}>Best match</Text>
              ) : (
                <Text>Best match</Text>
              )}
            </View>
          </View>
          <View style={styles.switch_row}>
            <Switch onValueChange={toggleSwitch2} value={switch2}></Switch>
            <View style={[styles.switch_text_container, {marginLeft: 12}]}>
              {switch2 ? (
                <Text style={{fontWeight: 'bold'}}>Best sellers</Text>
              ) : (
                <Text>Best sellers</Text>
              )}
            </View>
          </View>
          <View style={styles.switch_row}>
            <Switch onValueChange={toggleSwitch3} value={switch3}></Switch>
            <View style={[styles.switch_text_container, {marginLeft: 12}]}>
              {switch3 ? (
                <Text style={{fontWeight: 'bold'}}>Price: low to high</Text>
              ) : (
                <Text>Price: low to high</Text>
              )}
            </View>
          </View>
          <View style={styles.switch_row}>
            <Switch onValueChange={toggleSwitch4} value={switch4}></Switch>
            <View style={[styles.switch_text_container, , {marginLeft: 12}]}>
              {switch4 ? (
                <Text style={{fontWeight: 'bold'}}>Price: high to low</Text>
              ) : (
                <Text>Price: high to low</Text>
              )}
            </View>
          </View>
        </View>
      )}
      <View style={[styles.divider, {marginTop: 8}]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  section_header: {
    width: Dimensions.get('window').width * 0.6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  switch_row: {
    width: Dimensions.get('window').width * 0.6,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  switch_text_container: {
    flex: 1,
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
  },
});
