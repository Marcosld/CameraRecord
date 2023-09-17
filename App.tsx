/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Stack} from './components/stack';
import {Main} from './routes/main';
import {Record} from './routes/record';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Record" component={Record} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
