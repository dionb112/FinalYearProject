import React from 'react';
import { Image, StyleSheet, View, Text, } from 'react-native';
import Coin from '../components/Coin'
import { Button } from 'react-native-elements';
import MyWebView from '../components/MyWebView';
import { Audio } from 'expo-av';

export default class CoinScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false,
      coins: this.props.navigation.state.params.coins,
      streakKeeper: this.props.navigation.state.params.streakKeeper,
      page: 'Coin'
    }
    global.spendSound = new Audio.Sound();
    this.load();
  }

  static navigationOptions = {
    title: '                            Coin Corner             ',
  };

  async load() {
    try {
      await spendSound.loadAsync(require('../assets/sounds/spend.wav'));
    } catch (error) {
      console.log(error)
    }
  }

  async play() {
    await spendSound.replayAsync()
  }

  async componentWillUnmount() {
    await spendSound.stopAsync()
  }

  spend = () => {
    if (this.state.coins >= 100 && !this.state.streakKeeper) {
      this.play();
      // do callback before state becuase state doesn't always update immidiately
      this.props.navigation.state.params.coinCallbackFromParent(this.state.coins - 100);
      this.props.navigation.state.params.streakCallbackFromParent(true);
      this.setState({
        coins: this.state.coins - 100,
        streakKeeper: true
      })
    }
  }

  // use webview again woo!
  web = () => {
    if (this.state.coins >= 1200) {
      this.play()
      this.props.navigation.state.params.coinCallbackFromParent(this.state.coins - 1200);
      this.setState({
        coins: this.state.coins - 1200,
      })
      this.setState({ page: 'Web' })
    }
  }

  render() {
    console.log(this.state.streakKeeper)
    if (this.state.page === 'Coin') {
      return (
        <View style={styles.container}>
          {
            this.state.streakKeeper &&
            <Image source={require("../assets/sprites/fuel.png")} top={-95} marginBottom={-64} />
          }
          <Text style={styles.title}>{'This is the Coin Corner..'}</Text>
          <Text style={styles.text}>{'Check collected coins here!'}</Text>
          <Coin />
          <Text style={styles.coin}>{this.state.coins}</Text>
          <Text style={styles.coin}>{""}</Text>
          <Button title="          100 Coins; Fire Streak Fuel          " raised={true} onPress={this.spend} />
          <Text style={styles.coin}>{""}</Text>
          <Button title="    1200 Coins; gip stick discount       " raised={true} onPress={this.web} />
        </View>
      );
    } else if (this.state.page === 'Web') {
      return (
        <View style={styles.container}>
          <MyWebView />
        </View>
      );
    }
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

