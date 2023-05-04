import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider, Badge} from 'react-native-paper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {Main} from './navigation/Main';
import {SafeAreaView} from 'react-native';

import {RealmContext} from './models';

const App = () => {
  GoogleSignin.configure({
    webClientId:
      '469012389462-atmhi36bembrin6cq0uh73ucc4aabtfo.apps.googleusercontent.com',
  });
  const {RealmProvider} = RealmContext;

  return (
    <PaperProvider>
      <SafeAreaView style={{flex: 1}}>
        <RealmProvider>
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        </RealmProvider>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;
