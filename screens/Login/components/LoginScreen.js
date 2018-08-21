import React, { Component } from 'react'
import {View, Text, Dimensions, Image, TouchableOpacity, ScrollView, } from 'react-native';
import TextInputItem from '@common/TextInputItem';
import ButtonItem from '@common/ButtonItem';

import firebase from 'firebase/app';
import 'firebase/auth';

import {SafeAreaView, } from 'react-navigation';

export default class LoginScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    header = null
    return {header}

  }

  state = {
    email: '',
    emailInvaild: false,
    password: '',
    passwordInvaild: false,
    passwordShow: false,
    isLoading: false
  }

  _onLogin = () => {

    if(this.state.isLoading) {
      return ;
    }

    this.setState({
      isLoading: true
    })
    let {email, password} = this.state;
    if(email.trim() === '') {
      this.setState({
        emailInvaild: true
      });

    }else{
      this.setState({
        emailInvaild: false
      });
    }

    if(password.trim() === '') {
      this.setState({
        passwordInvaild: true
      })

    }else{
      this.setState({
        passwordInvaild: false
      });
    }

    if(email.trim() !== '' && password.trim() !== '') {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        this.setState({
          isLoading: false
        })
        this.props.navigation.navigate('Main');
      })
      .catch(err => {
        this.setState({
          isLoading: false
        })
        alert(err.message)
      });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  _onLoginFB = () => {
    alert('Login Facebook');
  }

  _onLoginGG = () => {

    alert('aaa');
  };

  render() {
    
    let screen = Dimensions.get('screen');
    return (
      <SafeAreaView
        style = {{flex: 1, alignItems: 'center', backgroundColor : '#FFEEEE'}}
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
        >Login</Text>

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
        <View
          style = {
            {
              width: screen.width - 64,
              marginTop: 20,
              marginBottom: 50
            }
          }
        >
          <View
            style = {
              {
                flexDirection: 'row',
                justifyContent: 'space-between'
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
            >Password</Text>
            <Text
              style = {
                {
                  color: '#243B6B',
                  fontSize: 16,
                  marginBottom: 10,
                  textDecorationLine: 'underline',
                  fontWeight: '200'
                }
              }

              onPress = {() => {
                this.props.navigation.navigate('ForgotPassword');
              }}
            >Forgot?</Text>
          </View>
          <View
              style = {
                {
                  position: 'relative'
                }
              }
          >
            <TextInputItem
              show = {this.state.passwordShow}
              width = {screen.width - 64}
              invaild = {this.state.passwordInvaild}
              placeholder = "Password"
              value = {this.state.password}
              onChangeText = {
                (text) => {
                  this.setState({
                    password: text
                  })
                }
              }
            />
            {
              !this.state.passwordShow ?
                <TouchableOpacity
                  onPress = {
                    () => {
                      this.setState({
                        passwordShow: !this.state.passwordShow
                      })
                    }
                  }

                  style = {
                    {
                      position: 'absolute',
                      right: 10,
                      top: 10
                    }
                  }
                >
                  <Image
                    source = {
                      require('@assets/icons/ic_show.png')
                    }
                    style = {
                      {
                        width: 32,
                        height: 32,
                      }
                    }
                  />
                </TouchableOpacity>
                :
                <TouchableOpacity
                onPress = {
                  () => {
                    this.setState({
                      passwordShow: !this.state.passwordShow
                    })
                  }
                }

                style = {
                  {
                    position: 'absolute',
                    right: 10,
                    top: 10
                  }
                }
              >
                <Image
                  source = {
                    require('@assets/icons/ic_hide.png')
                  }
                  style = {
                    {
                      width: 32,
                      height: 32,
                    }
                  }
                />
              </TouchableOpacity>
            }
          </View>
          {
            this.state.passwordInvaild &&
            <Text
              style = {
                {
                  color: '#ff0000',
                  fontSize: 16,
                  marginTop: 10,
                  fontWeight: 'bold'
                }
              }
            >Please enter your password!</Text>
          }
        </View>

        <ButtonItem
          nameBtn = 'Login'
          width = {screen.width - 64}
          backgroundColor = '#243B6B'
          textColor = '#fff'
          onPress = {this._onLogin}
          isLoading = {this.state.isLoading}
        />

        <View
          style = {
            {
              marginTop: 20
            }
          }
        >
          <Text
            style = {
              {
                fontSize: 16,
                color: '#243B6B',
                fontWeight: 'bold',
                marginBottom: 20
              }
            }
          >Or login with: </Text>
          <ButtonItem
            nameBtn = 'Facebook'
            textColor = '#fff'
            backgroundColor = '#39579b'
            width = {screen.width - 64}
            onPress = {this._onLoginFB}
          />
          <View
            style = {
              {
                marginBottom: 20
              }
            }
          ></View>
          <ButtonItem
            nameBtn = 'Google'
            textColor = '#fff'
            backgroundColor = '#cf4332'
            width = {screen.width - 64}
            onPress = {this._onLoginGG}
          />
        </View>

        <Text
          style = {
            {
              fontSize: 16,
              color: '#243B6B',
              fontWeight: 'bold',
              textDecorationLine: 'underline',
              marginTop: 50,
              marginBottom: 20
            }
          }

          onPress = {() => {
            this.props.navigation.navigate('Register');
          }}

        >New User? Register Here</Text>
        </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
