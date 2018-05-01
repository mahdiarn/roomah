import React, { Component } from 'react';
import {  TextInput,View, TouchableOpacity } from 'react-native';
import Style from '../styles/Style'
// You can import from local files

// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // Version can be specified in package.json

export default class Login extends Component { 
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }
  
  _login() {
    let username = this.state.username;
    let password = this.state.password;
    let result = 'Username:' + username + ' Password:' + password;
    Alert.alert(result);
  }
  render() {
    return (
      <View>
        <TextInput
          style={Style.input}
          ref= {(el) => { this.username = el; }}
          onChangeText={ username => this.setState({ username }) }
          value={this.state.username}
          placeholder="Username"
        />

        <TextInput
          style={Style.input}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          secureTextEntry={true}
          placeholder="Password"
        />
        
      </View>
      );
  }
}