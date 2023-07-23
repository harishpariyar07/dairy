import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

const TOKEN_KEY = 'dairy-token'
export const API_URL = 'http://172.16.54.237:5001/api/'
const AuthContext = createContext({})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
  })

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY)
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        setAuthState({
          token: token,
          authenticated: true,
        })
      }
    }

    loadToken()
  }, [])

  const register = async (phoneNo, name, password, confirmPassword) => {
    try {
      if (phoneNo && name && password && confirmPassword) {
        if (password === confirmPassword) {
          const res = await axios.post(`${API_URL}user/signup`, {
            phoneNo,
            name,
            password,
          })

          return res
        } else {
          return { error: true, message: 'Passwords do not match' }
        }
      } else {
        return { error: true, message: 'Fill all the fields' }
      }
    } catch (error) {
      return { error: true, message: error.message }
    }
  }

  const login = async (phoneNo, password) => {
    try {
      if (phoneNo.length > 0 && password.length > 0) {
        const res = await axios.post(`${API_URL}user/login`, {
          phoneNo,
          password,
        })

        setAuthState({
          token: res.token,
          authenticated: true,
        })

        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`

        await SecureStore.setItemAsync(TOKEN_KEY, res.data.token)
        return res
      } else {
        return { error: true, message: 'Fill all the fields' }
      }
    } catch (error) {
      return { error: true, message: error.message }
    }
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY)

    axios.defaults.headers.common['Authorization'] = ''

    setAuthState({
      token: null,
      authenticated: false,
    })
  }

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
