import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect, useState } from 'react'
import { Button, IconButton, TextInput } from 'react-native-paper'
import Dairy from '../assets/dairy.png'
import { useAuth } from '../context/AuthContext'

const LoginScreen = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { onLogin } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const login = async () => {
    setIsLoading(true)
    const res = await onLogin(username, password)

    if (res && res.error) {
      setIsLoading(false)
      alert(res.message)
    } else {
      setIsLoading(false)
      alert('User Logged In Successfully')
    }
  }

  return (
    <SafeAreaView style={styles.conatiner}>
      <StatusBar style='auto' />

      <Image source={Dairy} style={styles.image} />

      <Text style={styles.heading}>Login as a user</Text>

      <TextInput
        style={styles.input}
        label='Username'
        mode='flat'
        value={username}
        onChangeText={(e) => {
          setUsername(e)
        }}
        underlineColor='#3c66cf'
        activeUnderlineColor='#3c66cf'
        outlineColor='#3c66cf'
        activeOutlineColor='#3c66cf'
      />

      <View style={[styles.input, { justifyContent: 'space-between', flexDirection: 'row' }]}>
        <TextInput
          placeholderTextColor='black'
          style={{ flex: 1, backgroundColor: '#e9edf7' }}
          label='Password'
          secureTextEntry={!isPasswordVisible}
          type='outlined'
          underlineColor='#3c66cf'
          activeUnderlineColor='#3c66cf'
          outlineColor='#3c66cf'
          activeOutlineColor='#3c66cf'
          value={password}
          onChangeText={(e) => {
            setPassword(e)
          }}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <IconButton icon={isPasswordVisible ? 'eye-off' : 'eye'} color='#3c66cf' size={20} />
        </TouchableOpacity>
      </View>

      <Button
        mode='contained'
        style={styles.button}
        onPress={login}
        buttonColor='#6987d0'
        disabled={isLoading}
      >
        <Text> {isLoading ? 'Logging...' : 'Log in'}</Text>
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
