import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Drusya from '../../assets/images/socialmedia.jpg'
import { dimension } from '../common/PixelScaling'
import { discoverpage } from '../json/post'
import Octicons from 'react-native-vector-icons/Octicons'

const Discover = (props) => {
    const [fallow, setFallow] = useState(true)
  return (
    <View style={styles.mainContainer}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',paddingBottom:dimension(10)}}>
            <TouchableOpacity onPress={()=> props.navigation.goBack()}>
                <Octicons 
                    size={dimension(25)}
                    color="white"
                    name="arrow-left"
                />
            </TouchableOpacity>
            <Text style={{marginLeft:dimension(80),fontFamily:'Azonix',color:'white',fontSize:dimension(18)}}>Discover People</Text>
        </View>
        {discoverpage.map((item,index)=>{
            return(
                <View style={{paddingVertical:dimension(10),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} key={index}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image 
                                source={item.image}
                                style={{width:dimension(50),height:dimension(50),borderRadius:dimension(50),borderWidth:1,borderColor:'white'}}
                            />
                            <View style={{marginLeft:dimension(10)}}>
                                <Text style={{color:'white',fontFamily:'gibson-bold', fontSize:dimension(18)}}>{item.name}</Text>
                                <Text style={{color:'grey',fontSize:dimension(12)}}>{item.friends}</Text>
                            </View>
                    </View>
                    <View style={{marginLeft:dimension(50)}}>
                        <TouchableOpacity style={styles.fallow} 
                            onPress={() => setFallow(fallow ? false : true)}
                        >
                            <Text style={{color:'white',fontFamily:'Fenord Italic',fontSize:dimension(12)}}>{'Fallow'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        )
    })}
    </View>
  )
}

export default Discover

const styles = StyleSheet.create({
    mainContainer : {
        flex:1,
        backgroundColor:'black',
        paddingHorizontal:dimension(20),
        paddingVertical:dimension(10)
    },
    fallow :{
        width:dimension(100),
        borderWidth:1,
        borderColor:'white',
        height:dimension(30),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:dimension(5)
    },
})