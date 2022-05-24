import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import Notification from '../screens/Notification';
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
        screenOptions={{
            tabBarActiveBackgroundColor:'black',
            tabBarInactiveBackgroundColor:'black',
            tabBarActiveTintColor:'white',
            tabBarInactiveTintColor:'grey',
            headerShown:false
        }}
    >
        <Tab.Screen 
            name="Dashboard" 
            component={Dashboard} 
            options={{
                tabBarIcon : (tabInfo) => {
                    return(
                        <Entypo 
                            name='home'
                            size={24}
                            color={tabInfo.focused ? "white" : "grey"}
                        />
                    )
                }
            }}
        />
        <Tab.Screen 
            name="Notifications" 
            component={Notification}
            options={{
                tabBarIcon : (tabInfo) => {
                    return(
                        <Ionicons 
                            name='notifications'
                            size={24}
                            color={tabInfo.focused ? "white" : "grey"}
                        />
                    )
                }
            }} 
        />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator