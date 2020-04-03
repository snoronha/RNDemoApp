import React, {useState} from 'react';
import {Dimensions, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';

export function HeaderSearchBar() {
  const dispatch = useDispatch();
  const [searchKwds, setSearchKwds] = useState('');
  const onChangeText = text => {
    setSearchKwds(text);
  };
  const onSubmitEditing = evt => {
    // dispatch 'SET_SEARCH_KWDS' (redux) event
    dispatch({
      type: 'SET_SEARCH_KWDS',
      payload: {searchKwds: evt.nativeEvent.text},
    });
  };
  return (
    <TextInput
      style={[
        {
          width: Dimensions.get('window').width * 0.7,
          borderColor: 'gray',
          backgroundColor: '#eee',
          paddingLeft: 5,
          borderRadius: 10,
          borderWidth: 1,
          height: 35,
          marginRight: 8,
        },
      ]}
      onChangeText={text => onChangeText(text)}
      onSubmitEditing={text => onSubmitEditing(text)}
      placeholder="Search"
      placeholderTextColor="#aaa"
      maxLength={40}
      autoCapitalize="none"
    />
  );
}
