import React from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';

import {RealmContext} from './models';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider, Badge} from 'react-native-paper';

import {Main} from './navigation/Main';
import colors from './constants/colors';

export const AppWrapperNonSync = () => {
  const {RealmProvider} = RealmContext;

  // If sync is disabled, setup the app without any sync functionality and return early
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar
        // translucent={true}
        backgroundColor={colors.background}
      />
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
  },
});
