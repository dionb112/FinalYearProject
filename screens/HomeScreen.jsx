import React from 'react';
import { StatusBar, StyleSheet, View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coins: this.props.navigation.state.params.coins,
      streakKeeper: this.props.navigation.state.params.streakKeeper,
    }
  }

  static navigationOptions = {
    title: '             Coeliac Knowledge Centre            ',
  };

  coinsCallback = (coins) => {
    this.props.navigation.state.params.coinCallbackFromParent(coins);
    this.setState({
      coins: coins
    });
  }

  //addition variant
  coinsCallbackForAddition = (coins) => {
    this.props.navigation.state.params.coinCallbackFromParent(this.state.coins + coins);
    this.setState({
      coins: this.state.coins + coins
    });
  }

  streakCallback = (streakKeeper) => {
    this.props.navigation.state.params.streakCallbackFromParent(streakKeeper);
    this.setState({ streakKeeper: streakKeeper });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <Text>{''}</Text>
        <Text>{''}</Text>
        <Text style={styles.title}>{'Welcome to the centre!'}</Text>
        <Text>{''}</Text>
        <Image source={require('../assets/sprites/penguin-md.png')} />
        <Text>{''}</Text>
        <Button title="             Video Vault              " onPress={this._showVideos} raised={true} />
        <Text>{''}</Text>
        <Button title="                Quiz Zone               " onPress={this._showQuiz} raised={true} />
        <Text>{''}</Text>
        <Button title="             Coin Corner             " onPress={this._showCoins} raised={true} />
      </View>
    );
  }

  _showVideos = () => {
    this.props.navigation.navigate('Video');
  };

  _showQuiz = () => {
    this.props.navigation.navigate('Quiz', {
      streakKeeper: this.state.streakKeeper,
      coinCallbackFromParent: this.coinsCallbackForAddition,
      streakCallbackFromParent: this.streakCallback
    });
  };

  _showCoins = () => {
    this.props.navigation.navigate('Coins', {
      coins: this.state.coins,
      streakKeeper: this.state.streakKeeper,
      coinCallbackFromParent: this.coinsCallback,
      streakCallbackFromParent: this.streakCallback
    });
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    margin: 5,
    fontFamily: 'OpenSans'
  },
  button: {
    textAlign: 'center',
  }
});


