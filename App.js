import React from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import ExpoVideoPlayer  from './ExpoVideoPlayer';
import { Video } from 'expo-av';



class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Knowledge Center ...',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{'Welcome to the Knowledge center!'}</Text>
        <Button title="Video vault" onPress={this._showVideos} />
        <Text>{''}</Text>
        <Button title="Question & Answer Academy" onPress={this._showQuiz} />
      </View>
    );
  }

  _showVideos = () => {
    this.props.navigation.navigate('Video');
  };

  _showQuiz = () => {
    this.props.navigation.navigate('Quiz');
  };
}

class VideoScreen extends React.Component {
  static navigationOptions = {
    title: 'Lots of videos here',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="What happenes when I get 'gluttened' (thumbnail here)" onPress={this._glutened} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _glutened = () => {
    this.props.navigation.navigate('Glutened');
  };
}

class GlutenedScreen extends React.Component {
  static navigationOptions = {
    title: 'What happens when I get glutened?',
  };

  render() {
    return (
      <View style={styles.container}>
        <ExpoVideoPlayer/>
        <Video
            source = {require('./assets/what_happens_when_you_get_glutened.mp4')}
            shouldPlay
            useNativeControls
            style={{ width: "100%", height: "50%" }}
            resizeMode={'contain'}
          />
      </View>
    );
  }
}

class QuizScreen extends React.Component {
  static navigationOptions = {
    title: 'Quiz here',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Answer 1" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

class CeliAppScreen extends React.Component {
  static navigationOptions = {
    title: 'CeliApp ...',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{'CeliApp Home Screen'}</Text>
        <Button title="Knowledge Center!" onPress={this._knowledge} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _knowledge = () => {
    this.props.navigation.navigate('Home');
  };
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
  }
});

const AppStack = createStackNavigator({ CeliApp: CeliAppScreen, Home: HomeScreen, Video: VideoScreen, Glutened: GlutenedScreen, Quiz: QuizScreen });

export default createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
  },
  {
    initialRouteName: 'App',
  }
));
