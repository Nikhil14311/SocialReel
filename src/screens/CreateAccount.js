import { View, Text,TextInput, TouchableOpacity, StatusBar } from 'react-native'
import React, {useState, useContext} from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { hp, wp } from '../common/Dimension'
import { AuthContext } from './Auth'
import auth from '@react-native-firebase/auth'

const CreateAccount = (props) => {

        const [boolean, setBoolean] = useState(true)
        const [phonenumber, setPhonenumber] = useState("")
        const [email,setEmail] = useState("")
        const [password,setPassword] = useState("")
        const [code, setCode] = useState('');
        const [confirm, setConfirm] = useState(null);

        const { register } = useContext(AuthContext)

        const PHONE = () => {
            setBoolean(true)
        }
        const EMAIL = () => {
            setBoolean(false)
        }
        const onPhonenumber = (val) => {
              setPhonenumber(val)
              console.log("phonenumber",phonenumber)
        }
        const onEmail = (val) => {
            setEmail(val)
            console.log("email",email)
        }
        const onPassword = (val) => {
            setPassword(val)
        }


        async function signInWithPhoneNumber(phoneNumber) {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
        }

        async function confirmCode() {
            try {
              await confirm.confirm(code);
              console.log("success")
            //   props.navigation.navigate('Home')
              setConfirm(null)
            } catch (error) {
              console.log('Invalid code.');
            }
        }

  return (
    <View style={{flex:1,backgroundColor:"black",flexDirection:"column",justifyContent:"space-between"}}>
        <StatusBar backgroundColor={"black"}/>
        <View>
            <View style={{alignItems:'center',marginTop:hp(10)}}>
                <EvilIcons name="user" size={180} color="white" />
            </View>
            <View style={{marginTop:hp(1),paddingLeft:wp(5),paddingRight:wp(5)}}>
                <View>
                    <View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",borderBottomWidth:1,height:hp(8),borderBottomColor:"white", alignItems:'center'}}>
                            <TouchableOpacity onPress={() => PHONE()} >
                                <Text style={{color:"white",paddingLeft:wp(12)}}>PHONE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => EMAIL()} >
                                <Text style={{color:"white",paddingRight:wp(12)}}>EMAIL</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    { boolean ?
                        <View> 
                            {!confirm ?
                            <View> 
                                <View style={{paddingTop:hp(3)}}>
                                        <TextInput
                                            style={{color:"gainsboro",fontSize:wp(4),paddingLeft:wp(5),paddingTop:hp(1),alignItems:"center",justifyContent:"center",height:hp(8),borderWidth:1, backgroundColor:"grey"}}
                                            placeholder="Phone Number"
                                            placeholderTextColor="lemonchiffon"
                                            secureTextEntry={false}
                                            //keyboardType='numeric'
                                            value={phonenumber}
                                            onChangeText={(val) => onPhonenumber(val)}

                                        />
                                </View>
                                <View>
                                    <Text style={{color:"lemonchiffon",fontSize:wp(3),paddingLeft:wp(1),paddingRight:wp(1),paddingTop:hp(2)}}>
                                        You may receive SMS notifications from us for security and login purposes.
                                    </Text>
                                </View>
                                <View style={{paddingTop:hp(2)}}>
                                    <TouchableOpacity style={{color:"gainsboro",borderWidth:1,backgroundColor:"#4169e1"}} onPress={() => signInWithPhoneNumber(phonenumber)}>
                                        <Text style={{color:"white",paddingLeft:wp(38),paddingTop:hp(2),alignItems:"center",justifyContent:"center",marginBottom:hp(2)}}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <View>
                                <View style={{paddingTop:hp(3)}}>
                                    <TextInput
                                        style={{color:"gainsboro",fontSize:wp(4),paddingLeft:wp(5),paddingTop:hp(1),alignItems:"center",justifyContent:"center",height:hp(8),borderWidth:1, backgroundColor:"grey"}}
                                        placeholder="Enter OTP"
                                        placeholderTextColor="lemonchiffon"
                                        secureTextEntry={false}
                                        keyboardType='numeric'
                                        value={code}
                                        onChangeText={text => setCode(text)}
                                    />
                                </View>
                                <View style={{paddingTop:hp(2)}}>
                                    <TouchableOpacity style={{color:"gainsboro",borderWidth:1,backgroundColor:"#4169e1"}} onPress={() => confirmCode()}>
                                        <Text style={{color:"white",paddingLeft:wp(38),paddingTop:hp(2),alignItems:"center",justifyContent:"center",marginBottom:hp(2)}}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            }
                        </View>
                    :
                    <View>
                        <View style={{paddingTop:hp(3)}}>
                            <TextInput
                                style={{color:"gainsboro",fontSize:wp(4),paddingLeft:wp(5),paddingTop:hp(1),alignItems:"center",justifyContent:"center",height:hp(8),borderWidth:1, backgroundColor:"grey"}}
                                placeholder="Email"
                                placeholderTextColor="lemonchiffon"
                                secureTextEntry={false}
                                //keyboardType='numeric'
                                onChangeText={(val) => onEmail(val)}
                            />
                            <TextInput
                                style={{color:"gainsboro",fontSize:wp(4),paddingLeft:wp(5),paddingTop:hp(1),alignItems:"center",justifyContent:"center",height:hp(8),borderWidth:1, backgroundColor:"grey"}}
                                placeholder="Password"
                                placeholderTextColor="lemonchiffon"
                                secureTextEntry={true}
                                //keyboardType='numeric'
                                onChangeText={(val) => onPassword(val)}
                            />
                        </View>
                        <View style={{paddingTop:hp(2)}}>
                            <TouchableOpacity style={{color:"gainsboro",borderWidth:1,backgroundColor:"#4169e1"}} onPress={() => register(email,password)}>
                                <Text style={{color:"white",paddingLeft:wp(38),paddingTop:hp(2),alignItems:"center",justifyContent:"center",marginBottom:hp(2)}}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }
                </View>
                
            </View>
        </View>

        
        <View style={{flexDirection:"row",bottom:0,paddingLeft:wp(30),height:hp(7),borderTopWidth:1,width:"100%",borderTopColor:"#778899",paddingTop:hp(2)}}>
            <Text style={{color:"gainsboro",fontSize:wp(3)}}>Already have an account?</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')} style={{marginLeft:wp(2)}} >
                <Text style={{color:"white",fontSize:wp(3),fontWeight:"bold"}}>Log In</Text>
            </TouchableOpacity>
        </View>

        
        
    </View>
  )
}

export default CreateAccount