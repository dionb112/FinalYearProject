import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import ExpoVideoPlayer  from './ExpoVideoPlayer';
import { Video } from 'expo-av';


export default class App extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{'CeliApp'}</Text>
        <ExpoVideoPlayer/>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center'
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: 20,
  }
});