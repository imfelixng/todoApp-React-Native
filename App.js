import React, {Component} from 'react';
import {
  StyleSheet, View, Text,
  TouchableWithoutFeedback, Image, TouchableOpacity
} from 'react-native';
import fbConnect from '@configs/firebase';
import SplashScreen from '@screens/Splash/components/SplashScreen';

import LoginScreen from '@screens/Login/components/LoginScreen';
import RegisterScreen from '@screens/Register/components/RegisterScreen';
import ForgotPasswordScreen from '@screens/ForgotPassword/components/ForgotPasswordScreen';

import ListScreen from '@screens/List/components/ListScreen';
import SchedulerScreen from '@screens/Scheduler/components/SchedulerScreen';
import NotificationsScreen from '@screens/Notifications/components/NotificationsScreen';
import ProfileScreen from '@screens/Profile/components/ProfileScreen';

import NewTaskScreen from '@screens/NewTask/components/NewTaskScreen';

import firebase from 'firebase/app';
import 'firebase/firestore';

import {createStackNavigator, createSwitchNavigator, createMaterialTopTabNavigator } from 'react-navigation';

const AuthenticationNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Register: {
    screen: RegisterScreen
  },
  ForgotPassword: {
    screen: ForgotPasswordScreen
  }
})

const CustomTabBar = ({
    navigation,
    navigationState,
    renderIcon,
    activeTintColor,
    inactiveTintColor,
  }) => {

    let result = navigationState.routes.map((route, idx) => {
    const color = navigationState.index === idx ? activeTintColor : inactiveTintColor;
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate(route.routeName);
          }}
          key={route.routeName}
        >
          <View
          style={
            {
              flex: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomColor: '#243B6B',
              borderBottomWidth: navigationState.index === idx ? 5 : 0
            }
          }
          >
            <Text style={{ color }}>
              {renderIcon({ route })}
            </Text>
          </View>

        </TouchableWithoutFeedback>
      );

  });

  let FAB = <View
    style = {
      {
        flex: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }
    }
    key = "Add"
  >
    <TouchableWithoutFeedback
      onPress = {
        () => {
          navigation.navigate('NewTask')
        }
      }
    >
      <View
        style = {
          {
            width: 72,
            height: 72,
            borderRadius: 50,
            backgroundColor: '#243B6B',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -40,
            shadowOffset: {
              height: 5
            },
            shadowOpacity: 0.7,
            shadowColor: '#243B6B',
            shadowRadius: 10
          }
        }
      >
        <Image
          source = {
            require('@assets/icons/ic_add.png')
          }

          style = {
            {
              height: 26,
              width: 26
            }
          }
        />
      </View>
    </TouchableWithoutFeedback>
  </View>

  result.splice(2,0,FAB);

  return (
    <View style={
      {
        flexDirection: 'row',
        height: 64,
        backgroundColor: '#FFE6E6',
      }
    }>
      {result}
    </View>
  );
}

const TabBarNavigator = createMaterialTopTabNavigator(
  {
      List: ListScreen,
      Scheduler: SchedulerScreen,
      Notifications: NotificationsScreen,
      Profile: ProfileScreen
  },
  {
    tabBarPosition: 'bottom',    
    animationEnabled: true,
    swipeEnabled: true,
    tabBarComponent: CustomTabBar,
    tabBarOptions: {
        activeTintColor: '#243B6B',
        inactiveTintColor: '#243B6B',
        showIcon: true,
        showLabel: false,
        style: {
          backgroundColor: '#FFE6E6',
          paddingTop: 10,
          paddingBottom: 10 
        },
        indicatorStyle: {
          height: 4,
          backgroundColor: '#243B6B'
        }
    }  
  }
)

TabBarNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];

  let headerTitle = routeName.toLowerCase() === 'list' ? 'to - do' : routeName;
  let headerTitleStyle = {
    color: '#243B6B',
    textTransform: 'uppercase',
    letterSpacing: 4
  }

  let headerLeft = <TouchableOpacity
    onPress = {
      () => {
        alert('Menu');
      }
    }
    style = {
      {
        marginLeft: 15
      }
    }
  >
    <Image
      source = {require('@assets/icons/ic_menu.png')}
      style = {
        {
          height: 20,
          width: 24
        }
      }
    />
  </TouchableOpacity>;

  let headerRight = <TouchableOpacity
    onPress = {
      () => {
        routeName.toLowerCase() === 'profile' ? alert('Edit') : alert('Search');
      }
    }
    style = {
      {
        marginRight: 15
      }
    }
  >
    <Image
      source = {routeName.toLowerCase() === 'profile' ? require('@assets/icons/ic_edit.png') : require('@assets/icons/ic_search.png')}
      style = {
        {
          height: 24,
          width: 24
        }
      }
    />
  </TouchableOpacity>;

  let headerStyle = {
    backgroundColor: '#FFE6E6',
    marginTop: 10,
    shadowColor: '#FBE2E2',

  }


  return {
    headerTitle,
    headerTitleStyle,
    headerLeft,
    headerRight,
    headerStyle,
  };
};

const MainNavigator = createStackNavigator({
  TabBar: TabBarNavigator,
  NewTask: NewTaskScreen
})

const AppNavigator = createSwitchNavigator({
  Splash: {
    screen: SplashScreen
  },
  Auth: AuthenticationNavigator,
  Main: MainNavigator
});

export default class App extends Component {

  constructor(props) {
    super(props);

    const settings = {
        timestampsInSnapshots: true
    };

    firebase.firestore().settings(settings);

  }

  render() {
    return (
      <AppNavigator />
    );
  }
}


