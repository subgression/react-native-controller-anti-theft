import React, {Component} from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';

import MainScreen from './screens/MainScreen.js';
import AddAntifurtoScreen from './screens/AddAntifurtoScreen.js';
import ControlScreen from './screens/ControlScreen.js';

const MainNavigator = createStackNavigator({
  Home: {screen: MainScreen},
  Add: {screen: AddAntifurtoScreen},
  Control: {screen: ControlScreen}
});

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;
