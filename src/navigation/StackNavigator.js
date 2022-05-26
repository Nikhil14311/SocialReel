import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard';
import Notification from '../screens/Notification';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import BottomTabNavigator from './BottomTabNavigator';
import Discover from '../screens/Discover';




const Stack = createNativeStackNavigator();


const StackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={Login}  
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="Signup" 
          component={Signup} 
          options={{headerShown:false}}
        />
        <Stack.Screen 
          name="discover" 
          component={Discover} 
          options={{headerShown:false}}
          // options={{
          //   title:"Discover People",
          //   headerTitleAlign:'center',
          //   headerTintColor:'white',
          //   headerTransparent:true
          // }}
        />
        <Stack.Screen 
          name="Home" 
          component={BottomTabNavigator} 
          options={{headerShown:false}}
        />
    </Stack.Navigator>
  )
}

export default StackNavigator