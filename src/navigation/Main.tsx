import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Premium from '../screens/Premium';
import VisionBoard from '../screens/VisionBoard';
import JournalHomeScreen from '../screens/Journal';
import colors from '../constants/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabBarIcon = (name: any, focused: boolean) => {
  const color = focused ? colors.primary : 'gray';
  return <MaterialIcons name={name} size={24} color={color} />;
};

const PremiumStack = () => (
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

export const Main = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="PremiumStack" component={PremiumStack} />
  </Stack.Navigator>
);
