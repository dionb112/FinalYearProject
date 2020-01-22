import React from 'react';
import { Video } from 'expo-av';
import {  StyleSheet, Text, View, Dimensions } from 'react-native';
export default class ExpoVideoPlayer extends React.Component {


  _handleVideoRef = component => {
    const playbackObject = component;
    playbackObject.loadAsync(require('./assets/what_happens_when_you_get_glutened.mp4'), initialStatus = {}, downloadFirst = true);
    playbackObject.playAsync();
  }


  render() {
    const { width } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{'Video Player.'}</Text>
        <Video
          ref={this._handleVideoRef}
          shouldPlay
          useNativeControls
          style={{ width, height: "50%" }}
          resizeMode={'contain'}
        />
    </View>);
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',   
     },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    }
  });
  