import React from 'react';
import RNGameCenter from "react-native-game-center"
import QuizWebView from "../components/QuizWebView";
import { Button, StatusBar, StyleSheet, View, Text } from 'react-native';
import Quiz from '../components/Quiz';

export default class BadgeScreen extends React.Component {
  constructor(props) {
    super(props);

    // Declare state variables
    this.state = {
      page: '',
      personalInfo: [],
      personalSave: [],
      title: "Home",
      username: "",
      challenge: false,
      challenged: false,
      challengeName: '',
      challengedQs: [],
      challenger: '',
      quizQuestions: []
    };

    // Bind this to the relevant functions that need to access it 
    this.changeToHome = this.changeToHome.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.changeToQuiz = this.changeToQuiz.bind(this);
    this.changeToInfo = this.changeToInfo.bind(this);
    this.changeToSignUp = this.changeToSignUp.bind(this);
    this.changeToSocialHub = this.changeToSocialHub.bind(this);
    this.startChallenge = this.startChallenge.bind(this);
    this.startChallenged = this.startChallenged.bind(this);
    this.appendToInfo = this.appendToInfo.bind(this);
    this.leaveHome = this.leaveHome.bind(this);
    this.deleteFromPersonalisedInfo = this.deleteFromPersonalisedInfo.bind(this);
    this.updatePageCount = this.updatePageCount.bind(this);

    this.savedPersonals = []; // Array to store all personal points that have been saved
  }



  static navigationOptions = {
    title: 'Badges here...',
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
    try {
      // Makes api call
      const response = await fetch('http://192.168.0.42:5000/info');
      this.infoReceived = await response.json();  // Gets data back from call
      console.log(this.infoReceived)
      var quizQuestions = [] // Array to hold all quiz data

      var id = 1;
      for (var i = 0; i < this.infoReceived.length; i++) {
        // Loops through every info point

        for (var j = 0; j < this.infoReceived[i].quizContent.length; j++) {
          // Loops through every quiz question in info card

          // Creates JSON object which stores all information in that quiz question
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

      }
      // Stores all the info and quiz content received
      this.setState({
        info: this.infoReceived,
        infoSaved: this.infoReceived,
        quizQuestions: quizQuestions
      });
    }
    catch (e) {
      console.log('caught error', e);
    }
  }

  /**
   * This asynchronous function will execute an API call once the user changes the current page
   * The purpose of this is so that we can track how often certain pages are visited
   */
  async updatePageCount(event1, event2, username) {
    try {
      // Event1 is the user leaving their current page
      // Event2 is the user entering the new page
      const response = await fetch('/update_user_info', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: username,
          event1: event1,
          event2: event2
        })
      });
    }
    catch (e) {
      console.log('caught error', e);
    }
  }

  /**
   * This asynchronous function will execute an API call once the application loads
   * The API call returns all personalised info points that the user has saved
   */
  async getInfoPoint() {
    try {
      const response = await fetch('/get_personalised_points/' + this.state.username);
      this.infoReceived = await response.json();
      if (this.infoReceived.length > 0) {
        var titles = this.infoReceived[0].split(","); // Splits string into array of info titles
        for (var i = 0; i < titles.length; i++) {
          // For every info title, append the info card to the personalised page
          this.appendToInfo(titles[i], false);
        }
      }
    }
    catch (e) {
      console.log('caught error', e);
    }
  }

  /**
   * This asynchronous function is called when a user gets a question wrong
   * It posts the title of the info point corresponding to the question that was answered incorrectly
   * This allows for personalised info points to persist between sessions
   */
  async postInfoPoint(title) {
    try {
      // Makes API call, sending username and title of info card to be saved
      const response = await fetch('/post_personal_info', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: this.state.username,
          title: title[0]
        })
      });
    }
    catch (e) {
      console.log('caught error', e);
    }
  }

  /**
   * Function for appending an info point to the personalised info page
   * Function is passed the title of the info point that will be appended
   */
  appendToInfo(category, newTitle) {

    // Array that stores all current info points on the personalised page
    var array = this.state.personalInfo;

    // If info point isn't already on personalised page
    if (!this.savedPersonals.includes(category)) {

      this.savedPersonals.push(category); // Add it to saved titles
      for (var j = 0; j < this.state.infoSaved.length; j++) {
        // Loop through all info points

        // Set title to be title of current info point
        var title = this.state.infoSaved[j].title;

        if (title == category) { // If title matches title of info point to be appended
          if (newTitle) { // If title isn't already saved
            // Make API call to save info point title
            this.postInfoPoint(title);
          }
          array.push(this.state.infoSaved[j]); // Add info point to personal points

          this.setState((state) => ({
            personalSave: array
          }));
        }
      }
    }
  }

  /**
   * Function for deleting info points from saved personalised info points
   */
  deleteFromPersonalisedInfo(title) {
    // If info point is on personalised page
    if (this.savedPersonals.includes(title)) {
      // Set array to be saved pesonal info points
      var array = this.state.personalSave;

      for (var j = 0; j < array.length; j++) {
        // Loop through array of saved info points

        var category = array[j].title;

        if (title == category) { // If title to be deleted is equal to current current title

          array.splice(j, 1); // Remove info point from array

          this.setState((state) => ({
            personalSave: array,
            personalInfo: array
          }));
        }
      }
      this.deletePersonalInfoApi(title); // Make API call to delete info point
    }
  }

  /**
   * This asynchronous function is called when a user deletes a personalised info point
   * Makes API call that removes title from saved info titles in database
   * API call passes title that needs to be deleted to the backend
   */
  async deletePersonalInfoApi(title) {
    try {
      const response = await fetch('/remove_personalised_point', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: this.state.username,
          title: title
        })
      });
    }
    catch (e) {
      console.log('caught error', e);
    }
  }


  renderQuiz() {
    return (
      <View style={styles.container}>
        <Text>{"Quiz"}</Text>
        {/* <QuizWebView/> R.I.P */}

        <Quiz
          button={this.changeToHome}
          info={this.changeToInfo}
          append={this.appendToInfo}
          username={this.state.username}
          challenge={this.state.challenge}
          challenged={this.state.challenged}
          challengedQuestions={this.state.challengedQs}
          challenger={this.state.challenger}
          challengeName={this.state.challengeName}
          questions={this.state.quizQuestions}
          updateCount={this.updatePageCount}
        />

        {/* <StatusBar barStyle="default" /> */}
      </View>
    );
  }
  /**
   * Function for when user issues a challenge
   */
  startChallenge(name) {
    // Sets it so that this quiz is a challenge quiz
    // Sets the challenged name to be the name the user entered when issuing challenge
    this.setState({
      challenge: true,
      challengeName: name
    });
    this.changeToQuiz(); // Starts the quiz
  }

  /**
   * Function for when user accepts a challenge
   */
  startChallenged(challenger, questions) {
    // Sets quiz questions to be questions supplied by challenge
    this.setState({
      challenger: challenger,
      challenged: true,
      challengedQs: questions
    }, function () {
      this.changeToQuiz(); // Starts the quiz
    });
  }

  /**
   * Function for rendering the social hub to the screen
   */
  renderSocialHub() {
    return (
      <View style={styles.container}>
        {/* <SocialHub
          button={this.changeToHome}
          username={this.state.username}
          challengeBTN={this.startChallenge}
          acceptChallenge={this.startChallenged}
          updateCount={this.updatePageCount}
        /> */}
      </View>
    )
  }

  /**
   * Function for changing pages to the social hub 
   */
  changeToSocialHub(event) {
    this.setState({
      page: "SocialHub",
      title: "Social Hub"
    });

    // Call function that updates user events
    this.updatePageCount("Leave Home Page", "Enter Social Hub", this.state.username);
  }

  /**
   * Function for changing pages to the home page 
   */
  changeToHome(messageEvent) {
    // Message event is to let us know where the user is coming from ie Info or quiz page

    this.setState({
      page: "Home",
      title: "Home",
      challenge: false
    });
    // Call function that updates user events
    this.updatePageCount(messageEvent, "Enter Home Page", this.state.username);
  }


  /**
   * Function for changing pages to the home page 
   */
  changeToQuiz(event) {
    this.setState({
      page: "Quiz",
      title: "Quiz"
    });

    if (!this.state.challenge && !this.state.challenged) {
      // Call function that updates user events but only if quiz is started from home page
      this.updatePageCount("Leave Home Page", "Start Quiz", this.state.username);
    }

    // Sets timer up so that it ticks once a second
    this.intervalHandle = setInterval(this.tick, 1000);
  }

  /**
   * Function for changing pages to the info page 
   */
  changeToInfo(messageEvent) {
    // Message event is to let us know where the user is coming from ie home or result page

    this.setState({
      page: "Info",
      title: "Information",
      challenge: false
    });

    // Call function that updates user events
    this.updatePageCount(messageEvent, "Enter Info Page ", this.state.username);
  }


  /**
   * Function for changing pages to the Sign Up page 
   */
  changeToSignUp(event) {
    this.setState({
      page: "SignUp",
      title: "Sign Up"
    });
  }


  /**
   * Function for rendering the Info page to the screen
   */
  renderInfoContent() {
    return (
      <View style={styles.container}>
        {/* <Info
        info={this.state.info}
        personalInfo={this.state.personalInfo}
        username={this.state.username}
        infoSaved={this.state.infoSaved}
        personalSave={this.state.personalSave}
        button={this.changeToHome}
        searchFunc={this.search}
        deleteFunc={this.deleteFromPersonalisedInfo}
        updateCount={this.updatePageCount}
      /> */}
      </View>
    );
  }

  /**
   * Function called when leaving home to go to the info page
   * Purpose of this is to allow to send the message for our user data event
   */
  leaveHome(event) {
    this.changeToInfo("Leave Home Page");
  }

  /**
   * Function for rendering the Home page to the screen
   */
  renderHome() {
    return (
      <View style={styles.container}>
        <Text>Hi</Text>
        <Button title="Quiz..." onPress={this.changeToQuiz} />
        <Text>{''}</Text>
        <Button title="Info..." onPress={this.leaveHome} />
        {/* <Option symbol="fa fa-address-book fa-3x" side="option top" change={this.changeToSocialHub} /> */}
      </View>
    );
  }

  /**
   * This function checks which page should be rendered
   * It then calls the corresponding render function
   */
  renderPage() {
    if (this.state.page === "SignUp") {
      return this.renderSignUp();
    }
    else if (this.state.page === "Home") {
      return this.renderHome();
    }
    else if (this.state.page === "Quiz") {
      return this.renderQuiz();
    }
    else if (this.state.page === "Info") {
      return this.renderInfoContent();
    }
    else if (this.state.page === "SocialHub") {
      return this.renderSocialHub();
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
