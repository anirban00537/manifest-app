import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider, Badge} from 'react-native-paper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {Main} from './navigation/Main';
import {SafeAreaView} from 'react-native';
import {createRealmContext} from '@realm/react';
import {VisionCard} from './db/realm';

const App = () => {
  GoogleSignin.configure({
    webClientId:
      '469012389462-atmhi36bembrin6cq0uh73ucc4aabtfo.apps.googleusercontent.com',
  });
  const {RealmProvider} = createRealmContext({
    schema: [VisionCard],
  });
  return (
    <PaperProvider>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <RealmProvider>
            <Main />
          </RealmProvider>
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;
