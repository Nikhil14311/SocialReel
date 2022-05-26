import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, {useRef} from 'react'
import { dimension, dimensionVertical } from '../common/PixelScaling'
import Drusya from '../../assets/images/socialmedia.jpg'
import { discoverPeople } from '../json/post'
import Octicons from 'react-native-vector-icons/Octicons'
//import BottomSheet from 'reanimated-bottom-sheet'
//import Animated from 'react-native-reanimated'
//import RBSheet from "react-native-raw-bottom-sheet";
import MenuIcon from 'react-native-vector-icons/Entypo'
const Profile = (props) => {
    // bs = React.createRef();
    // fall = new Animated.Value(1);

    // const renderInner = () => (
    //     <View style={{backgroundColor:'#121212',paddingHorizontal:dimension(20)}}>
    //         <Text style={{color:'white',alignSelf:'center',marginTop:dimension(20)}}>Are you sure you want to logout ?</Text>
    //         <TouchableOpacity style={{
    //             width:dimension(320),
    //             height:dimensionVertical(48),
    //             alignItems:'center',
    //             justifyContent:'center',
    //             borderWidth:1,
    //             borderColor:'white',
    //             marginTop:dimension(40),
    //             marginBottom : dimension(50),
    //             alignSelf:'center'
                
    //         }}
    //         onPress={()=> props.navigation.navigate('ChildLoginPage')}
    //         >
    //             <Text style={{color:'white'}}>OK</Text>
    //         </TouchableOpacity>
    //     </View>
    // )
    
    // const renderHeader = () => (
    //     <View style={{backgroundColor:'#121212',paddingTop:dimension(20),borderTopLeftRadius:dimension(20),borderTopRightRadius:dimension(20)}}>
    //         <View style={{alignItems:'center'}}>
    //             <View style={{width:dimension(40),height:dimensionVertical(8),borderRadius:dimension(4),backgroundColor:'white',marginBottom:dimension(10)}}></View>
    //         </View>
    //     </View>
    // )

    // const refRBSheet = useRef();

  return (
    <View style={styles.mainContainer}>
        {/* <BottomSheet
                ref={bs}
                snapPoints={[dimensionVertical(300),0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
                overdragResistanceFactor={1}
                enabledInnerScrolling={true}
                enabledHeaderGestureInteraction={true}
                enabledContentGestureInteraction={true}
                
            /> */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:dimension(50)}}>
           <View style={{flex:1,width:'100%',backgroundColor:'black',right:0,alignItems:'flex-end',right:10}}>
                <TouchableOpacity>
                    <MenuIcon name="menu" size={dimension(30)} color={'white'}/>   
                </TouchableOpacity>
           </View>
            <View style={styles.headerContainer}>
                <TouchableOpacity>
                    <Image 
                        source={Drusya}
                        style={styles.headerImgContainer}
                    />
                    <Octicons
                        name="plus-circle"
                        size={dimension(24)}
                        color='white'
                        style={{position:'absolute',bottom:dimension(5),right:dimension(3),backgroundColor:'black',borderRadius:dimension(50)}}
                    />
                </TouchableOpacity>
                <Text style={{marginTop:dimension(20),fontFamily:'monospace',color:'white',fontWeight:'bold',fontSize:dimension(18)}}>{"Nikhil Royal"}</Text>
                <View style={styles.fallowContainer}>
                    <View>
                        <TouchableOpacity style={{alignItems:'center'}}>
                            <Text style={styles.fallowTxt}>{"600"}</Text>
                            <Text style={styles.fallowTxt1}>{"Posts"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={{alignItems:'center'}}>
                            <Text style={styles.fallowTxt}>{"20k"}</Text>
                            <Text style={styles.fallowTxt1}>{"Fallowers"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                    <TouchableOpacity style={{alignItems:'center'}}>
                            <Text style={styles.fallowTxt}>{"120"}</Text>
                            <Text style={styles.fallowTxt1}>{"Fallowing"}</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.editProfileContainer}>
                    <TouchableOpacity style={styles.editProfile} 
                        //onPress={() => refRBSheet.current.open()}
                    >
                        <Text style={{color:'white'}}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <View style={styles.discoverPeopleTopContainer}>
                    <Text style={styles.discoverPeopleTxt}>Discover People</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('discover')}>
                        <Text style={{color:'cyan',fontSize:dimension(15),fontFamily:'serif',fontWeight:'bold'}}>See All</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView 
                    showsHorizontalScrollIndicator={false} 
                    horizontal
                    style={{ borderBottomColor : 'grey',
                    borderBottomWidth : 0.5}}
                >
                    {discoverPeople.map((key,index)=> {
                        return(
                            <View style={styles.discoverPeopleContainer} key={index}>
                                <TouchableOpacity style={styles.discoverPeople}>
                                    <Image 
                                        source={key.image}
                                        style={styles.discoverImgContainer}
                                    />
                                    <Text style={styles.fallowTxt1}>{key.name}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.fallowBtn}>
                                    <Text style={{fontSize:dimension(12),color:'white'}}>Fallow</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.footerContainers}>
                    <Text style={styles.footerTxt}>{"Settings"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerContainers}>
                    <Text style={styles.footerTxt}>{"Theme"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerContainers}>
                    <Text style={styles.footerTxt}>{"Help"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerContainers}>
                    <Text style={styles.footerTxt}>{"Privacy & Security"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerContainers} 
                    //onPress={() => bs.current.snapTo(0)}
                >
                    <Text style={styles.LogoutTxt}>{"Logout"}</Text>
                </TouchableOpacity>
            </View>
      </ScrollView>
        {/* <RBSheet  
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
            wrapper: {
                backgroundColor: "transparent",
            },
            draggableIcon: {
                backgroundColor: "#000",
            },
            container:{
                borderTopLeftRadius:dimension(10),
                borderTopRightRadius : dimension(10)
            }
            }}
        >
            <Text style={{color:'black'}}>Nikhil</Text>
        </RBSheet> */}
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1,
        backgroundColor : 'black',
    },
    headerContainer : {
        alignItems : 'center',
        borderBottomColor : 'gray',
        borderBottomWidth : 0.5,
        paddingHorizontal : dimension(20),
        paddingVertical : dimensionVertical(20)
    },
    headerImgContainer : {
        width:dimension(100),
        height:dimension(100),
        borderRadius:dimension(50),
        borderWidth:1,
        borderColor:'white',
        opacity : 1
    },
    fallowContainer : {
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%',
        alignItems:'center',
        marginTop : dimension(20)
    },
    fallowTxt:{
        fontSize : dimension(18),
        fontFamily : 'monospace',
        color:'white',
        fontWeight : 'bold'
    },
    fallowTxt1 : {
        fontSize : dimension(15),
        color : 'white',
        marginTop : dimension(5)
        //fontFamily : 'monospace'
    },
    discoverPeopleContainer : {
        marginHorizontal : dimension(20),
        marginVertical : dimensionVertical(20),
        paddingHorizontal : dimension(20),
        paddingVertical : dimensionVertical(20),
        borderWidth : 1,
        borderColor : 'gray',
        alignItems:'center',
    },
    discoverPeopleTxt : {
        color : 'white',
        fontSize : dimension(18),
        fontWeight:'bold'
    },
    discoverPeopleTopContainer : {
        paddingHorizontal:dimension(20),
        marginTop:dimension(10),
        justifyContent : 'space-between',
        flexDirection:'row'
    },
    discoverPeople : {
        alignItems:'center',
    },
    discoverImgContainer : {
        width:dimension(70),
        height:dimension(70),
        borderRadius:dimension(50),
        borderWidth:1,
        borderColor:'grey',
        opacity : 1
    },
    fallowBtn : {
        marginTop : dimension(10),
        borderWidth : 1,
        borderColor : 'red',
        width : dimension(100),
        backgroundColor : 'red',
        height : dimensionVertical(30),
        alignItems:'center',
        justifyContent : 'center',
        borderRadius : dimension(5)
    },
    footerContainer : {
        paddingHorizontal : dimension(20),
        paddingVertical : dimensionVertical(20)
    },
    footerContainers : {
        marginBottom : dimension(20)
    },
    footerTxt : {
        fontSize:dimension(18),
        color:'white'
    },
    LogoutTxt : {
        fontSize:dimension(20),
        color:'red',
        fontWeight:'bold',
        fontFamily :  'normal'
    },
    editProfileContainer : {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop : dimension(20)
    },
    editProfile :{
        width:dimension(280),
        borderWidth:1,
        borderColor:'white',
        height:dimension(39),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:dimension(5)
    }
})

export default Profile