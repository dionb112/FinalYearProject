import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { ActivityIndicator, StyleSheet, Image, Text, View, Dimensions } from 'react-native';


/// Attempt to load the uri asynrounsly in hopes of serving the correct bundle : (
export default class MyWeb extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
  }
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

  hideSpinner() {
    this.setState({ visible: false });
  }


  render() {
    /// failed attemps to load the quiz and build through web view
    //const webViewSource = { html: require('../assets/index.js') () };
    //const source = require('../assets/public/index.html');
    //const webViewSource = this.getQuiz(source);

    const { width, height } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <WebView
          onLoad={() => this.hideSpinner()}
          allowFileAccess={true}
          style={{ width, height: "100%" }}
          originWhitelist={['*']}
          // Now used as a way to link to gip stick purchase - later for discount hopefully
          source={{ uri: 'https://glutendetect.es/en/#buy' }}

          //previously was setup to load Peter's Quiz dynamically (would have saved a lot of trouble but unavailable offline in that case)
          // source= {{uri: 'http://34.246.173.61:3000/'}} // if the server is started the quiz can be loaded here responsively!
          //Loading html file from project folder
          //  source={ require('../assets/public/test.html') }

          // This one goes through all the way and asks for missing packages
          // After installing all dependencies loops back around to this require
          // Saying that something is wrong in the dependecy bundle
          //    source={{ html: require('../assets/index.js') () }}
          // attempt to serve the app through a boot.js
          // source={{ html: require('../assets/public/boot.js')() }}

          useWebKit
          allowUniversalAccessFromFileURLs={true}
          allowFileAccessFromFileURLs={true}
          loadWithOverviewMode={true}
          useWideViewPort={true}
          javaScriptEnabled={true}
          mixedContentMode="always"
          //For the Cache
          domStorageEnabled={true}
        />
        {this.state.visible &&
          <ActivityIndicator
            style={{ position: "absolute"}}
            size= {Platform.OS === 'android' ? 100 : 'large'} // only android support number passing here
          />
        }
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
