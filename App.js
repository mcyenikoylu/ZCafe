/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert, TextInput} from 'react-native';
import firebase from 'firebase';
import dbconfig from './dbconfig';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

//type Props = {};
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }

  _onPressButton() {
    Alert.alert(this.state.text)
  }

  _onPressInsert() {
    firebase.database().ref('users/008').set(
      {
        name: 'new insert ' ,//+ this.state.text,
        age: 61
      }
    ).then(() => {
      console.log('INSERTED!');
    }).catch((error) => {
      console.log(error);
    })
  }
  _onPressUpdate() {
    firebase.database().ref('users/006').update({
      name: 'new update'
    });
  }
  _onPressDelete() {
    firebase.database().ref('users/006/name').remove();
  }

componentWillMount()  {
  var config = dbconfig;

  firebase.initializeApp(config);
  console.log(firebase);


  firebase.database().ref('users').on('value', (data) => {
    console.log(data.toJSON());
  })
  
// setTimeout(() => {
//   firebase.database().ref('users/005').set(
//     {
//       name: 'vedat',
//       age: 61
//     }
//   ).then(() => {
//     console.log('INSERTED!');
//   }).catch((error) => {
//     console.log(error);
//   })
// }, 5000);

    
 
    

  

}
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button
            onPress={this._onPressButton}
            title="Press Me"
          />

<TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
<Button
            onPress={this._onPressInsert}
            title="Insert"
          />

<Button
            onPress={this._onPressUpdate}
            title="Update"
          />

<Button
            onPress={this._onPressDelete}
            title="Delete"
          />
      </View>
    );
  }
}


 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
