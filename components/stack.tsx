import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Main: undefined;
  Record: {countdown: number; workTime: number};
};

export const Stack = createNativeStackNavigator<RootStackParamList>();
