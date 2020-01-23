import React from 'react';
import { Video } from 'expo-av';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { AndroidBackHandler } from 'react-navigation-backhandler';

export default class ExpoVideoPlayer extends React.Component {

  constructor(){
    super()
    global.playbackObject;
  }

  onBackButtonPressAndroid = () => {
    playbackObject.stopAsync();
    return false;
  };

  _handleVideoRef = component => {
    playbackObject = component;
    if (playbackObject != null) {
    playbackObject.loadAsync(require('./assets/what_happens_when_you_get_glutened.mp4'), initialStatus = { shouldPlay: true }, downloadFirst = true);
    playbackObject.playAsync();
    }
  }

  render() {
    const { width } = Dimensions.get('window');
    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <View style={styles.container}>
          <Text style={styles.welcome}>{'Video Player.'}</Text>
          <Video
            ref={this._handleVideoRef}
            useNativeControls
            style={{ width, height: "50%" }}
            resizeMode={'contain'}
          />
        </View>
      </AndroidBackHandler>
    );
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
