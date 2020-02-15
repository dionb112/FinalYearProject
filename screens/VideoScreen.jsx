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
      title: 'Video Vault!     ',
    };
  
    render() {
      return (
        // TODO: Swap out the buttons for thumbnails
        <View style={styles.container}>
          <Button title="What happenes when I get glutened? " onPress={this._glutened} />
          <Text>{''}</Text>
          <Button title="Cross contamination of gluten part 1 " onPress={this._crossContamP1} />
          <Text>{''}</Text>
          <Button title="Cross contamination of gluten part 2 " onPress={this._crossContamP2} />
          <Text>{''}</Text>
          <Button title="Cross contamination of gluten part 3 " onPress={this._crossContamP3} />
          <Text>{''}</Text>
          <Button title="Cross contamination of gluten part 4 " onPress={this._crossContamP4} />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  
    _glutened = () => {
      this.props.navigation.navigate('Glutened');
    };
    _crossContamP1 = () => {
      this.props.navigation.navigate('CCP1');
    };
    _crossContamP2 = () => {
      this.props.navigation.navigate('CCP2');
    };
    _crossContamP3 = () => {
      this.props.navigation.navigate('CCP3');
    };
    _crossContamP4 = () => {
      this.props.navigation.navigate('CCP4');
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
  