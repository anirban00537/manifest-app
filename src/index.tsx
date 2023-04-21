import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { Main } from './navigation/Main';

export default function App() {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    dark: true, // set to true to use the dark theme
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
      background: '#121212', // set the background color for the dark theme
      surface: '#1e1e1e', // set the surface color for the dark theme
      text: '#fff', // set the text color for the dark theme
    },
  };

  return (
    <>
      <PaperProvider theme={theme}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
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
