import React from 'react';
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import * as Font from 'expo-font'
import ImageButton from '../components/ImageButton'
import { Audio } from 'expo-av';


export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false,
      name: '',
      coins: 0,
      streakKeeper: false
    }
    global.soundObject = new Audio.Sound();
    this.load();
  }

  static navigationOptions = {
    title: '                    We are Gluten Free            ',
  };

  async load() {
    try {
      await soundObject.loadAsync(require('../assets/sounds/jazz.wav'));
    } catch (error) {
      console.log(error)
    }
  }

  async play() {
    await soundObject.replayAsync()
  }

  async stop() {
    await soundObject.stopAsync()
  }

  coinCallback = (coins) => {
    this.stop(); // stop on return from home
    this.setState({
      coins: coins,
    });
  }

  streakCallback = (streakKeeper) => {
    this.setState({
      streakKeeper: streakKeeper
    });
  }


  render() {
    if (this.state.fontLoaded) {
      return (
        <View style={styles.container}>
          <StatusBar />
          <Text>{''}</Text>
          <Text>{''}</Text>
          <Text>{''}</Text>
          <Text>{''}</Text>
          <Text>{''}</Text>
          <Text>{''}</Text>

          <ImageButton
            title=""
            source={require('../assets/sprites/splash.png')}
            func={this._showApp} />
            <Text style = {styles.title}>{'Start by saying NO to Gluten'}</Text>
            <Text>{''}</Text>
        </View>
      );
    }
    else {
      return (<View />);
    }
  }

  // This is how we can pass props through the navigator
  _showApp = (text) => {
    this.play();
    this.props.navigation.navigate('Home', {
      coins: this.state.coins,
      streakKeeper: this.state.streakKeeper,
      coinCallbackFromParent: this.coinCallback,
      streakCallbackFromParent: this.streakCallback
    });
  };

  // custom fonts
  async componentDidMount() {
    await Font.loadAsync({
      PlayfairDisplay: require('../assets/fonts/PlayfairDisplay-Regular.otf'),
      OpenSans: require('../assets/fonts/OpenSans-SemiBold.ttf')
    })
    this.setState({ fontLoaded: true })
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    margin: 0,
    fontFamily: 'OpenSans',
    color : '#FF9800',
    textShadowColor:'#000000',
    textShadowOffset:{width: 0, height: 0},
    textShadowRadius:2,
  },
  button: {
    textAlign: 'center',
  }
});


