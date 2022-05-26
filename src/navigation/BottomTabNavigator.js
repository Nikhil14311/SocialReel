import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import Notification from '../screens/Notification';
import { dimension } from '../common/PixelScaling';
import Octicons from 'react-native-vector-icons/Octicons'
import Reels from '../screens/Reels';
import Profile from '../screens/Profile';


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
                        <Octicons 
                            name='home'
                            size={dimension(24)}
                            color={tabInfo.focused ? "white" : "grey"}
                        />
                    )
                }
            }}
        />
        <Tab.Screen 
            name="Reels" 
            component={Reels}
            options={{
                tabBarIcon : (tabInfo) => {
                    return(
                        <Octicons 
                            name='video'
                            size={dimension(24)}
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
                        <Octicons 
                            name='bell'
                            size={dimension(24)}
                            color={tabInfo.focused ? "white" : "grey"}
                        />
                    )
                }
            }} 
        />
        <Tab.Screen 
            name="Profile" 
            component={Profile}
            options={{
                tabBarIcon : (tabInfo) => {
                    return(
                        <Octicons 
                            name='person'
                            size={dimension(24)}
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