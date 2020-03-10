import React from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Coin from '../components/Coin'

export default class CeliAppScreen extends React.Component {
    static navigationOptions = {
      title: 'CeliApp    ',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{'CeliApp Home Screen'}</Text>
          <Coin/>
          <Button title="Knowledge Center  " onPress={this._knowledge} />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  
    _knowledge = () => {
      this.props.navigation.navigate('Home');
    };
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 30,
      textAlign: 'center',
      margin: 20,
    }
  });