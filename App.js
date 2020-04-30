import 'react-native-gesture-handler';
import React from 'react';
import SplashScreen from './src/components/splash-screen/index';
import Auth from './src/components/authentication/index';
import InitialApp from './src/components/initial-app/index';
import SelectUsername from './src/components/select-username/index';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <MainStack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
      <MainStack.Screen name="SelectUsername" component={SelectUsername} options={{ headerShown: false }} />
    </MainStack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="InitialApp" children={InitialApp} options={{headerShown: false}} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default App;