import React from 'react'
import {TextInput} from 'react-native';
const TextInputItem = (props) => {
  return (
    <TextInput
        
        style = {
            {
                height: 51,
                borderRadius: 8,
                backgroundColor: '#fff',
                width: props.width,
                borderColor: props.invaild ? '#ff0000' : "#fff",
                borderWidth: 1,
                paddingLeft: 10,
                paddingRight: 0,
                fontSize: 18
            }
        }
        placeholder = {props.placeholder}
        value = {props.value}
        onChangeText = {(text) => props.onChangeText(text)}
        secureTextEntry = { props.show !== undefined && !props.show}
    />
  )
}

export default TextInputItem;
