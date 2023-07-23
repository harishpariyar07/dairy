import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import Dairy from '../assets/dairy.png'
import { useAuth } from '../context/AuthContext'

const LoginScreen = () => {
  const [phoneNo, setPhoneNo] = useState(0)
  const [password, setPassword] = useState('')
  const { onLogin, authState } = useAuth()

  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const login = async () => {
    const res = await onLogin(phoneNo, password)
    if (res && res.error) {
      alert(res.message)
    } else {
      alert('User Logged In Successfully')
    }
  }

  return (
    <SafeAreaView style={styles.conatiner}>
      <StatusBar style='auto' />

      <Image source={Dairy} style={styles.image} />

      <Text style={styles.heading}>Login</Text>

      <TextInput
        style={styles.input}
        label='Phone Number'
        mode='flat'
        onChangeText={(e) => {
          setPhoneNo(e)
        }}
        underlineColor='#3c66cf'
        activeUnderlineColor='#3c66cf'
        outlineColor='#3c66cf'
        activeOutlineColor='#3c66cf'
      />

      <TextInput
        style={styles.input}
        label='Password'
        onChangeText={(e) => {
          setPassword(e)
        }}
        secureTextEntry
        underlineColor='#3c66cf'
        activeUnderlineColor='#3c66cf'
        outlineColor='#3c66cf'
        activeOutlineColor='#3c66cf'
      />

      <Button mode='contained' style={styles.button} onPress={login} buttonColor='#6987d0'>
        <Text>Login</Text>
      </Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    width: '76%',
    borderRadius: 15,
  },
  input: {
    width: '78%',
    height: 50,
    backgroundColor: '#e9edf7',
  },
  heading: {
    fontSize: 30,
    alignSelf: 'flex-start',
    paddingLeft: 40,
    fontFamily: 'LeagueSB',
    color: '#525151',
  },
  image: {
    width: '100%',
    height: '30%',
  },
  signup: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupBtn: {
    color: '#1644b5',
  },
})

export default LoginScreen
