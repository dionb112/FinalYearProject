import { createStackNavigator } from 'react-navigation';
import CeliAppScreen from './CeliAppScreen';
import HomeScreen from './HomeScreen';
import VideoScreen from './VideoScreen';
import GlutenedScreen from './GlutenedScreen';
import QuizScreen from './QuizScreen';


const StackNavigator = createStackNavigator({ CeliApp: CeliAppScreen, Home: HomeScreen, Video: VideoScreen, Glutened: GlutenedScreen, Quiz: QuizScreen });

export default StackNavigator;
