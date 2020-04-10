import React from 'react';
import { Button, StyleSheet, View, Text, } from 'react-native';
// import { Button } from 'react-native-elements';
import * as Font from 'expo-font'


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false
    }
  }

  static navigationOptions = {
    title: 'Knowledge Center             ',
  };

  render() {
    if (this.state.fontLoaded) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{'Welcome to the Knowledge center!'}</Text>
          <Text>{''}</Text>
          {/* <Button titleStyle = {styles.title} title="             Video Vault              " onPress={this._showVideos} /> */}
          <Button title="             Video Vault              " onPress={this._showVideos} />
          <Text>{''}</Text>
          <Button title="                 Quiz Zone               " onPress={this._showQuiz} />
          <Text>{''}</Text> 
          <Button title="             Coin Corner             " onPress={this._showCoins} />
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
      PlayfairDisplay: require('../assets/fonts/PlayfairDisplay-Regular.otf')
    })
    this.setState({ fontLoaded: true })
  }

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
    fontFamily: 'PlayfairDisplay'
  },
  button: {
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay'
  }
});


