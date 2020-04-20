import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import Coin from '../components/Coin'
import { Button } from 'react-native-elements';


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
        <Text style = {styles.text}>{'Check collected coins here!'}</Text>
        <Coin />
        <Text style = {styles.coin}>{this.props.navigation.state.params.coins}</Text>
        <Text style = {styles.coin}>{""}</Text>
        <Button title="            100 Coins; 'in app bonus'            "  raised={true} />
        <Text style = {styles.coin}>{""}</Text>
        <Button title="      600 Coins; gluten free discount     " raised={true} />
        <Text style = {styles.coin}>{""}</Text>
        <Button title="        1200 Coins; gip stick discount     "  raised={true} />
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
    margin: 5,
    fontFamily: 'OpenSans'
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'OpenSans',
    margin: 10,
  },
  coin: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'OpenSans'
  }
});

