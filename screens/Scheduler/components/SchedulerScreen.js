import React, { Component } from 'react';
import {View, Text, Image} from 'react-native';
import Banner from '@common/Banner';

export default class SchedulerScreen extends Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        let tabBarIcon = () => {
            return <Image
                source = {require('@assets/icons/ic_clock.png')}
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
                    title = "Upcoming tasks —"
                />
               <Text>
                This is SchedulerScreen
               </Text> 
            </View>
        );
    }
}
