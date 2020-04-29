///@authors Dion Buckley (+Peter Daly on some parts of Quiz screen and Quiz component - check comments in detail)
///@date Sep 2019 - Apr 2020
///@time-taken: Roughly 200 hours including all Erasmus+ tasks.
///@knownbugs:  1. (seems like FIXED) -> upon fetching persisted coins sometime extra '0's are appended to the displayed coins 
///             2. sometimes the fire streak will stay after using the fuel and failing again (difficult to reproduce)  
///             3. occasionally the quiz won't load on first open of the app - usually network related issue though              
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
