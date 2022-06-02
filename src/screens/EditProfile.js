import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, {useEffect, useState, useContext} from 'react'
import { dimension } from '../common/PixelScaling'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './Auth';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import {hp} from '../common/Dimension'
import { launchImageLibrary } from 'react-native-image-picker';




const EditProfile = (props) => {
    const {user} = useContext(AuthContext)
//     useEffect(() => {
//         const auth = getAuth();
//         updateProfile(auth.currentUser, {
//         displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
//         }).then(() => {
//             // Profile updated!
//             console.log("Profile Updated")
//         }).catch((error) => {
//             // An error occurred
//             console.log("Profile updated error",error)
//         });
//     })

    const [name, setName] = useState(null)
    const [nameError, setNameError] = useState(false)

    const [username, setUsername] = useState(null)
    const [usernameError, setUsernameError] = useState(false)

    const [bio, setBio] = useState(null)
    const [bioError, setBioError] = useState(false)

    const [imageUri, setImageUri] = useState(null)

    const onChangeName = (text) => {
        setName(text)
        setNameError(false)
    }

    const onChangeUsername = (text) => {
        setUsername(text)
        setUsernameError(false)
    }
    const onChangeBio = (text) => {
        setBio(text)
        setBioError(false)
    }

    const onUpdateProfile = () => {
        //const userid = JSON.stringify(user.uid);
        if(name !== null && username !== null && bio !== null ){
            console.log('success......')
            firestore()
            .collection('Users')
            .doc(user.uid)
            .set({
                name:name,
                username:username,
                bio:bio,
                imageUri : imageUri,
            })
            .then(() => {
                console.log('User updated!');
                props.navigation.navigate('Profile')
            });
            // const auth = getAuth();
            // updateProfile(auth.currentUser, {
            //     displayName: name, 
            //     //photoURL: "https://example.com/jane-q-user/profile.jpg"
            // }).then(() => {
            // // Profile updated!
            // // ...
            // console.log('profile updated....')
            // }).catch((error) => {
            // // An error occurred
            // // ...
            // console.log(error)
            // });

        }
        if(name === null){
            setNameError(true)
        }
        if(username === null){
            setUsernameError(true)
        }
        if(bio === null){
            setBioError(true)
        }
    }


    const accessGallery = () => {
        var options = {
            title: 'Select Image',
            customButtons: [
              {
                name: 'customOptionKey',
                title: 'Choose Photo from Custom Option'
              },
            ],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
         };
         launchImageLibrary(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log(
                'User tapped custom button: ',
                response.customButton
              );
              alert(response.customButton);
            } else {
              setImageUri(response.assets[0].uri);
            }
         });
         
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                {imageUri == null ?
                    <TouchableOpacity style={{alignItems:'center',marginTop:hp(10)}} onPress={() =>accessGallery()}>
                        <EvilIcons name="user" size={180} color="white" />
                    </TouchableOpacity> :
                    <Image 
                        source={{ uri: imageUri}} 
                        style={{width: 100, height: 100}} 
                />}
                <Text style={{fontWeight:'bold', fontSize:dimension(18),marginTop:dimension(20),color:'white'}}>Upload Image</Text>
            </View>
            <View style={styles.inputFiled}>
                <TextInput 
                    placeholder="Name"
                    placeholderTextColor="grey"
                    onChangeText={(text) => onChangeName(text)}
                    style={styles.inputFiledTxt}
                />
               {nameError ? <Text style={{color:'red',marginTop:dimension(10)}}>Please enter name</Text> : null }
            </View>
            <View style={styles.inputFiled}>
                <TextInput 
                    placeholder="User name"
                    placeholderTextColor="grey"
                    onChangeText={(text) => onChangeUsername(text)}
                    style={styles.inputFiledTxt}
                />
                {usernameError ? <Text style={{color:'red',marginTop:dimension(10)}}>Please enter username</Text> : null }
            </View>
            <View style={styles.inputFiled}>
                <TextInput 
                    placeholder="Bio"
                    placeholderTextColor="grey"
                    onChangeText={(text) => onChangeBio(text)}
                    style={styles.inputFiledTxt}
                    multiline={true}
                />
                {bioError ? <Text style={{color:'red',marginTop:dimension(10)}}>Please enter bio</Text> : null }
            </View>
            <View style={{alignItems:'center',paddingVertical:dimension(20)}}>
                <TouchableOpacity style={styles.updateBtn} onPress={() => onUpdateProfile()}>
                    <Text>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    mainContainer:{
        flex : 1,
        backgroundColor : 'black',
        paddingHorizontal:dimension(20),
        paddingVertical:dimension(20)
    },
    imageContainer : {
        paddingVertical:dimension(20),
        alignItems:'center'
    },  
    inputFiled:{
        //borderBottomWidth:1,
       // borderColor:'white',
        marginVertical:dimension(10)
    },
    updateBtn : {
        borderWidth:1,
        borderColor:'white',
        width:dimension(150),
        height:dimension(39),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:dimension(5)
    },
    inputFiledTxt : {
        borderBottomWidth:1,
        borderColor:'white',
    }
})