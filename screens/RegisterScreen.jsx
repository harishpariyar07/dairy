import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TextInput, Button } from 'react-native-paper'
import { useAuth } from '../context/AuthContext'

const RegisterScreen = () => {
  // all the states
  const [phoneNo, setPhoneNo] = useState(0)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { onRegister, onLogin } = useAuth()

  const navigator = useNavigation()

  useLayoutEffect(() => {
    navigator.setOptions({
      headerShown: false,
    })
  }, [])

  const register = async () => {
    const res = await onRegister(phoneNo, name, password, confirmPassword)
    if (res && res.error) {
      alert(res.message)
    } else {
      alert('User Registered Successfully')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register New User</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          label='Phone Number'
          type='outlined'
          underlineColor='#3c66cf'
          activeUnderlineColor='#3c66cf'
          outlineColor='#3c66cf'
          activeOutlineColor='#3c66cf'
          onChangeText={(e) => {
            setPhoneNo(e)
          }}
        />

        <TextInput
          style={styles.input}
          label='Name'
          type='outlined'
          underlineColor='#3c66cf'
          activeUnderlineColor='#3c66cf'
          outlineColor='#3c66cf'
          activeOutlineColor='#3c66cf'
          onChangeText={(e) => {
            setName(e)
          }}
        />

        <TextInput
          style={styles.input}
          label='Password'
          secureTextEntry
          type='outlined'
          underlineColor='#3c66cf'
          activeUnderlineColor='#3c66cf'
          outlineColor='#3c66cf'
          activeOutlineColor='#3c66cf'
          onChangeText={(e) => {
            setPassword(e)
          }}
        />

        <TextInput
          style={styles.input}
          label='Confirm Password'
          secureTextEntry
          type='outlined'
          underlineColor='#3c66cf'
          activeUnderlineColor='#3c66cf'
          outlineColor='#3c66cf'
          activeOutlineColor='#3c66cf'
          onChangeText={(e) => {
            setConfirmPassword(e)
          }}
        />
      </View>

      <Button mode='contained' style={styles.button} onPress={register} buttonColor='#6987d0'>
        Sign Up
      </Button>

      <TouchableOpacity
        onPress={() => {
          navigator.navigate('HomeScreen')
        }}
      >
        <Text style={styles.back}>Go Back to Home</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#e9edf7',
  },
  form: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  heading: {
    fontSize: 30,
    fontFamily: 'LeagueSB',
    alignItems: 'center',
    paddingBottom: 20,
  },
  button: {
    width: '80%',
    borderRadius: 15,
    marginTop: 30,
  },
  back: {
    marginTop: 20,
    color: '#3c66cf',
    fontSize: 13,
    fontFamily: 'Inter',
  },
})

export default RegisterScreen
