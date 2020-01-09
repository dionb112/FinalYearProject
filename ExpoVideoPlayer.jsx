import React from 'react';
import { Video } from 'expo-av';
import {  StyleSheet, Text, ScrollView, Dimensions, } from 'react-native';
export default class ExpoVideoPlayer extends React.Component {

  
    render() {
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.welcome}>{'Expo-av Video Player.'}</Text>

      </ScrollView>
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