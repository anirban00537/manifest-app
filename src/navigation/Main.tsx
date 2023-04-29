import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Premium from '../screens/Premium';
import VisionBoard from '../screens/VisionBoard';
import JournalHomeScreen from '../screens/Journal';
import colors from '../constants/colors';
import VisionDetails from '../screens/VisionDetails';
import AffermationDetailsAndEdit from '../screens/AffermationDetails';
import CreateVisionCard from '../screens/CreateVisionCard';
import LoginScreen from '../screens/Login';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabBarIcon = (name: any, focused: boolean) => {
  const color = focused ? colors.primary : 'gray';
  return <MaterialIcons name={name} size={24} color={color} />;
};
const LoginStacks = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="login"
      component={LoginScreen}
      options={{
        title: 'LoginScreen',
        headerTitleAlign: 'center',
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);
const OtherStacks = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Premium"
      component={Premium}
      options={{
        title: 'Premium',
        headerTitleAlign: 'center',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="VisionDetails"
      component={VisionDetails}
      options={{
        title: 'VisionDetails',
        headerTitleAlign: 'center',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="AffermationDetailsAndEdit"
      component={AffermationDetailsAndEdit}
      options={{
        title: 'AffermationDetailsAndEdit',
        headerTitleAlign: 'center',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="CreateVisionCard"
      component={CreateVisionCard}
      options={{
        title: 'CreateVisionCard',
        headerTitleAlign: 'center',
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.background,
        borderTopWidth: 0,
      },
    })}
  >
    <Tab.Screen
      name="VisionBoard"
      component={VisionBoard}
      options={{
        title: 'Vision Board',
        tabBarIcon: ({ focused }) => tabBarIcon('dashboard', focused),
        headerShown: false,
        tabBarLabel: () => null, // hide the tab title
      }}
    />
    <Tab.Screen
      name="Journal"
      component={JournalHomeScreen}
      options={{
        title: 'Journal',
        tabBarIcon: ({ focused }) => tabBarIcon('book', focused),
        headerShown: false,
        tabBarLabel: () => null, // hide the tab title
      }}
    />
  </Tab.Navigator>
);

export const Main = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  GoogleSignin.configure({
    webClientId:
      '873523094633-b6g6qma0f75sfq6knjdi15d5lttdaa0e.apps.googleusercontent.com',
  });

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <Stack.Screen name="MainTabs" component={MainTabs} />
      ) : (
        <Stack.Screen name="LoginStacks" component={LoginStacks} />
      )}
      <Stack.Screen name="OtherStacks" component={OtherStacks} />
    </Stack.Navigator>
  );
};
