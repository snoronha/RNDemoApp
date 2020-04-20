import React, {useState} from 'react';
import {Dimensions, Platform, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export function HeaderSearchBar() {
  const dispatch = useDispatch();
  const [searchKwds, setSearchKwds] = useState('');
  const onChangeText = text => {
    setSearchKwds(text);
  };
  const Screen = Dimensions.get('window')
  const navigation = useNavigation();
  const onSubmitEditing = evt => {
    dispatch({
      type: 'SET_SEARCH_KWDS',
      payload: {searchKwds: evt.nativeEvent.text},
    });
    // navigation.navigate('Search', {searchKwds: evt.nativeEvent.text});
  };
  let borderRadius = Platform.OS === 'ios' ? 10 : 0;
  return (
    <TextInput
      style={{
        width: Screen.width * 0.7,
        borderColor: 'gray',
        backgroundColor: '#eee',
        paddingLeft: 8,
        borderRadius: borderRadius,
        justifyContent: 'center',
        borderWidth: 1,
        height: 36,
        marginRight: 8,
      }}
      onChangeText={text => onChangeText(text)}
      onSubmitEditing={text => onSubmitEditing(text)}
      placeholder="Search"
      placeholderTextColor="#aaa"
      maxLength={40}
      autoCapitalize="none"
    />
  );
}
