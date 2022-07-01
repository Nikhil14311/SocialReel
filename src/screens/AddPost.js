import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, {useEffect, useState, useContext} from 'react'
import { dimension } from '../common/PixelScaling'
import firestore, { firebase } from '@react-native-firebase/firestore';
import { AuthContext } from './Auth';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import {hp} from '../common/Dimension'
import { launchImageLibrary } from 'react-native-image-picker';
import Storage from '@react-native-firebase/storage';



const AddPost = (props) => {
    const {user} = useContext(AuthContext)

    useEffect(() => {
        const subscriber = firestore()
        .collection('Users')
        //.doc(user.uid)
        .doc(user.uid)
        .onSnapshot(documentSnapshot => {
            console.log('User data: ', documentSnapshot.data());
            setUserData(documentSnapshot.data());
        });
        // Stop listening for updates when no longer required
        return () => subscriber();
    },[])

    const [bio, setBio] = useState(null)
    const [bioError, setBioError] = useState(false)

    const [imageUri, setImageUri] = useState(null)

    const[userData,setUserData] = useState(null)

    const[uploading, setUploading] = useState(false)
    const[transfered, setTransfered] = useState(null)


    const onChangeBio = (text) => {
        setBio(text)
        setBioError(false)
    }


    const onUpdateProfile = async () => {
        //const userid = JSON.stringify(user.uid);
        setUploading(true)
        setTransfered(0)
        const uploadUri = imageUri;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

        const extension = filename.split('.').pop();
        const name =  filename.split('.').slice(0,-1).join('.');
        filename = name + Date.now() + '.' + extension;

        const storageRef = Storage().ref(`photos/${filename}`);
        const task = storageRef.putFile(uploadUri);

        task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            setTransfered(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
            )
        });


        try{

            await task;
            const url = await storageRef.getDownloadURL();
            console.log('image url from cloud store',url);
            setUploading(false)
            // Alert.alert(
            //     'Image Uploaded!',
            //     'Your image has been uploaded to the firebase cloud storage successfully!'
            // )
            //setImageUri(url);

           //return url;

            if(bio != null ){
                console.log('success......')
               await firestore()
                .collection('posts')
                .add({
                    userid : user.uid,
                    post : bio,
                    userImage : userData.imageUri,
                    username : userData.username,
                    imageUri : url,
                    postTime : firestore.Timestamp.fromDate(new Date()),
                    likes:null,
                    comments: null
                })
                .then(() => {
                    console.log('Post updated!');
                    props.navigation.push('Home')
                });
                
            }
            if(bio === null){
                setBioError(true)
            }


        }catch(e){
            console.log('error',e);
            return null;
        }


            //this is unusefull

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

            // if(bio != null ){
            //     console.log('success......')
            //     firestore()
            //     .collection('posts')
            //     .add({
            //         userid : user.uid,
            //         post : bio,
            //         userImage : userData.imageUri,
            //         username : userData.username,
            //         imageUri : imageUri,
            //         postTime : firestore.Timestamp.fromDate(new Date()),
            //         likes:null,
            //         comments: null
            //     })
            //     .then(() => {
            //         console.log('Post updated!');
            //         props.navigation.push('Home')
            //     });
            // }

            // if(bio === null){
            //     setBioError(true)
            // }
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
               
                    <TouchableOpacity style={{alignItems:'center',marginTop:hp(10)}} onPress={() =>accessGallery()}>
                    {imageUri == null ?
                        <EvilIcons name="user" size={180} color="white" />
                    :
                    <Image 
                        source={{ uri: imageUri}} 
                        style={{width: 100, height: 100}} 
                    />  }
                     </TouchableOpacity>
                <Text style={{fontWeight:'bold', fontSize:dimension(18),marginTop:dimension(20),color:'white'}}>Upload Image</Text>
            </View>
            <View style={styles.inputFiled}>
                <TextInput 
                    placeholder="Enter a message"
                    placeholderTextColor="grey"
                    onChangeText={(text) => onChangeBio(text)}
                    style={styles.inputFiledTxt}
                    multiline={true}
                />
                {bioError ? <Text style={{color:'red',marginTop:dimension(10)}}>Please enter bio</Text> : null }
            </View>
            <View style={{alignItems:'center',paddingVertical:dimension(20)}}>
                {uploading ? (
                    <View>
                        <Text>{transfered} % completed</Text>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) :
                    <TouchableOpacity style={styles.updateBtn} onPress={() => onUpdateProfile()}>
                        <Text style={{color:'white'}}>Add Post</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default AddPost

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