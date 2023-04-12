import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Tasks from 'screens/Tasks';
import NewList from 'screens/Tasks/new';
import { RootNavigationParamList } from './types';

const { Navigator, Screen } = createStackNavigator<RootNavigationParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          component={Tasks}
          name="Tasks"
          options={{ headerShown: false }}
        />
        <Screen
          component={NewList}
          name="NewList"
          options={{ headerShown: false }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
