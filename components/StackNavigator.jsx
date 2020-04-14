import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import VideoScreen from '../screens/VideoScreen';
import GlutenedScreen from '../screens/GlutenedScreen';
import QuizScreen from '../screens/QuizScreen';
import CrossContamScreen1 from '../screens/CrossContamScreen1';
import CrossContamScreen2 from '../screens/CrossContamScreen2';
import CrossContamScreen3 from '../screens/CrossContamScreen3';
import CrossContamScreen4 from '../screens/CrossContamScreen4';
import CoinScreen from '../screens/CoinScreen';

const StackNavigator = createStackNavigator({
    Home: HomeScreen,
    Video: VideoScreen,
    Glutened: GlutenedScreen,
    CCP1: CrossContamScreen1,
    CCP2: CrossContamScreen2,
    CCP3: CrossContamScreen3,
    CCP4: CrossContamScreen4,
    Quiz: QuizScreen,
    Coins: CoinScreen
});

export default StackNavigator;
