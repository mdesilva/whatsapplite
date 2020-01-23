import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import rootReducer from "./store/rootReducer";
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import MessageList from './components/MessageList';
import NewMessage from "./components/NewMessage";
import Login from "./components/Login";
import ConversationThread from "./components/ConversationThread";

const store = createStore(rootReducer);

const AppNavigator = createStackNavigator({ //returns a react component
    Login: {
      screen: Login
    },
    MessageList: {
      screen: MessageList
    },
    NewMessage: {
      screen: NewMessage
    },
    ConversationThread:{
      screen: ConversationThread
    }
});

const AppContainer = createAppContainer(AppNavigator); //returns a react component that takes the navigator react component as an argument

export default class App extends React.Component { 
  render() { 
    return(
      <Provider store={store}>
        <AppContainer/>
      </Provider>
  );
}
};
