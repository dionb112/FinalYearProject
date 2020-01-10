import React from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class VideoScreen extends React.Component {
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
  