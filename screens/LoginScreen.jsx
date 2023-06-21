import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'

const LoginScreen = () => {

  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  return (
    <SafeAreaView style={styles.conatiner}>
      <StatusBar style='auto' />
      <Text> Login Screen </Text>


      <TouchableOpacity 
      style={styles.button}
      onPress={()=>{
        navigation.navigate('HomeScreen')
      }}
      >
        <Text>Login</Text>
      </TouchableOpacity>


      <TouchableOpacity 
        style={styles.button}
        onPress={()=>{
          navigation.navigate('SignUpScreen')
        }}
        >
        <Text>Sign Up</Text>
      </TouchableOpacity>


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
  }
})

export default LoginScreen