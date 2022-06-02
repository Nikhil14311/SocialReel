import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, {useRef, useEffect, useContext} from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import { dimension } from '../common/PixelScaling';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './Auth';



const Dashboard = (props) => {
  //const refRBSheet = useRef();
  const { user } = useContext(AuthContext)
  console.log('current user uid',user.uid)
  function onResult(QuerySnapshot) {
    console.log('Got Users collection result.',QuerySnapshot);
  }
  
  function onError(error) {
    console.error(error);
  } 

  // useEffect(()=>{
  //   console.log('userlist',user);
    //refRBSheet.current.open();
    // firestore()
    //   .collection('Users')
    //   .doc(user.uid)
    //   .set({
    //     name : 'Nikhil Karanam',
    //     username : 'nikhilroyal216',
    //     bio : 'Passion on Coding & Actor',
    //   })
    //   .then(() => {
    //     console.log('User added!');
    //   });
    
    // 
    // const subscriber = firestore()
    //   .collection('Users')
    //   .doc(user.uid)
    //   .onSnapshot(documentSnapshot => {
    //     console.log('User data: ', documentSnapshot.data());
    //   });

    // // Stop listening for updates when no longer required
    // return () => subscriber();
  //},[user.uid])
  return (
    <View style={{flex:1,backgroundColor:'black',alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontFamily:'Encore',fontSize:12,color:'red'}}>Dashboard Screen</Text>

      {/* <RBSheet  
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={dimension(170)}
        //duration={250}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#ffffff",
          },
          container:{
            borderTopLeftRadius:dimension(20),
            borderTopRightRadius:dimension(20),
            paddingHorizontal:dimension(20),
            backgroundColor:'#800080'
          }
      }}>
        <Text style={{color:'black', fontSize:dimension(18), color:'white'}}>
          This app mainly designed for fun, Messages and Calls are end to end Encrypted
        </Text>
        <TouchableOpacity style={{alignItems:'center',justifyContent:'center',backgroundColor:'white',paddingVertical:dimension(15), marginTop:dimension(30)}}
          onPress={()=>refRBSheet.current.close()}
        >
          <Text style={{color:'#800080',fontWeight:'bold'}}>OK</Text>
        </TouchableOpacity>
      </RBSheet> */}
    </View>
  )
}

export default Dashboard