// import { View, Text, StatusBar } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import AnimatedLottieView from 'lottie-react-native';
// import MainRoute from './src/screens/MainRoute';

// const App = () => {
//   const [loader, setloader] = useState(true)
//   useEffect(()=>{
//     setTimeout(()=>{
//       setloader(false)
//     },9000)
//   },[])
  
//   return (
//     <View style={{flex:1,backgroundColor:'black'}}>
//       {loader ? 
//         <AnimatedLottieView source={require('./assets/lottiefiles/stayhome.json')} autoPlay loop />
//         :
//         <MainRoute />
//       }
//     </View>
//   )
// }

// export default App


import { View, Text } from 'react-native'
import React from 'react'
import Route from './src/screens/Route'
import { AuthProvider } from './src/screens/Auth'
import MainRoute from './src/screens/MainRoute'

const App = () => {
  return (
    <AuthProvider style={{flex:1}}>
      <MainRoute />
    </AuthProvider>
  )
}

export default App