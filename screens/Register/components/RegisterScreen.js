import React, { Component } from 'react'
import {View, Text, Dimensions, Image, TouchableOpacity, ScrollView} from 'react-native';
import TextInputItem from '@common/TextInputItem';
import ButtonItem from '@common/ButtonItem';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default class RegisterScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    let headerStyle = {
      backgroundColor: '#FFEEEE',
    }

    return {headerStyle}

  }

    constructor(props) {
        super(props);
    }

  state = {
    email: '',
    emailInvaild: false,
    password: '',
    passwordInvaild: false,
    passwordShow: false,
    confirm_password: '',
    confirm_passwordShow: false,
    confirm_passwordSuccessed: true,
    isLoading: false
  }

  _onReg = () => {

    if(this.state.isLoading) {
      return ;
    }

    this.setState({
      isLoading: true
    })

    let {email, password, confirm_password} = this.state;
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

    if(confirm_password.trim() === password.trim()) {
        this.setState({
            confirm_passwordSuccessed: true
        })
  
      }else{
        this.setState({
            confirm_passwordSuccessed: false
        });
    }

    if(email.trim() !== '' && password.trim() !== '' && confirm_password === password) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        let {uid, email} = res.user;
        firebase.firestore().collection('users').add({
            uid: uid,
            email: email
        }).then( () => {
            this.setState({
              isLoading: false
            })
            alert('Register successfully');
        })
      }).catch(err => {
        this.setState({
          isLoading: false
        })
        alert(err.message);
      });
    } else {
      this.setState({
        isLoading: false
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
        >Register</Text>

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

        <View
          style = {
            {
              width: screen.width - 64,
              marginTop: 20,
              marginBottom: 50
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
        >Confirm Password</Text>
          <View
              style = {
                {
                  position: 'relative'
                }
              }
          >
            <TextInputItem
              show = {this.state.confirm_passwordShow}
              width = {screen.width - 64}
              invaild = {!this.state.confirm_passwordSuccessed}
              placeholder = "Confirm Password"
              value = {this.state.confirm_password}
              onChangeText = {
                (text) => {
                  this.setState({
                    confirm_password: text
                  })
                }
              }
            />
            {
              !this.state.confirm_passwordShow ?
                <TouchableOpacity
                  onPress = {
                    () => {
                      this.setState({
                        confirm_passwordShow: !this.state.confirm_passwordShow
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
                        confirm_passwordShow: !this.state.confirm_passwordShow
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
                !this.state.confirm_passwordSuccessed &&
                <Text
                    style = {
                        {
                        color: '#ff0000',
                        fontSize: 16,
                        marginTop: 10,
                        fontWeight: 'bold'
                        }
                    }
                >Password and confirm password not matched!</Text>
            }

        </View>

        <ButtonItem
          nameBtn = 'Register'
          width = {screen.width - 64}
          backgroundColor = '#243B6B'
          textColor = '#fff'
          onPress = {this._onReg}
          isLoading = {this.state.isLoading}
        />

        <Text
          style = {
              {
                  width: screen.width - 150,
                  textAlign: 'center',
                  fontSize: 15,
                  fontWeight: '300',
                  marginTop: 30
              }
          }
        >
            By registering, you automatically accept the 
            <Text
                style = {
                    {
                        color: '#243B6B',
                        fontSize: 15,
                        fontWeight: '700',
                        textDecorationLine: 'underline'
                    }
                }
            > Terms & Policies </Text> 
            of candy app.
        </Text>

        <Text
          style = {
            {
              fontSize: 16,
              color: '#243B6B',
              fontWeight: 'bold',
              textDecorationLine: 'underline',
              marginTop: 40,
              marginBottom: 20
            }
          }

          onPress = {() => {
            this.props.navigation.goBack();
          }}

        >Have account? Log In</Text>
        </View>
        </ScrollView>
      </View>
    )
  }
}
