import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import {RealmContext} from './models';
import colors from './styles/colors';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider, Badge} from 'react-native-paper';

import {Main} from './navigation/Main';

export const AppWrapperNonSync = () => {
  const {RealmProvider} = RealmContext;

  // If sync is disabled, setup the app without any sync functionality and return early
  return (
    <SafeAreaView style={styles.screen}>
      <RealmProvider>
        <PaperProvider>
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        </PaperProvider>
      </RealmProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FF5236',
  },
});
