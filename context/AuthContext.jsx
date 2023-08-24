import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { URL } from '@env'

const TOKEN_KEY = 'dairy-token'
const USER_NAME = 'dairy-user-name'
const AuthContext = createContext({})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
    username: null,
  })

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY)
      const userName = await SecureStore.getItemAsync(USER_NAME)
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        setAuthState({
          token: token,
          authenticated: true,
          username: userName,
        })
      }
    }

    loadToken()
  }, [])

  const login = async (username, password) => {
    try {
      if (username && username.length > 0 && password && password.length > 0) {
        const res = await axios.post(`${URL}user/login`, {
          username,
          password,
        })
        setAuthState({
          token: res.data.token,
          authenticated: true,
          username: res.data.username,
        })

        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`

        await SecureStore.setItemAsync(TOKEN_KEY, res.data.token)
        await SecureStore.setItemAsync(USER_NAME, res.data.username)
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
      username: null,
    })
  }

  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
