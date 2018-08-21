import React from 'react'
import {View, Text, Image, TextInput} from 'react-native';

const Banner = (props) => {

  return (
    <View
    style = {
        {
            height: 112,
            backgroundColor: '#FFEEEE',
            justifyContent: 'center',
            width: props.width
        }
    }
   >
   {
       props.user && 
        <View
            style = {
                {
                    flexDirection: 'row'
                }
            }
        >
            <Image
                source = {
                    {
                        uri: props.user.img_profile
                    }
                }
                style = {
                    {
                        width: 56,
                        height: 56,
                        marginLeft: 32,
                        marginRight: 32,
                        borderRadius: 28 //width / 2 = height / 2
                    }
                }
            />
            <View>
                <Text
                    style = {
                        {
                            fontSize: 26,
                            fontWeight: 'bold',
                            color: '#243B6B',
                        }
                    }
                >
                    {props.user.name}
                </Text>
                <Text
                    style = {
                        {
                            fontSize: 16,
                            fontWeight: '300',
                            color: '#243B6B',
                            marginTop: 5
                        }
                    }
                >
                    {props.user.email}
                </Text>
            </View>
        </View> 
   }
   {
       props.title &&
       <Text
            style = {
                {
                    fontSize: 26,
                    marginLeft: 32,
                    fontWeight: 'bold',
                    color: '#243B6B',
                    width: 135
                }
            }
        >
            {props.title}
        </Text>
   }
   {
       props.input &&
       <TextInput
            {...props}
            placeholder = {props.input}
            style = {
                {
                    paddingLeft: 32,
                    paddingRight: 10,
                    fontSize: 26,
                    fontWeight: 'bold',
                }
            }
            placeholderTextColor = "#243B6B32"
            autoCapitalize = 'none'

       />
   }
   </View>
  )
}

export default Banner
