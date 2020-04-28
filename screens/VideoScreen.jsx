import React from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import ImageButton from '../components/ImageButton'

export default class VideoScreen extends React.Component {
  static navigationOptions = {
    title: '                            Video Vault          ',
  };

  render() {
    return (
      <ScrollView style={styles.scrollView}>
      <Text style ={styles.title}>{'How gluten attacks'}</Text>
        <ImageButton
          title="What happens when I get glutened? "
          source={require('../assets/thumbnails/thumbnailGlutened.png')}
          func={this._glutened} />
        <Text>{' _____________________________________________'}</Text>
        <Text style ={styles.title}>{'Gluten cross contamination'}</Text>
        <ImageButton
          title="Part 1 "
          source={require('../assets/thumbnails/ccp1.png')}
          func={this._crossContamP1} />
        <Text>{''}</Text>
        <ImageButton
        title="Part 2 "
          source={require('../assets/thumbnails/ccp2.png')}
          func={this._crossContamP2} />
        <Text>{''}</Text>
        <ImageButton
        title="Part 3 "
          source={require('../assets/thumbnails/ccp3.png')}
          func={this._crossContamP3} />
        <Text>{''}</Text>
        <ImageButton
        title="Part 4 "
          source={require('../assets/thumbnails/ccp4.png')}
          func={this._crossContamP4} />
          <Text>{''}</Text>
        <StatusBar barStyle="default" />
      </ScrollView>
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
    fontSize: 26,
    textAlign: 'center',
    margin: 20,
    fontFamily: 'OpenSans',
  },
  scrollView: {
    backgroundColor: 'transparent',
    marginHorizontal: 20,
  }
});
