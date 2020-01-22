import React from 'react';
import { View, StyleSheet} from 'react-native';
import ExpoVideoPlayer  from './ExpoVideoPlayer';
import { Video } from 'expo-av';


export default class GlutenedScreen extends React.Component {
  static navigationOptions = {
    title: 'What happens when I get glutened?',
  };

  render() {
    return (
      <View style={styles.container}>
        <ExpoVideoPlayer/>
      </View>
    );
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
    }
  });