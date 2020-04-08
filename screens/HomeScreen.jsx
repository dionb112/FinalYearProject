import React from 'react';
import { Button, StyleSheet, View, Text, } from 'react-native';
import * as Font from 'expo-font'
import Coin from '../components/Coin'


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
          <Coin />
          <Text>{''}</Text>
          <Button title="Video Vault " onPress={this._showVideos} />
          <Text>{''}</Text>
          <Button title=" Quiz Zone " onPress={this._showQuiz} />
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
  }
});


