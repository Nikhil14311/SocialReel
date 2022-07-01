import { View, Text, Button, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView,FlatList } from 'react-native'
import React, {useRef, useEffect, useContext, useState} from 'react'
import RBSheet from "react-native-raw-bottom-sheet";
import { dimension } from '../common/PixelScaling';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './Auth';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SocialMedia from '../../assets/images/socialmedia.jpg'
//import { ScrollView } from 'react-native-gesture-handler';
const Dashboard = (props) => {
  //const refRBSheet = useRef();
  const [usersData, setUsersData] = useState(null)
  const [posts, setPosts] = useState([])
  const { user } = useContext(AuthContext)
  console.log('current user uid',user.uid)
  
  function onResult(QuerySnapshot) {
    console.log('Got Users collection result.',QuerySnapshot);
  }
  
  function onError(error) {
    console.error(error);
  } 

  const POSTSDATA = [
    // {
    //   id:1,
    //   username:"Nikhil Karanam",
    //   userImage:require('../../assets/images/socialmedia.jpg'),
    //   postImage:require('../../assets/images/socialmedia.jpg'),
    //   postComment:"Hey I am successfull to design a app",
    //   postTime:"1PM",
    //   likes:0,
    //   comments:0,
    // },
    // {
    //   id:2,
    //   username:"Nikhil Royal",
    //   userImage:SocialMedia,
    //   postImage:SocialMedia,
    //   postComment:"Hey I am successfull to design a app",
    //   postTime:"1PM",
    //   likes:0,
    //   comments:0,
    // }
  ]

  

  useEffect(  ()=> {
    const fetchPosts = async() => {
      try{
        const list = []
        await firestore()
        .collection('posts')
        .get()
        .then((QuerySnapshot)=>{
          console.log('Total Posts : ',QuerySnapshot.size);
          QuerySnapshot.forEach(doc => {
            const {userId, post, imageUri, postTime, likes, comments, username, userImage} = doc.data();
            list.push({
              id:doc.id,
              userId,
              postImage:imageUri,
              postComment:post,
              postTime:postTime,
              username:username,
              userImage:userImage,
              likes:likes,
              comments:comments
            })
          })
        })
        console.log('list>>>>',list)
        setPosts(list);
      }catch(e){
        console.log(e);
      }
    }

    const getUserProfile = () => {
      try{
        const subscriber = firestore()
        .collection('Users')
        .doc(user.uid)
        .onSnapshot(documentSnapshot => {
            console.log('User data: ', documentSnapshot.data());
            setUsersData(documentSnapshot.data());
        });

        // Stop listening for updates when no longer required
        return () => subscriber();

      }catch(e){
        console.log('error',e);

      }
    }
    fetchPosts();
    getUserProfile();
  },[])

  console.log('posts data',posts);

  const renderItem =({item})=>{
    console.log("item>>>>",item)
    return(
      <Item 
        id={item.id}
        username={item.username}
        userImage={{uri:item.userImage}}
        postImage={{uri:item.postImage}}
        postTime={item.postTime}
        postComment={item.postComment}
        likes={item.likes}
        comments={item.comments}
      />
    )
  }

  return (

    <View style={{flex:1,backgroundColor:'black'}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',paddingVertical:dimension(20),alignItems:'center',paddingHorizontal:dimension(20),borderBottomColor:'grey',borderWidth:1}}>
        <View>
            <Text style={{fontFamily:'Raleway-Heavy',fontSize:dimension(18),color:'#f08080'}}>{"Social Media"}</Text>
          </View>
          <View>
            {usersData != null ?
              <Image 
                source={{uri:usersData.imageUri}}  
                style = {{width:dimension(30),height:dimension(30),borderRadius:dimension(50)}} 
              /> : 
              <EvilIcons name="user" size={30} color="white" />
            }
          </View> 
      </View>

      <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:dimension(20),paddingHorizontal:dimension(20),alignItems:'center'}}>
        <Text style={{fontSize:dimension(16),fontFamily:'GothamBold',color:'#7fffd4'}}>{"Create new post"}</Text>
        <TouchableOpacity 
          style={{ width:dimension(100),height:dimension(30),backgroundColor:'#7fffd4',borderRadius:dimension(5),alignItems:'center',justifyContent:'center'}}
          onPress={() => props.navigation.push('addPost')}  
        >
          <Text style={{fontSize:dimension(14),color:'black',fontWeight:'bold',fontFamily:'Azonix'}}>{"Add Post"}</Text>
        </TouchableOpacity>
      </View>

      {posts.length >=1 ? 
      <FlatList 
        data={posts}
        renderItem={renderItem}
        keyExtractor={item=>item.id}
        contentContainerStyle={{
          paddingBottom:dimension(70)
        }}
      /> : 
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}> 
          <Text style={{color:'red',fontWeight:'bold',fontSize:dimension(16)}}>No Posts found</Text>
        </View>
      }
     


     </View>
  )
}


const Item = (props) => {
  console.log("items in rendercall", props)
  return(
  <View>
  <View style={styles.postHeaderContainer}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        {/* <EvilIcons name="user" size={dimension(50)} color="white" /> */}
        <Image 
          source={props.userImage}
          style={{width:dimension(30),height:dimension(30),borderRadius:dimension(50)}}
        />
        <View style={{justifyContent:'center',marginLeft:dimension(10)}}>
          <Text style={{fontSize:dimension(16),fontFamily:'gibson-bold',color:'whitesmoke',marginLeft:dimension(5)}}>{props.username}</Text>
          {/* <Text style={{fontSize:dimension(12),color:'gray',fontWeight:'bold',marginLeft:dimension(5)}}>{props.postTime}</Text> */}
        </View>
      </View>
      <View>
        <Entypo name={"dots-three-vertical"} size={dimension(24)} color={'white'} />
      </View>
  </View>
  <View style={{paddingHorizontal:dimension(20),paddingVertical:dimension(10)}}>
    <Text style={{color:'white'}}>{props.postComment}</Text>
  </View>
  <View>
    {props.postImage.uri != null ? <Image 
      source={props.postImage}  
      style = {{width:'100%',height:dimension(400)}} 
    /> : null }
  </View>
  <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:dimension(20), marginTop:dimension(20)}}>
    <View  style={{flexDirection:'row',width:"30%", justifyContent:'space-between'}}>
      <TouchableOpacity>
        <AntDesign name="hearto" size={dimension(24)} color={'white'} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Octicons name="comment" size={dimension(24)} color={'white'} />  
      </TouchableOpacity>
      <TouchableOpacity>
          <MaterialCommunityIcons name='share-outline' size={dimension(24)} color={'white'} />
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity>
        <MaterialIcons name={'save-alt'} size={dimension(24)} color={'white'} />
      </TouchableOpacity>
    </View>
  </View>
  </View> )
}
export default Dashboard

const styles = StyleSheet.create({
  headerContainer : {
      paddingVertical : dimension(20),
      paddingHorizontal : dimension(20),
      flexDirection : 'row'
  },
  inputFiledTxt : {
    borderColor : 'white',
    borderRadius : dimension(5),
    borderWidth : 1,
    width:dimension(200)
  },
  postHeaderContainer : {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    //borderBottomColor:'grey',
    //borderWidth:1,
    paddingVertical:dimension(10),
    paddingHorizontal :dimension(10),
    marginTop : dimension(10)
  }

})