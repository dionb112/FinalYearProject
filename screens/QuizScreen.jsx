/// @authors Dion Buckley and Peter Daly
/// This screen I built for my native screen stack, however the logic I have taken (in stripped down form) from my predessecor project
/// What this means is that Peter built a Quiz for React.js whereas I have been tasked with porting over the reusable parts and rewritting
/// The native specific parts (like render functions and some other nuances)
/// I have only taken the most basic version of Peters quiz as I don't have any need for the many extra features from his project
/// The specific lines and functions I added (apart from obvios file structure like imports and class defintion) I will tag as my own

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Quiz from '../components/Quiz';
import ImageButton from '../components/ImageButton'


export default class QuizScreen extends React.Component {
  constructor(props) {
    super(props);

    // Declare state variables
    this.state = {
      page: '',
      title: "Home",
      quizQuestions: [],
      streakKeeper: this.props.navigation.state.params.streakKeeper
    };

    // Bind this to the relevant functions that need to access it 
    this.componentWillMount = this.componentWillMount.bind(this);
    this.changeToQuiz = this.changeToQuiz.bind(this);
  }

  //@author Dion: set up callbacks to retrieve score (and streakkeeper) from quiz to go back and forth as Coins (and bonus) in coin center
  coinCallback = (score) => {
    //use dataFromChild
    this.props.navigation.state.params.coinCallbackFromParent(score);
  }
  streakCallback = (streakKeeper) => {
    this.props.navigation.state.params.streakCallbackFromParent(streakKeeper);
  }

  /// @author Dion Buckley
  /// This relates to my stack navigator
  static navigationOptions = {
    title: '                              Quiz Zone        ',
  };

  /**
 * Called when component is re-rendered
 */
  componentWillMount() {
    this.callApi(); // Calls function that handles api calls necessary for starting application

    // Sets current page to be the log in page
    this.setState({
      page: "Home"
    });
  }


  /**
  * This asynchronous function will execute an API call once the application starts
  * It retrieves all information displayed in the application and splits it up into
  * info data and quiz data
  */
  async callApi() {
    ///
    /// @author Dion Buckley
    /// Exception handling try, catch blocks were added by me for ALL async functions in aim to make this solution more robust, handling promises rejections
    ///
    try {
      // Makes api call
      /// @author Dion Buckley
      /// Using Expo (which uses local host) the python server can no longer run off localhost but rather a static external ip
      ///
        // Home
      const response = await fetch('http://192.168.0.62:5000/info'); // cannot use local host as expo conflicts the ip so setup static ip on host
        // Hotspot 
      // const response = await fetch('http://192.168.43.169:5000/info');
        // College through tethered  
      // const response = await fetch('http://192.168.42.162:5000/info');
        // Tethered home 
      // const response = await fetch('http://192.168.42.227:5000/info');

      this.infoReceived = await response.json();  // Gets data back from call
      var quizQuestions = [] // Array to hold all quiz data
      var id = 1;
      for (var i = 0; i < this.infoReceived.length; i++) {
        // Loops through every info point
        for (var j = 0; j < this.infoReceived[i].quizContent.length; j++) {
          // Loops through every quiz question in info card

          // Creates object which stores all information in that quiz question
          var object = {
            "id": id,
            "question": this.infoReceived[i].quizContent[j].question,
            "category": this.infoReceived[i].title,
            "correct": this.infoReceived[i].quizContent[j].correct,
            "answers": this.infoReceived[i].quizContent[j].answers
          }

          quizQuestions.push(object); // Adds object to the array
          id++; // Increments id for the next question
        }
        ///
        /// @author Dion Buckley
        /// This log was important in figuring out if all of the moving parts (mariadb server, python server off external ip, google doc data pulling etc, were all working in my project)
        ///
        // console.log(quizQuestions);
      }
      // Stores all the info and quiz content received
      this.setState({
        quizQuestions: quizQuestions

      });
    }
    catch (e) {
      console.log('caught error', e);
    }
  }

  renderQuiz() {
    console.log(this.state.streakKeeper + " QS " + this.state.coins)

    //console.log(this.state.quizQuestions)
    if (this.state.quizQuestions.length > 0) {
      return (
        <View style={styles.container}>
          {/* Unused WebView component I created initially to use with Quiz */}
          {/* <QuizWebView/> */}
          {/* //@author Dion: set up callbacks to retrieve score from quiz and display as Coins in coin center */}
          <Quiz 
            questions={this.state.quizQuestions} 
            coinCallbackFromParent={this.coinCallback} 
            streakCallbackFromParent={this.streakCallback}
            streakKeeper={this.state.streakKeeper} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>{"Loading.."}</Text>
        </View>
      )
    }
  }

  /**
   * Function for changing pages to the home page 
   */
  changeToQuiz(event) {
    this.setState({
      page: "Quiz",
      title: "Quiz"
    });
  }

  /**
   * Function for rendering the Home page to the screen
   */
  renderHome() {
    return (
      <View style={styles.container}>
        <ImageButton
          title="Start the Quiz when ready"
          source={require('../assets/sprites/quiz.png')}
          func={this.changeToQuiz} />
        <Text>{''}</Text>
        <Text>{''}</Text>
        <Text>{''}</Text>
      </View>
    );
  }

  /**
   * This function checks which page should be rendered
   * It then calls the corresponding render function
   */
  renderPage() {
    if (this.state.page === "Home") {
      return this.renderHome();
    }
    else if (this.state.page === "Quiz") {
      return this.renderQuiz();
    }
  }

  /**
   * Base render function
   */
  render() {
    return (
      this.renderPage() /* Calls function that decides which page should be rendered */
    )
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
