import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import EditProfile from '../screens/EditProfile';
import Discover from '../screens/Discover';

const Stack = createNativeStackNavigator();


const AppStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={BottomTabNavigator} 
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfile} 
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="discover" 
          component={Discover} 
          options={{headerShown:false}}
        />
    </Stack.Navigator>
  )
}

export default AppStack