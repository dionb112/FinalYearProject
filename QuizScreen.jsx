import React from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class QuizScreen extends React.Component {
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