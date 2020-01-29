import React from 'react';
import RNGameCenter from "react-native-game-center"
import QuizWebView from "../components/QuizWebView";

import {
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class BadgeScreen extends React.Component {
  
  constructor(){
    super()

    // seems this is for iOs
    // RNGameCenter.getPlayer().then(player=>console.log("player: ",player))
  }

    static navigationOptions = {
      title: 'Badges here...',
    };


  
    render() {
      return (
        <View style={styles.container}>
          <QuizWebView></QuizWebView>
          <StatusBar barStyle="default" />
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
  