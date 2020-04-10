import React from 'react';
import { StatusBar, StyleSheet, View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import * as Font from 'expo-font'


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false
    }
  }

  static navigationOptions = {
    title: '                      Knowledge Centre            ',
    headerStyle: {
      backgroundColor: '#FFA500',
      //height: 15, // Specify the height of your custom header
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
    },
  };

  render() {
    if (this.state.fontLoaded) {
      return (
        <View style={styles.container}>
        <StatusBar/>
        <Text>{''}</Text>

          <Text style={styles.title}>{'Welcome to the Knowledge Centre!'}</Text>
          <Image source={require('../assets/sprites/penguin-md.png')} />
          <Text>{''}</Text>
          <Button title="             Video Vault              " onPress={this._showVideos} raised={true} />
          {/* <Button title="             Video Vault              " onPress={this._showVideos} /> */}
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
    this.props.navigation.navigate('Quiz');
  };

  _showCoins = () => {
    this.props.navigation.navigate('Coins');
  };

  // something like this for custom fonts..
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
    margin: 20,
    fontFamily: 'OpenSans'
  },
  button: {
    textAlign: 'center',
  }
});


