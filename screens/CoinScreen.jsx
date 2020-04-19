import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import Coin from '../components/Coin'


export default class CoinScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false
    }
  }
  
  static navigationOptions = {
    title: 'Coin Corner             ',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{'This is the Coin Corner..'}</Text>
        <Text style = {styles.text}>{'Here you can see all of the Coins you have collected!'}</Text>
        <Coin />
        <Text style = {styles.coin}>{this.props.navigation.state.params.coins}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    margin: 30,
    fontFamily: 'OpenSans'
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    margin: 15,
    fontFamily: 'OpenSans'
  },
  coin: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'OpenSans'
  }
});


