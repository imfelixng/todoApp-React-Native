import React, { Component } from 'react';
import {View, Text, Image} from 'react-native';
import Banner from '@common/Banner';
const user = {
    uid: '1',
    name: 'Ngquangan',
    email: 'ngquangan@gmail.com',
    img_profile: 'https://firebasestorage.googleapis.com/v0/b/todoapp-ngquangan.appspot.com/o/img_user_profile.png?alt=media&token=ed750b7e-a62b-405b-94a9-284e13d43f20'
}

export default class ProfileScreen extends Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        let tabBarIcon = () => {
            return <Image
                source = {require('@assets/icons/ic_user.png')}
                style = {
                    {
                        width: 26,
                        height: 26,
                    }
                }
            />;
        
        }

        return {tabBarIcon};
    }

    render() {
        return (
            <View
                style = {
                    {
                        flex: 1,
                        backgroundColor: 'purple'
                    }
                }
            >
                <Banner
                    user = {user}
                />
               <Text>
                This is ProfileScreen
               </Text> 
            </View>
        );
    }
}
