import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Premium from '../screens/Premium';
import { MaterialIcons } from '@expo/vector-icons';
import VisionBoard from '../screens/VisionBoard';

export type MainStackParams = {
  Premium: undefined;
  VisionBoard: undefined;
};

const MainStack = createStackNavigator<MainStackParams>();
const Tab = createBottomTabNavigator<MainStackParams>();

const tabBarIcon = (name: any, focused: boolean) => {
  const color = focused ? 'blue' : 'gray';
  return <MaterialIcons name={name} size={24} color={color} />;
};

export const Main = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="VisionBoard"
      component={VisionBoard}
      options={{
        title: 'VisionBoard',
        tabBarIcon: ({ focused }) => tabBarIcon('dashboard', focused),
        headerShown: false,
        tabBarLabel: () => null, // hide the title
      }}
    />
    <Tab.Screen
      name="Premium"
      component={Premium}
      options={{
        title: 'premium',
        tabBarIcon: ({ focused }) => tabBarIcon('stars', focused),
        headerShown: false,
        tabBarLabel: () => null, // hide the title
      }}
    />
  </Tab.Navigator>
);
