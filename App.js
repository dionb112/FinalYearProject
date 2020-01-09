import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import YoutubePlayer from './YoutubePlayer';
import ExpoVideoPlayer  from './ExpoVideoPlayer';
import { Video } from 'expo-av';



export default class App extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>CeliApp</Text>
        <ExpoVideoPlayer/>
        <Video
        source = {require('./assets/what_happens_when_you_get_glutened.mp4')}
        shouldPlay
        useNativeControls
        style={{ width: "100%", height: "50%" }}
      />

      {/* <YoutubePlayer/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});