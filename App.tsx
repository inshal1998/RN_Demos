import { NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, WallpaperPicker} from './src/screens';

export type RootStackParamList = {
  HomeScreen: undefined;
  WallpaperPicker: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='HomeScreen'>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="WallpaperPicker" component={WallpaperPicker} />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
