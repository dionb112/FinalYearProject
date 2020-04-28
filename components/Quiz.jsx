import React from 'react';
import {
    Alert, StyleSheet, View, Text, Image, BackHandler
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { Emitter } from 'react-native-particles';
import Coin from '../components/Coin'


/**
 * Quiz Component
 * Handles updating all quiz screens
 * Updates each question and then renders the next question once current question is complete
 */
class Quiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            questionId: 1,
            question: '',
            correct: '',
            answerOptions: [],
            answer: '',
            answersCount: 0,
            result: -1,
            page: 'Confirm',
            timer: 10,
            particles: false,
            score: 0,
            currentScore: 0,
            streakKeeper: this.props.streakKeeper,
            // Icons made by:
            //<a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> 
            //from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
            red: require("../assets/sprites/fire.png"),
            blue: require("../assets/sprites/blue.png"),
        };

        // Bind this to all neccesary function
        this.tick = this.tick.bind(this);
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
        this.changeToQuiz = this.changeToQuiz.bind(this);

        // The different colours for the particles
        this.correctColour = 'green';
        this.incorrectColour = 'red';
        this.colour = this.correctColour;

        // @author Dion: for use in hot streak of Qs answered in a row
        this.streak = 0;
        this.callbacksDone = false;
        this.source = this.state.red;


        this.quizReceived = []; // An array to store all possible questions
        this.questionsString = ""; // An array to store the questions that will be on this quiz
        this.questions = []; // An array to store the questions that will be on this quiz
        this.radioProps = [];
    }

    async stop() {
        await this.props.music.stopAsync()
      }

    back(){
        this.stop();
        this.props.navigator.goBack();
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            if (this.state.page === "Quiz") {
                Alert.alert(
                    'Are you sure you want to quit Quiz?',
                    'Think of the coin..',
                    [
                        { text: 'Quit', onPress: () => this.back },
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        },
                    ],
                    { cancelable: true },
                );
                return true;
            }
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    /**
     * Called when component is re-rendered
     */
    componentWillMount() {
        this.setUpQuiz();
    }

    /**
     * Sets up questions for the quiz
     */
    setUpQuiz() {
        // console.log(this.props.questions);
        this.quizReceived = this.props.questions;

        // Shuffle all questions
        const shuffledQuestions = this.shuffleArray(this.quizReceived);

        // Only take first 15 questions
        this.questions = shuffledQuestions.slice(0, 15);

        // Shuffle the answers to each question
        const shuffledAnswerOptions = this.questions.map(
            (question) => this.shuffleArray(question.answers)
        );

        this.setState({
            question: this.questions[0].question,
            correct: this.questions[0].correct,
            answerOptions: shuffledAnswerOptions[0],
        });
    }

    /**
     * Function for decrementing the timer, this function gets called once a second
     */
    tick() {
        var time = this.state.timer; // Gets current time
        // Decrements it and sets it to be the current value of the timer
        time--;
        this.setState({
            timer: time
        })
        {
            // @author Dion: Instead of directly turning of particles at new question give a second to breathe
            time === 9 &&
                this.setState({
                    particles: false
                })
        }
        // If timer has reached 0, set question to be over
        if (time <= 0) {
            this.timeout();

            // Reset timer
            this.setState({
                timer: 10
            })
        }
    }

    /**
     * Function for randomly shuffling values in an array around
     */
    shuffleArray(array) {

        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 != currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array; // Return shuffled array 
    };

    /**
     * Function for starting the quiz from the pre-quiz screen
     */
    changeToQuiz() {
        // Sets up tick function so it gets called once a second
        this.intervalHandle = setInterval(this.tick, 1000);
        // Sets the page to be displayed to be the quiz page
        this.setState((state) => ({
            page: 'Quiz'
        }));
    }

    /**
     * Function for changing to the results page
     * This function should be called once all quiz questions have been answered
     */
    changeToResult() {
        if (this.state.page == 'Quiz') {

            // Calls function that will post to the database what event the user has caused
            //this.props.updateCount("Leave Quiz", "Enter Result Page");
        }
        // Set page to be displayed to be the results page 
        this.setState((state) => ({
            page: 'Result',
        }));
    }

    /**
     * Function for setting answer to current question to be the answer the user just selected
     */
    setUserAnswer(answer) {
        var multiplier = 10;// Dion: added multiple var so that streak can affect
        // Sets answer to be selected answer
        this.setState((state) => ({
            answer: answer
        }));
        // Checks to see if answer is correct
        if (answer == this.state.correct) {
            //@author Dion: gamified streaks
            this.streak++;
            if (this.streak >= 3 && this.streak < 6) {
                this.source = this.state.red;
                multiplier = 20
            } else if (this.streak >= 6) {
                this.source = this.state.blue;
                multiplier = 40
            }
            // If so, display green particles, increase score and the correct answer count
            this.colour = this.correctColour;
            this.setState((state) => ({
                answersCount: state.answersCount + 1,
                score: state.score + (multiplier * state.timer),
                /// @author Dion: to display coins earned giving instant gamified feedback
                currentScore: (multiplier * state.timer)
            }));
        }
        else {
            ///@author Dion: gamified streak keeper to spend coins on and see benefits in quiz.
            if (!this.state.streakKeeper || this.streak < 3) {
                this.streak = 0; // TODO: implement bought streak keeper BONUS passed down from Coin Corner navigator props
            } else if (this.streak >= 3) {
                this.setState({ streakKeeper: false }) // One time use item
            }
            // If not, display red particles and add question title to array of questions that were answered incorrectly
            this.colour = this.incorrectColour;
            var category = this.questions[this.state.counter].category;
        }
    }

    /**
     * Function for moving to the next question once current question has been completed
     */
    setNextQuestion() {
        // Increment current question counter
        const counter = this.state.counter + 1;
        const questionId = this.state.questionId + 1;

        // Assign all question values to be the next questions values
        if (this.questions[counter] != undefined) { // null check when spamming quez to ensure it doesnt read empty value
            this.setState({
                counter: counter,
                questionId: questionId,
                question: this.questions[counter].question,
                correct: this.questions[counter].correct,
                answerOptions: this.questions[counter].answers,
                answer: '',
            });
        }
    }

    /**
     * Function that returns how many answers were answered correctly
     */
    getResults() {
        //@author Dion: set up callbacks to retrieve score from quiz upon end and display as Coins in coin center
        // do callbacks only once to prevent exponential coin addition further along
        if (!this.callbacksDone) {
            { this.props.coinCallbackFromParent(this.state.score) }
            { this.props.streakCallbackFromParent(this.state.streakKeeper) } //similarly check the state of the streakkeeper bonus
            this.callbacksDone = true;
        }
        var amount = this.state.answersCount;
        return amount;
    }

    /**
     * Function that is called when all questions have been answered
     * Sets result to be whatever score the player has currently
     */
    setResults(result) {
        this.setState({ result: result });
        this.changeToResult(); // Changes to results page
    }

    /**
     * Function for when the user runs out of time on a question
     */
    timeout() {
        this.setUserAnswer("-1"); // Passes incorrect answer so that user will get no score
        this.nextSet(); // Calls for next question
    }

    /**
    * Function called when user selects an answer
    */
    // Dion : had to change value passed here to match native setup
    handleAnswerSelected(value) {
        this.setUserAnswer(value); // Sets users answer to be the option they selected
        this.nextSet(); // Calls for the next question

        // Resets timer and calls for particles to be drawn
        this.setState({
            particles: true
        });

    }

    /**
     * Function called when user selects an answer
     */
    nextSet() {
        // Resets interval for timer
        clearInterval(this.intervalHandle);
        this.intervalHandle = setInterval(this.tick, 1000);

        // Checks to see if all 15 questions have been answered
        if (this.state.questionId < this.questions.length) {
            // If not, go to the next question
            setTimeout(() => this.setNextQuestion(), 300);
        } else {
            // If so, end the quiz
            setTimeout(() => this.setResults(this.getResults()), 300);
        }
    }

    //@author Dion: this is an onLayout function which goes in tandem with the wuestion text object below
    // When that text is updated for each question this function is called and we do some quick calculations on how many lines of text
    // That question now occupies so we can adjust below how many blocks to put - all in effort to stop the radio buttons moving too much
    onLayout = e => {
        const { height } = e.nativeEvent.layout;
        this.count = Math.floor(height / styles.text.lineHeight);
        this.setState({
            timer: 10,
        });
    }

    /**
     * Function for rendering all relevant quiz content to the screen
     */
    render() {
        console.log(this.state.streakKeeper + " Quiz " + this.state.score)

        /// @author Dion Buckley: for radio button
        this.radioProps = [
            { label: this.state.answerOptions[0], value: 0 },
            { label: this.state.answerOptions[1], value: 1 },
            { label: this.state.answerOptions[2], value: 2 }
        ]
        if (this.state.page === 'Confirm') {
            /// @author Dion Buckley
            /// Simply change to quiz here (outside of Component mount)
            this.changeToQuiz()
            return (null);
        }
        else if (this.state.page === 'Quiz') { // If user is on the quiz screen
            return ( // Render the quiz content to the screen
                // @author Dion: React native rendering of Quiz
                <View style={styles.container}>
                    {
                        this.state.streakKeeper &&
                        <Image source={require("../assets/sprites/fuel.png")} top={-20} marginBottom={1} />
                    }
                    <Text style={styles.text}>{"Time: " + this.state.timer} </Text>
                    <Text style={styles.text}>{"Question " + this.state.questionId + " of " + this.questions.length} </Text>
                    <Text onLayout={this.onLayout} style={styles.text} >{this.state.question} </Text>
                    {
                        this.count === 1 &&
                        <Text>{""} </Text>
                    }
                    {/* @author Dion:  triple radio button for answer options */}
                    <RadioForm
                    style = {styles.text}
                        radio_props={this.radioProps}
                        initial={-1}
                        labelHorizontal={true}
                        buttonColor={'#2196f3'}
                        animation={true}
                        onPress={(value) => {
                            this.setState({ value: value });
                            this.handleAnswerSelected(this.state.answerOptions[value]);
                        }}
                    />
                    {/* // Dion: the following two blocks are to stop the radio buttons moving depending on coin or right / wrong etc */}
                    {
                        this.colour === 'red' && this.state.particles &&
                        <Text style={styles.block}>{""} </Text>
                    }
                    {
                        !this.state.particles &&
                        <Text style={styles.block}>{""} </Text>
                    }

                    {/* // Dion: if right answer render animated coin and number along with particles */}
                    {
                        this.colour === 'green' && this.state.particles &&
                        <Coin />
                    }
                    {
                        this.colour === 'green' && this.state.particles &&
                        <Text>{"+ " + this.state.currentScore}</Text>
                    }
                    {// If particles are meant to be drawn and next question hasn't loaded yet
                        this.state.particles && this.state.result === -1 &&

                        /// @author Dion:  react native specific particle emitter
                        <Emitter
                            numberOfParticles={44}
                            emissionRate={44}
                            interval={350}
                            particleLife={222}
                            direction={-90}
                            spread={333}
                            fromPosition={{ x: 150, y: 300 }}
                        >
                            <Image source={require('../assets/sprites/flare.png')} tintColor={this.colour} />
                        </Emitter>
                    }
                    <Text>{""} </Text>
                    <View>
                        {this.streak >= 3 &&
                            <Image source={this.source} top={-20} marginBottom={1} />
                        }
                        {
                            this.streak < 3 &&
                            <Text style={styles.block2}>{""} </Text>
                        }
                    </View>
                </View>
            );
        }
        else if (this.state.page === 'Result') { // If user is on the results screen
            var note = "";
            if (this.state.result > 0 && this.state.result < 5) {
                note = "Nice try, I know you can do even better next time!"
            } else if (this.state.result >= 5 && this.state.result < 10) {
                note = "Very nice, let's push this just a little further!"
            } else if (this.state.result >= 10) {
                note = "Wow! You walk the path towards becoming a master here!"
            } else {
                note = "Don't panic, check out Video Vault if you get stuck!"
            }
            return ( // Render all the results content
            ///@author Dion: all the extra results options and notes and coins are my own
                <View style={styles.container}>
                    <Text style = {styles.text}>{"You answered: " + this.state.result + " questions correctly"}</Text>
                    <Text style = {styles.text}>{note}</Text>
                    <Text>{""} </Text>
                    <Text>{""} </Text>
                    <Coin/>
                    <Text style = {styles.text}>{"You earned: " + this.state.score + " gold coins"}</Text>
                    {
                        this.state.result > 0 && // if they get nothing right they don't have enough coins to buy anything
                        <Text style = {styles.text}>{"Why not go back to check out Coin Corner?"}</Text>
                    }
                    <Text>{""} </Text>
                    <Text>{""} </Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        margin: 5,
        fontFamily: 'OpenSans',
        lineHeight: 30,
    },
    block: {
        fontSize: 45,
        textAlign: 'center',
        margin: 5,
        fontFamily: 'OpenSans'
    },
    block2: {
        fontSize: 90,
        textAlign: 'center',
        margin: 5,
        fontFamily: 'OpenSans'
    },
});

export default Quiz;
