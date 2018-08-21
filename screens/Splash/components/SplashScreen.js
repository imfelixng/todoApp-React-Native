import React, { Component } from 'react'
import {View, Text, Image, Dimensions, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-navigation';

import firebase from 'firebase/app';
import 'firebase/auth'

export default class SplashScreen extends Component {

  static navigationOptions = ({navigation}) => {
      let header = null;
      return {header}
  }  

  constructor(props) {
      super(props);
      this.state = {
          isLoading: false
      }
  }

  componentDidMount() {
    
    this.setState({
        isLoading: true
    })

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {

            this.props.navigation.navigate('Main');
        } else {

            this.props.navigation.navigate('Auth');
        }
    });
  }

  render() {
    let screen = Dimensions.get('screen');
    return (

        <SafeAreaView
            style = {{flex: 1, alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#FFEEEE'}}
            >
                <View
                    style = {
                        {
                            justifyContent: 'center', 
                            alignItems: 'center',
                            flex: 1
                        }
                    }
                >
                    <Image
                        source = {require('@assets/images/img_logo.png')}
                        style = {{width : 122, height: 157}}
                    />
                    <Text
                        style = {{fontWeight: 'bold', fontSize: 36, color: '#243B6B'}}
                    >candy</Text>
                    <Text
                        style = {{fontWeight: '400', fontSize: 12, color: '#243B6B', marginTop: 30}} 
                    >Simple task manager</Text>
                </View>
                {
                    
                    <ActivityIndicator
                        size = 'large'
                    />
                }
                <Text
                    style = {{fontWeight: '300', fontSize: 12, color: '#243B6B', margin: 20}}   
                >© 2017 Candy</Text>
        </SafeAreaView>
    )
  }
}
