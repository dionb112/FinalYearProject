import React from 'react';
import { Alert, AppState, AsyncStorage, StatusBar, StyleSheet, View, Text, BackHandler } from 'react-native';
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
      streakKeeper: false,
      screen: 'splash'
    }
    global.soundObject = new Audio.Sound();
  }

  componentDidMount() {
    this.load()
    this._retrieveData();
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'inactive' || nextAppState === 'background')  { //ios || android
      this._storeData();
      console.log('the app is closed');
    }    
  }

  // save data asyncronously
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('coins', this.state.coins.toString());
      // await AsyncStorage.setItem('fuel', this.state.streakKeeper.toString());
      console.log('coins stored' + this.state.coins);
      // console.log('fuel stored' + this.state.streakKeeper);

    } catch (error) {
      console.log(error);
    }
  }


  // fetch data back
  _retrieveData = async () => {
    try {
      const coins = await AsyncStorage.getItem('coins');
      // const fuel = await AsyncStorage.getItem('fuel');
      if (coins !== null) {
        console.log("coins loaded " + coins);
        this.setState({coins: JSON.parse(coins)})      
      }
      // if (fuel !== null) {
      //   console.log("fuel loaded " + JSON.parse(fuel));
      //   this.setState({streakKeeper: JSON.parse(fuel)})      
      // }
    } catch (error) {
      console.log(error);
    }
  }

  static navigationOptions = {
    title: '                    We are Gluten Free            ',
  };

  async load() {
    try {
      // custom fonts
      await Font.loadAsync({
        PlayfairDisplay: require('../assets/fonts/PlayfairDisplay-Regular.otf'),
        OpenSans: require('../assets/fonts/OpenSans-SemiBold.ttf')
      })          
      this.setState({ fontLoaded: true })
      // sound effect
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
    console.log(coins);
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
          <Text style={styles.title}>{'Start by saying NO to Gluten'}</Text>
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
    color: '#FF9800',
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  button: {
    textAlign: 'center',
  }
});


