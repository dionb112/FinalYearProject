import React from 'react';
import { Video } from 'expo-av';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { AndroidBackHandler } from 'react-navigation-backhandler';

export default class ExpoVideoPlayer extends React.Component {

  constructor() {
    super()
    global.playbackObject;

    // node require() only takes string literals so we need to define each possibilty here
    this.files = {
      0: require('../assets/videos/what_happens_when_you_get_glutened.mp4'),
      1: require('../assets/videos/cross_contamination_of_gluten_part_1.mp4'),
      2: require('../assets/videos/cross_contamination_of_gluten_part_2.mp4'),
      3: require('../assets/videos/cross_contamination_of_gluten_part_3.mp4'),
      4: require('../assets/videos/cross_contamination_of_gluten_part_4.mp4')
    };
    this.file = {};
    this.title = '';
    // this.showCoin = false;
  }

  componentWillMount() {
    this.setUp();
  }

  setUp() {
    // Then we can assign the correct one to use from props passed from chosen screen
    switch (this.props.fileID) {
      case 0:
        this.file = this.files[0];
        this.title = 'What happens when I get "glutened"?'
        break;
      case 1:
        this.file = this.files[1];
        this.title = 'How easily can food be contaminated by gluten during preperation?\n\n Example 1'
        break;
      case 2:
        this.file = this.files[2];
        this.title = 'How easily can food be contaminated by gluten during preperation? \n\n Example 2'
        break;
      case 3:
        this.file = this.files[3];
        this.title = 'How easily can food be contaminated by gluten during preperation? \n\n Example 3'
        break;
      case 4:
        this.file = this.files[4];
        this.title = 'How easily can food be contaminated by gluten during preperation? \n\n Example 4'
        break;
      default:
        break;
    }
  }

  async componentWillUnmount() {
    await playbackObject.unloadAsync();
  }

  /// according to Expo AV docs this is supposed to let me check when video is finished
  /// planned to use this to add coins to videos also 
  /// but despite best efforts it cannot work in time

  // _onPlaybackStatusUpdate = (playbackStatus) => {
  //   console.log(playbackStatus)
  //   if (!playbackStatus.isLoaded) {
  //     // Update your UI for the unloaded state
  //     if (playbackStatus.error) {
  //       console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
  //       // Send Expo team the error on Slack or the forums so we can help you debug!
  //     }
  //   } else {
  //     // Update your UI for the loaded state
  
  //     if (playbackStatus.isPlaying) {
  //       // Update your UI for the playing state
  //     } else {
  //       // Update your UI for the paused state
  //     }
  
  //     if (playbackStatus.isBuffering) {
  //       // Update your UI for the buffering state
  //     }
  
  //     if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
  //       this.showCoin = true;
  //       this.props.navigation.state.params.coinCallbackFromParent(200);      
  //     }
  //   }
  // };


  // async update() {
  //   console.log(await playbackStatus.getStatusAsync() + "up")

  //   // if (await playbackObject.getStatusAsync().isLoaded) {
  //   //   this.playbackObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
  //   // }
  // }

  async stop() {
    await playbackObject.stopAsync();
  }

  onBackButtonPressAndroid = () => {
    this.stop();
    return false;
  };

  async load() {
    await playbackObject.loadAsync(this.file, initialStatus = { shouldPlay: true }, downloadFirst = true);
  }

  _handleVideoRef = component => {
    playbackObject = component;
    if (playbackObject != null) {
      this.load();
      // this.update();
    }
  }

  render() {
    const { width } = Dimensions.get('window');
    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <View style={styles.container}>
          <Text style={styles.welcome}>{this.title}</Text>
          <Video
            ref={this._handleVideoRef}
            useNativeControls
            style={{ width, height: "50%" }}
            resizeMode={'contain'}
          />
          {/* {this.showCoin &&
            <Coin />
          }
          {this.showCoin &&
            <Text style={styles.text}>{"You earned: 200 gold coins"}</Text>
          } */}
        </View>
      </AndroidBackHandler>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    margin: 0,
    fontFamily: 'OpenSans',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    margin: 5,
    fontFamily: 'OpenSans',
    lineHeight: 30,
  },
});
