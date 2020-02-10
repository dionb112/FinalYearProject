import { createStackNavigator } from 'react-navigation';
import CeliAppScreen from '../screens/CeliAppScreen';
import HomeScreen from '../screens/HomeScreen';
import VideoScreen from '../screens/VideoScreen';
import GlutenedScreen from '../screens/GlutenedScreen';
import QuizScreen from '../screens/QuizScreen';


const StackNavigator = createStackNavigator({ CeliApp: CeliAppScreen, Home: HomeScreen, Video: VideoScreen, Glutened: GlutenedScreen, Quiz: QuizScreen });

export default StackNavigator;
