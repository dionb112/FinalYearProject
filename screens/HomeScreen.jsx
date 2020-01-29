import React from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Knowledge Center ...',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{'Welcome to the Knowledge center!'}</Text>
          <Button title="Video vault..." onPress={this._showVideos} />
          <Text>{''}</Text>
          <Button title="Badge Base..." onPress={this._showBadges} />
        </View>
      );
    }
  
    _showVideos = () => {
      this.props.navigation.navigate('Video');
    };
  
    _showBadges = () => {
      this.props.navigation.navigate('Badge');
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
  