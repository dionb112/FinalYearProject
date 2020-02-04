import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, Image, Text, View, Dimensions } from 'react-native';
import { AssetUtils } from 'expo-asset-utils';



export default class MyWeb extends Component {

  async getQuiz(webViewSource) {
    console.log(webViewSource);
    try {
      let file = await AssetUtils.resolveAsync();
      let fileContents = await FileSystem.readAsStringAsync(file.localUri);
      return fileContents;
    }
    catch (e) {
      console.log('caught error', e);
    }

  }

  render() {
    const { width } = Dimensions.get('window');
    //const webViewSource = { html: require('../assets/index.js') () };
    //const source = require('../assets/public/index.html');
    // console.log(webViewSource);

    //const webViewSource = this.getQuiz(source);

    return (
      <View style={styles.container}>
        <Text>{'Hi'}</Text>
        <WebView
          allowFileAccess={true}
          style={{ width, height: "100%" }}
          originWhitelist={['*']}
          //Loading html file from project folder
          source={ 'file:///../assets/public/test.html' }

          // This goes through all the way and asks for missing packages
          // After installing all dependencies loops back around to this require
          // Saying that something is wrong in the dependecy bundle
          //source={{ html: require('../assets/index.js') () }}


          //source={{ html: require('../assets/public/boot.js')() }}


          useWebKit
          allowUniversalAccessFromFileURLs={true}
          allowFileAccessFromFileURLs={true}
          loadWithOverviewMode={true}
          useWideViewPort={true}
          //Enable Javascript support
          javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}
          mixedContentMode="always"
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
