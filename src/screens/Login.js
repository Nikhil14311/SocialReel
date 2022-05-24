import { View, Text, Button } from 'react-native'
import React from 'react'

const Login = (props) => {
  return (
    <View style={{flex:1,backgroundColor:'black',alignItems:'center',justifyContent:'center'}}>
      <Text>Login Screen</Text>
      <Button
        title = "Submit"
        onPress={()=>props.navigation.navigate('Home')}
      />
    </View>
  )
}

export default Login