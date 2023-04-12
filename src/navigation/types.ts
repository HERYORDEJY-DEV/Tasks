import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

export type RootNavigationParamList = {
  Tasks: undefined;
  NewList: undefined;
};

export type TasksNavigationProp = NativeStackNavigationProp<
  RootNavigationParamList,
  'Tasks'
>;

export type NewListNavigationProp = NativeStackNavigationProp<
  RootNavigationParamList,
  'NewList'
>;
