import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { Main } from './navigation/Main';
import colors from './constants/colors';

export default function App() {
  return (
    <>
      <PaperProvider>
        <StatusBar
          // translucent={true}
          backgroundColor={colors.background}
          style="light" // set to "light" to use light-colored status bar icons
        />
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    </>
  );
}
