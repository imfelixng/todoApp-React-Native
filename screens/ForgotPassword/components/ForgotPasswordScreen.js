import React, { Component } from 'react'
import {View, Text, Dimensions, ScrollView} from 'react-native';
import TextInputItem from '@common/TextInputItem';
import ButtonItem from '@common/ButtonItem';

import firebase from 'firebase/app';
import 'firebase/auth';

export default class ForgotPasswordScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    let headerStyle = {
      backgroundColor: '#FFEEEE',
    }

    return {headerStyle}
  }

  state = {
    email: '',
    emailInvaild: false,
    isLoading: false
  }

  _onForgot = () => {

    if(this.state.isLoading) {
      return ;
    }

    this.setState({
      isLoading: true
    })

    let {email} = this.state;
    if(email.trim() === '') {
      this.setState({
        emailInvaild: true
      });

    }else{
      this.setState({
        emailInvaild: false
      });
    }

    if(email.trim() !== '') {
      firebase.auth().sendPasswordResetEmail(email)
      .then(res => {
        this.setState({
          isLoading: false
        })
        alert('Please check your mailbox!')
      })
      .catch(err => {
        this.setState({
          isLoading: false
        })
        alert(err.message)
      });
    } else {
      this.setState({
        isLoading: true
      })
    }
  }

  render() {
    let screen = Dimensions.get('screen');
    return (
      <View
        style = {{flex: 1, alignItems: 'center', backgroundColor: '#FFEEEE'}}
      >
        <Text
          style = {
            {
              color: '#243B6B',
              fontSize: 20,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginTop: 20,
              marginBottom: 20,
              letterSpacing: 5
            }
          }
        >Forgot Password</Text>

        <ScrollView
        >

        <View
          style = {
            {
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              width: screen.width
            }
          }
        >
          <View
          style = {
            {
              width: screen.width - 64,
              marginBottom: 30,
              marginTop: 30
            }
          }
        >
          <Text
            style = {
              {
                color: '#243B6B',
                fontSize: 16,
                marginBottom: 10
              }
            }
          >Email</Text>
          <TextInputItem
            width = {screen.width - 64}
            invaild = {this.state.emailInvaild}
            placeholder = "Email"
            value = {this.state.email}
            onChangeText = {
              (text) => {
                this.setState({
                  email: text
                })
              }
            }
          />
          {
            this.state.emailInvaild &&
            <Text
              style = {
                {
                  color: '#ff0000',
                  fontSize: 16,
                  marginTop: 10,
                  fontWeight: 'bold'
                }
              }
            >Please enter your email!</Text>
          }
        </View>
        
        <ButtonItem
          nameBtn = 'Submit'
          width = {screen.width - 64}
          backgroundColor = '#243B6B'
          textColor = '#fff'
          onPress = {this._onForgot}
          isLoading = {this.state.isLoading}
        />

        </View>
        </ScrollView>
      </View>
    )
  }
}
