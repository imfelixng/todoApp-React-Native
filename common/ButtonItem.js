import React from 'react'
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';

const ButtonItem = (props) => {
  return (
    <TouchableOpacity
        style = {
            {
                backgroundColor : props.backgroundColor,
                height: 51,
                width: props.width,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center'
            }
        }

        onPress = {() => props.onPress()}
    >
    {
    props.isLoading ? 
        <ActivityIndicator
            size = "small"
        />
    :
        <Text
            style = {
                {
                    color: props.textColor,
                    fontSize: 16,
                    fontWeight: 'bold'
                }
            }
        >{props.nameBtn}</Text>

}
    </TouchableOpacity>
  )
}

export default ButtonItem
