import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
//import { TouchableOpacity } from 'react-native-gesture-handler'
//import { Dropdown } from 'react-native-element-dropdown';
import { hp, wp } from '../common/Dimension'

const Signup = (props) => {
  return (
    <View style={{flex:1,backgroundColor:"black",justifyContent:'center',alignItems:'center'}}>
        
        <View style={{alignItems:"center",justifyContent:"center"}}>
            <Text style={{color:"white", fontSize:wp(14), fontFamily:'Billabong'}}>Instagram</Text>
        </View>
        <View style={{paddingTop:hp(5)}}>
            <TouchableOpacity 
              style={{borderWidth:1, borderColor:"#4169e1",height:hp(6),backgroundColor:"#4169e1",paddingHorizontal:wp(25),alignItems:'center',justifyContent:'center'}}
              onPress={() => props.navigation.navigate('Signup')}
            >
                <Text style={{color:"white",fontWeight:'bold'}}>Create new account</Text>
            </TouchableOpacity>
        </View>

        <View style={{paddingTop:hp(3)}}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                <Text style={{color:"#4169e1",fontWeight:'bold'}}>Log In</Text>
            </TouchableOpacity>
        </View>

    </View>
  )
}

export default Signup