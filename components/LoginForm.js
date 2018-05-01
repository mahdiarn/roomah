import React, { Component } from 'react';
import { Alert, TextInput, View, StyleSheet } from 'react-native';
import Touchables from './Touchables';
import NavigationService from './NavigationService';

export default class LoginForm extends Component {

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
          style={styles.input}
          ref= {(el) => { this.username = el; }}
          onChangeText={ username => this.setState({ username }) }
          value={this.state.username}
          placeholder="Username"
        />

        <TextInput
          style={styles.input}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          secureTextEntry={true}
          placeholder="Password"
        />
        <Touchables text="Login" onPress={this._login.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
