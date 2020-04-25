import React from 'react';
import { StatusBar, StyleSheet, View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import * as Font from 'expo-font'
import TextInputSingleLine from '../components/TextInputSingleLine'
import ImageButton from '../components/ImageButton'


export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false,
      name: '',
      coins: 0,
      streakKeeper: false
    }
  }

  static navigationOptions = {
    title: '                    We are Gluten Free            ',
  };

  coinCallback = (coins) => {
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
    console.log(this.state.streakKeeper + " Splash " + this.state.coins)

    if (this.state.fontLoaded) {
      return (
        <View style={styles.container}>
          <StatusBar />
          <Text>{''}</Text>
          <Text>{''}</Text>

          {/* <TextInputSingleLine placeholderText={'What is your name?'} onTextChanged={(text) => this.setState({ name: text })} /> */}
          <Text>{''}</Text>
          <Text>{''}</Text>

          <ImageButton
            title="Start by saying NO to Gluten"
            source={require('../assets/sprites/splash.png')}
            func={this._showApp} />
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
    fontSize: 22,
    textAlign: 'center',
    margin: 5,
    fontFamily: 'OpenSans'
  },
  button: {
    textAlign: 'center',
  }
});


