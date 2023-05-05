/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider, Badge} from 'react-native-paper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {Main} from './navigation/Main';
import {SafeAreaView} from 'react-native';

const App = () => {
  GoogleSignin.configure({
    webClientId:
      '469012389462-atmhi36bembrin6cq0uh73ucc4aabtfo.apps.googleusercontent.com',
  });
  return (
    <PaperProvider>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;
