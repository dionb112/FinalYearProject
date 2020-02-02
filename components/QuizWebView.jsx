import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, Image, Text, View } from 'react-native';


export default class MyWeb extends Component {
  render() {
    // release path
    // const webViewSource = Image.resolveAssetSource(require('file:///android_asset/assets/public/index.html'));
    // debug path
    const webViewSource = Image.resolveAssetSource(require('../assets/public/index.html'));
    console.log(webViewSource.uri);

    return (
      <View>
      <Text>{'Hi'}</Text>
        <WebView
          style={ styles.container }
          originWhitelist={['*']}
          //Loading html file from project folder
          source = {webViewSource}
          //source={{html: '<h1>Hello world</h1>'}}


          useWebKit

          // This goes through all the way and asks for missing packages
          // After installing all dependencies loops back around to this require
          // Saying that something is wrong in the dependecy bundle
          // source={{ html: require('../assets/index.js') () }}


          //Enable Javascript support
          javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}

          allowUniversalAccessFromFileURLs={true}
          allowFileAccessFromFileURLs={true}
          loadWithOverviewMode = {true}
          useWideViewPort = {true}
          // mixedContentMode="always"
        />
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
