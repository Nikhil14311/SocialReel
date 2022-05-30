import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, {useState, useReducer, useEffect,useContext} from 'react'
import { slider } from '../json/slide'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from '../navigation/StackNavigator';
import AppIntroSlider from 'react-native-app-intro-slider';
import { dimension } from '../common/PixelScaling';
import AsyncStorage from "@react-native-async-storage/async-storage";


import { AuthContext } from './Auth'
import auth from '@react-native-firebase/auth';
import AppStack from '../navigation/AppStack';





const initialState = {
    StoredData : ''
}

const reducer = (state,action) => {
    switch(action.type){
        case "ASYNCDATA":
            return{
                ...state,
                StoredData : action.payload
            }
    }

}

const MainRoute = ({props}) => {
    const [showRealApp, setShowRealApp] = useState(false)
    //const [ state , dispatch ] = useReducer(reducer,initialState);

    const [initializing, setInitializing] = useState(true);
    const {user, setUser} = useContext(AuthContext);

    const onAuthStateChanged = (user) => {
        console.log(user)
        setUser(user);
        if(initializing) setInitializing(false);
    }

    useEffect(() => {
        // AsyncStorage.getItem('Starting_Page').then((value) => {
        //     dispatch({
        //         type:'ASYNCDATA',
        //         payload:value
        //     })
        // })

        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount


    },[])
    


    // _renderItem = ({ item }) => {
    //     return (
    //         <View style={{flex:1,alignItems:'center',paddingVertical:dimension(20),justifyContent:'center'}}>
    //             <Text style={{paddingVertical:dimension(20), fontFamily:'Azonix'}}>{item.title}</Text>
    //             <Image source={item.image} style={{width:'100%'}}/>
    //             <Text style={{paddingVertical:dimension(20),fontFamily:'gibson-bold'}}>{item.text}</Text>
    //         </View>
    //     );
    // }
    // _onDone = () => {
    // // User finished the introduction. Show real app through
    // // navigation or simply by controlling state
    //     setShowRealApp(true)
    //     AsyncStorage.setItem('Starting_Page','Already Opened');
    // }
    // console.log('reducer stored data',state)

    if(initializing) return null;

    return(
        // <>
        // {state.StoredData === null || '' ?
        // <View style={{flex:1}}>
        //     {showRealApp ? 
        //         <NavigationContainer> 
        //             <StatusBar backgroundColor={'black'} />
        //             <StackNavigator />
        //         </NavigationContainer>
        //     :
        //     <AppIntroSlider renderItem={_renderItem} data={slider} onDone={_onDone}/>
        //     }
        // </View>
        // :
        // <NavigationContainer> 
        //     <StatusBar backgroundColor={'black'} />
        //     <StackNavigator />
        // </NavigationContainer>}
        // </>

            <NavigationContainer> 
                <StatusBar backgroundColor={'black'} />
                {user ? 
                    <AppStack /> : 
                    <StackNavigator />}
            </NavigationContainer> 

    );
}

export default MainRoute