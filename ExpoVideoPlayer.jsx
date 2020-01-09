import React from 'react';
import { Video } from 'expo-av';
import {  StyleSheet, Text, View, Dimensions, } from 'react-native';
export default class ExpoVideoPlayer extends React.Component {

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>{'Expo-av Video Player.'}</Text>

      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    }
  });
  