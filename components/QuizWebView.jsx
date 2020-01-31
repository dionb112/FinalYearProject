import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View } from 'react-native';


export default class MyWeb extends Component {
  render() {
    return (
        <WebView
          style={{ flex: 1 }}
          originWhitelist={['*']}
          //Loading html file from project folder
          // source = require('../android_asset/index.html')
         
          // WORKING Kinda
          source={{ html: require('../assets/index.js') () }}

          style={{ marginTop: 20 }}
          //Enable Javascript support
          javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}

          allowUniversalAccessFromFileURLs={true}
          allowFileAccessFromFileURLs={true}
          mixedContentMode="always"
        //style={{ marginTop: 20 }} 
        />
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
