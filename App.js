import React from 'react';
import StackNavigator from './components/StackNavigator';
import { createAppContainer } from 'react-navigation';

const AppStack = createAppContainer(StackNavigator);

export default class App extends React.Component{
  render() {
  console.disableYellowBox = true; // Disable annoying warning popping up for now
    return (
      <AppStack/>
    );
  }
}
