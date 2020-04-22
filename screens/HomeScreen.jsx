import React from 'react';
import { StatusBar, StyleSheet, View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import * as Font from 'expo-font'
import TextInputSingleLine from '../components/TextInputSingleLine'


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false,
      coins: 0,
      name: ''
    }
  }

  static navigationOptions = {
    title: '              Coeliac Knowledge Centre            ',
  };

  myCallback = (coins) => {
    this.setState({ coins: coins });
  }

  render() {
    if (this.state.fontLoaded) {
      return (
        <View style={styles.container}>
          <StatusBar />
          {/* working text input to allow user to enter name */}
          <TextInputSingleLine placeholderText = {'Name?'} onTextChanged={(text) => this.setState({name: text, modified: true})} />
          <Text>{''}</Text>

          <Text style={styles.title}>{'Welcome to the centre!'}</Text>
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
    else {
      return (<View />);
    }
  }

  _showVideos = () => {
    this.props.navigation.navigate('Video');
  };

  _showQuiz = () => {
    this.props.navigation.navigate('Quiz', { coins: this.state.coins, callbackFromParent: this.myCallback });
  };

  _showCoins = () => {
    this.props.navigation.navigate('Coins', { coins: this.state.coins });
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


