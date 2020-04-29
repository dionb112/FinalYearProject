///@authors Dion Buckley (+Peter Daly on some parts of Quiz screen and Quiz component - check comments in detail)
///@date Sep 2019 - Apr 2020
///@time-taken: Roughly 200 hours including all Erasmus+ tasks.
///@knownbugs:  1. (seems like FIXED) -> upon fetching persisted coins sometime extra '0's are appended to the displayed coins 
///             3. occasionally the quiz won't load on first open of the app - usually network related issue though              
///             4. if answering too fast and you have fuel active and you choose wrong twice, using fuel then the second time you won't hear 'wrong' sound
import React from 'react';
import StackNavigator from './components/StackNavigator';
import { createAppContainer } from 'react-navigation';

const AppStack = createAppContainer(StackNavigator);

export default class App extends React.Component{
  render() {
  console.disableYellowBox = true; // Disable warning pop ups for prod
    return (
      <AppStack/>
    );
  }
}
