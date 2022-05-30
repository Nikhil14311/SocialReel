import { View, Text } from 'react-native'
import React, { useState, useEffect, useContext} from 'react'
import { AuthContext } from './Auth'
import auth from '@react-native-firebase/auth';
const Route = () => {
    const [initializing, setInitializing] = useState(true);
    const {user, setUser} = useContext(AuthContext);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if(initializing) setInitializing(false);
    }

    useEffect(()=>{
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    },[])
    if(initializing) return null;
    return (
        <View>
        {user ? <Text>Route</Text> : <Text>Auth</Text>}
        </View>
    )
}

export default Route