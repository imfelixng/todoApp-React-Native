import React, { Component } from 'react';
import {View, Text} from 'react-native';

import ListScreen from '@screens/List/components/ListScreen';
import SchedulerScreen from '@screens/Scheduler/components/SchedulerScreen';
import NotificationsScreen from '@screens/Notifications/components/NotificationsScreen';
import ProfileScreen from '@screens/Profile/components/ProfileScreen';

import {createMaterialTopTabNavigator} from 'react-navigation';

const MainNavigator = createMaterialTopTabNavigator(
    {
        List: ListScreen,
        Scheduler: SchedulerScreen,
        Notifications: NotificationsScreen,
        ProfileScreen: ProfileScreen
    },
    {
        tabBarPosition: 'top',
    }
)

export default class MainScreen extends Component {
    render() {
        return (
            <MainNavigator />
        );
    }
}
