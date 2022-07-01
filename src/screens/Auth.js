import React, {createContext, useState, useEffect} from 'react'
import auth from '@react-native-firebase/auth';
import {View, Text, StyleSheet} from 'react-native'
import { dimension } from '../common/PixelScaling';

export const AuthContext = createContext();

export const AuthProvider = ({children,props}) => {
    const [user,setUser] = useState(null)
    const [confirm, setConfirm] = useState(null);
    const [error, setError] = useState(null);

    // if(error !== null){
    //     return(
    //         <View style={styles.banner}>
    //             <Text style={{color:'#dc143c',fontWeight:'bold'}}>{error}</Text>
    //         </View> 
    //     )
    // }

    if(error!==null){
        setTimeout(()=>{
            setError(false);
        },5000)
    }
    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login : async(email,password) => {
                    try{
                        await auth().signInWithEmailAndPassword(email,password)
                    }catch(e){
                        console.log(e.message);
                       setError(e.message);
                    }
                },
                register : async(email,password) => {
                    try{
                        await auth().createUserWithEmailAndPassword(email,password)
                    }catch(e){
                        console.log(e);
                        setError(e.message);
                    }
                },
                // phoneno : async(phoneNumber) => {
                //     try{
                //         await auth().signInWithPhoneNumber(phoneNumber)
                //     }catch(e){
                //         console.log(e);
                //     }
                // },
                // confirmcode : async(code) => {
                //     try{
                //         //await confirm.confirm(code)
                //         await auth()
                //         console.log('success')
                //     }catch(e){
                //         console.log(e);
                //     }
                // },
                logout : async () => {
                    try {
                        await auth().signOut();
                    }catch(e){
                        console.log(e);
                        setError(e.message);
                    }
                }
            }}
        >
            {children}
            {error ? 
            <View style={styles.banner}>
                <Text style={{color:'black'}}>{error}</Text>
            </View>
            :null}
        </AuthContext.Provider>
    )
}

const styles = StyleSheet.create({
    banner : {
        //flex:1,
        position:'absolute',
        left:0,
        right:0,
        bottom:6,
        //alignItems:'center',
        backgroundColor:'whitesmoke',
        //height:dimension(120),
        marginHorizontal : dimension(20),
        borderRadius:dimension(10),
        //justifyContent:'center',
        paddingHorizontal:dimension(10),
        paddingVertical:dimension(5)
    }
})