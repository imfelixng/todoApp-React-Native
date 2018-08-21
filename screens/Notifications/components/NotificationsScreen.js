import React, { Component } from 'react';
import {View, Text, Image} from 'react-native';
import Banner from '@common/Banner';

export default class NotificationsScreen extends Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        let tabBarIcon = () => {
            return <Image
                source = {require('@assets/icons/ic_bell.png')}
                style = {
                    {
                        width: 26,
                        height: 28,
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
                    title = "Alerts & updates —"
                />
               <Text>
                This is NotificationsScreen
               </Text> 
            </View>
        );
    }
}
