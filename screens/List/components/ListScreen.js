import React, { Component } from 'react';
import {View, Text, Image,
    FlatList
} from 'react-native';

import Banner from '@common/Banner';

let notes = [
    {
        id: 1,
        content: 'Nội dung ghi chú 1',
        isCompleted: false
    },
    {
        id: 2,
        content: 'Nội dung ghi chú 2',
        isCompleted: true
    },
    {
        id: 3,
        content: 'Nội dung ghi chú 3',
        isCompleted: false
    },
    {
        id: 4,
        content: 'Nội dung ghi chú 4',
        isCompleted: false
    }
]

class ListScreen extends Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        let tabBarIcon = () => {
            return <Image
                source = {require('@assets/icons/ic_list.png')}
                style = {
                    {
                        width: 32,
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
                        backgroundColor: '#fff'
                    }
                }
            >
                <Banner
                    title = "Today’s list —"
                />
               <FlatList
               
                    data = {notes}

                    renderItem = {
                        ({item, index}) => {
                            return <View
                                style = {
                                    {
                                        marginTop: 20,
                                        marginBottom: 20,
                                        flexDirection: 'row'
                                    }
                                }
                            >
                                <View
                                    style = {
                                        {
                                            width: 24,
                                            height: 24,
                                            backgroundColor: item.isCompleted ? '#93FFDF' : '#FFF',
                                            borderRadius: 9,
                                            marginRight: 30,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderColor: '#93FFDF',
                                            borderWidth: 2
                                        }
                                    }
                                >
                                
                                    {
                                        item.isCompleted && 
                                        <Image
                                            source = {
                                                require('@assets/icons/ic_check.png')
                                            }
                                            style = {
                                                {
                                                    width: 10,
                                                    height: 10
                                                }
                                            }
                                        />
                                    }

                                </View>
                                <Text
                                    style = {
                                        {
                                            color: !item.isCompleted ? '#243B6B' : 'grey',
                                            fontSize: 16,
                                            fontWeight: '300'
                                        }
                                    }
                                >{item.content}</Text>

                            </View>
                        }
                    }

                    style = {
                        {
                            marginLeft: 30,
                            flex: 1
                        }
                    }

                    keyExtractor = {
                        (item, index) => index.toString()
                    }

               />
            </View>
        );
    }
}

export default ListScreen;