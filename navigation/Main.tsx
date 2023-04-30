import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Premium from '../screens/Premium';
import VisionBoard from '../screens/VisionBoard';
import JournalHomeScreen from '../screens/Journal';
import colors from '../constants/colors';
import VisionDetails from '../screens/VisionDetails';
import AffermationDetailsAndEdit from '../screens/AffermationDetails';
import CreateVisionCard from '../screens/CreateVisionCard';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabBarIcon = (name: any, focused: boolean) => {
  const color = focused ? colors.primary : 'gray';
  return <Icon name={name} size={20} color={color} />;
};

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
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.background,
        borderTopWidth: 0,
      },
    })}>
    <Tab.Screen
      name="VisionBoard"
      component={VisionBoard}
      options={{
        title: 'Vision Board',
        tabBarIcon: ({focused}) => tabBarIcon('square-full', focused),
        headerShown: false,
        tabBarLabel: () => null, // hide the tab title
      }}
    />
    <Tab.Screen
      name="Journal"
      component={JournalHomeScreen}
      options={{
        title: 'Journal',
        tabBarIcon: ({focused}) => tabBarIcon('file-signature', focused),
        headerShown: false,
        tabBarLabel: () => null, // hide the tab title
      }}
    />
  </Tab.Navigator>
);

export const Main = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="OtherStacks" component={OtherStacks} />
    </Stack.Navigator>
  );
};
