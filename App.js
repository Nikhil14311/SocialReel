import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import AnimatedLottieView from 'lottie-react-native';

const App = () => {
  const [loader, setloader] = useState(true)
  useEffect(()=>{
    setTimeout(()=>{
      setloader(false)
    },9000)
  },[])
  
  return (
    <View style={{flex:1,backgroundColor:'black'}}>
      {loader ? 
        <AnimatedLottieView source={require('./assets/lottiefiles/stayhome.json')} autoPlay loop />
        :
        <NavigationContainer> 
          <StatusBar backgroundColor={'black'} />
          <StackNavigator />
        </NavigationContainer>
      }
    </View>
  )
}

export default App