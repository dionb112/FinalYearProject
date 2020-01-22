import React from 'react';
import StackNavigator from './StackNavigator';
import { createAppContainer } from 'react-navigation';

const AppStack = createAppContainer(StackNavigator);

export default class App extends React.Component{
  render() {
    return (
      <AppStack/>
    );
  }
}
