import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/login';
import Signup from '../screen/signup';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{
          headerShown:false
        }} />
        <Stack.Screen name="Signup" component={Signup} options={{
          headerShown:false
        }} />
    </Stack.Navigator>
    );
  }      