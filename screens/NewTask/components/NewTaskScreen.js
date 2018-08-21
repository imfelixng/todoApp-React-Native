import React, { Component } from 'react';
import {View, Text, Image, 
    TouchableOpacity, Dimensions,
    Switch, ActivityIndicator} from 'react-native';
import Banner from '@common/Banner';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import firebase from 'firebase/app';
import 'firebase/firestore';

export default class NewTaskScreen extends Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        
        let headerLeft = <TouchableOpacity
        
            style = {
                {
                    marginLeft: 5
                }
            }

            onPress = {
                () => navigation.goBack()
            }

        >
            <Image
                source = {
                    require('@assets/icons/ic_back.png')
                }
                style = {
                    {
                        width: 26,
                        height: 26,
                        tintColor: '#243B6B'
                    }
                }
            />
        </TouchableOpacity>;
        let headerTitle = "New Task";
        let headerTitleStyle = {
            color: '#243B6B',
            textTransform: 'uppercase',
            letterSpacing: 4
        };
        let headerStyle = {
            backgroundColor: '#FFE6E6',
            marginTop: 10,
            shadowColor: '#FBE2E2',
        
        };

        return {headerLeft, headerTitle, headerTitleStyle, headerStyle};
    }

    state = {
        content: '',
        contentInvaild: false,
        date: '',
        dateInvaild: false,
        isDateTimePickerVisible: false,
        isAlarm: false,
        isNotification: false,
        isLoading: false
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  
    _handleDatePicked = (date) => {
     let day = date.getDate();
     let month  =date.getMonth();
     let year = date.getFullYear();
     let timesamp = new Date(`${year}/${month + 1}/${day}`).valueOf();
      this.setState({
        date: timesamp
      });
      this._hideDateTimePicker();
    };

    _toggleAlarm = () => this.setState({isAlarm: !this.state.isAlarm})

    _toggleNotification = () => this.setState({isNotification: !this.state.isNotification})

    _onAddNote = () => {
        this.setState({
            isLoading: true
        })
        let {content, date, isAlarm, isNotification} = this.state;
        if(content.trim() === '') {
        this.setState({
            contentInvaild: true
        });

        }else{
        this.setState({
            contentInvaild: false
        });
        }

        if(date === '') {
        this.setState({
            dateInvaild: true
        })

        }else{
        this.setState({
            dateInvaild: false
        });
        }

        if(content.trim() !== '' && date !== '') {
            let newNote = {
                noteId: new Date().valueOf(),
                content,
                date,
                isAlarm,
                isNotification
            }
            firebase.firestore().collection('notes').doc(date+ '').set(newNote).then(res => {
                this.setState({
                    isLoading: false
                })
                alert("Add note success!");
            }).catch(err => {
                this.setState({
                    isLoading: false
                })
                alert(err.message)
            })
        }
    }

    render() {
        let screen = Dimensions.get('screen');
        return (
            <View
                style = {
                    {
                        flex: 1,
                        backgroundColor: '#fff',
                        alignItems: 'center'
                    }
                }
            >
                <Banner
                    input = "Write here..."
                    multiline = {true}
                    numberOfLines = {4}
                    value = {this.state.content}
                    onChangeText = {
                        (text) => this.setState({content: text})
                    }
                    width = {screen.width}
                />
                {
                    this.state.contentInvaild &&
                    <Text
                      style = {
                        {
                          color: '#ff0000',
                          fontSize: 16,
                          marginTop: 10,
                          fontWeight: 'bold',
                          width: screen.width - 64,
                        }
                      }
                    >Please enter content for note!</Text>
                }
                <View
                style = {
                  {
                    width: screen.width - 64,
                    marginTop: 15
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
                >Complete by</Text>
                <Text
                  style = {
                      {
                        width : screen.width - 64,
                        color: '#243B6B32',
                        paddingTop: 17,
                        paddingBottom: 17,
                        paddingLeft: 10,
                        borderWidth: 1,
                        borderColor: '#243B6B32',
                        fontSize: 17,
                        borderRadius: 8
                      }
                  }
                  onPress = {this._showDateTimePicker}
                >
                {
                    this.state.date !== '' ? moment(this.state.date).format("DD/MM/YYYY") : 'Select a date'
                }
                </Text>
                {
                    this.state.dateInvaild &&
                    <Text
                      style = {
                        {
                          color: '#ff0000',
                          fontSize: 16,
                          marginTop: 10,
                          fontWeight: 'bold'
                        }
                      }
                    >Please select date!</Text>
                }
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    titleIOS = "Select a date"
                    minimumDate = {new Date()}
                />
              </View>
              <View
              style = {
                {
                  width: screen.width - 64,
                  marginTop: 30
                }
              }
            >
              <Text
                style = {
                  {
                    color: '#243B6B',
                    fontSize: 16,
                  }
                }
              >More Options</Text>
              <View
                style = {
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 40
                    }
                }
              >
                <Text
                    style = {
                        {
                            color: '#243B6B',
                            fontSize: 15,
                        }
                    }
                >
                    Save as alarm
                </Text>
                <Switch
                    value = {this.state.isAlarm}
                    onValueChange = {this._toggleAlarm}
                />
              </View>
              <View
              style = {
                  {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 30
                  }
              }
            >
              <Text
                style = {
                    {
                        color: '#243B6B',
                        fontSize: 15,
                    }
                }
              >
                  Show as notification
              </Text>
              <Switch
                  value = {this.state.isNotification}
                  onValueChange = {this._toggleNotification}
              />
            </View>
            </View>
            <View
                style = {
                    {
                        flex: 1,
                        justifyContent: 'flex-end'
                    }
                }
            >
                <TouchableOpacity
                    style = {
                        {
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#243B6B',
                            width: 72,
                            height: 72,
                            borderRadius: 36,
                            marginBottom: 20,
                        }
                    }
                    onPress = {this._onAddNote}
                >
                    {
                        this.state.isLoading ? 
                        <ActivityIndicator
                            size = 'small'
                        /> : <Image
                        source = {
                            require('@assets/icons/ic_check.png')
                        }
                        style = {
                            {
                                width: 18,
                                height: 14,
                                tintColor: '#fff',
                                
                            }
                        }
                    />
                    }
                    
                </TouchableOpacity>
            </View>
            </View>
        );
    }
}
