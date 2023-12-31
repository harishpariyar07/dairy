import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Searchbar, Button, TextInput } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'
import moment from 'moment/moment'
import axios from 'axios'
import { URL } from '@env'
import HideWithKeyboard from 'react-native-hide-with-keyboard'
import { useAuth } from '../context/AuthContext'

const Payments = () => {
  const navigator = useNavigation()
  const [isPickerShow, setIsPickerShow] = useState(false)
  const [date, setDate] = useState(new Date(Date.now()))
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [amountToPay, setAmountToPay] = useState(null)
  const [remarks, setRemarks] = useState('')
  const {
    authState: { username },
  } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const showPicker = () => {
    setIsPickerShow(true)
  }

  const onChange = (event, value) => {
    setDate(value)
    if (Platform.OS === 'android') {
      setIsPickerShow(false)
    }
  }

  const fetchAllFarmers = async () => {
    try {
      if (username) {
        const farmers = await axios.get(`${URL}user/${username}/farmer`)
        const farmersArray = farmers.data.map((farmer) => ({
          farmerName: farmer.farmerName,
          farmerId: farmer.farmerId,
          balance: farmer.credit - farmer.debit,
        }))
        setData(farmersArray)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllFarmers()
  }, [])

  const addPayment = async (farmerId) => {
    try {
      if (username && amountToPay !== 0) {
        setIsLoading(true)
        await axios.post(`${URL}user/${username}/payment`, {
          farmerId,
          date,
          amountToPay,
          remarks,
        })

        setAmountToPay(0)
        setRemarks('')
        setIsLoading(false)
        alert('Payment added successfully')
      }
    } catch (error) {
      setIsLoading(false)
      alert('Only Admin can access this page')
      navigator.goBack()
      console.log(error)
    }
  }

  const filteredData = data.filter((item) => String(item.farmerId) === search)

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        style={styles.search}
        placeholder='Search by Farmer ID'
        onChangeText={(text) => {
          setSearch(text)
          setAmountToPay(0)
          setRemarks('')
        }}
        value={search}
        keyboardType='numeric'
      />

      {filteredData.length > 0 && search.length === String(filteredData[0].farmerId).length ? (
        filteredData.map((item, index) => (
          <View style={styles.farmerDetails} key={index}>
            <View style={{ flexDirection: 'row', padding: 5 }}>
              <Text style={{ color: 'red', fontFamily: 'InterB' }}>FARMER NAME: </Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.farmerName}</Text>
            </View>

            <View style={{ flexDirection: 'row', padding: 5 }}>
              <Text style={{ color: 'red', fontFamily: 'InterB' }}>FARMER ID: </Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.farmerId}</Text>
            </View>

            <View style={{ flexDirection: 'row', padding: 5 }}>
              <Text style={{ color: 'red', fontFamily: 'InterB' }}>BALANCE: </Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}> ₹ {item.balance}</Text>
            </View>

            <View>
              <HideWithKeyboard>
                {!isPickerShow && (
                  <View style={styles.dateContainer}>
                    <TouchableOpacity style={styles.button} onPress={showPicker}>
                      <Text style={{ fontFamily: 'Inter' }}>
                        {moment(date).format('DD-MM-YYYY')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* The date picker */}
                {isPickerShow && (
                  <DateTimePicker
                    value={date}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onChange}
                    style={styles.datePicker}
                  />
                )}
              </HideWithKeyboard>

              <TextInput
                placeholderTextColor='black'
                style={styles.textInput}
                label='Amount to Pay'
                mode='outlined'
                outlineColor='#e6e6e6'
                underlineColor='#e6e6e6'
                activeUnderlineColor='#e6e6e6'
                activeOutlineColor='#737373'
                value={amountToPay > 0 ? amountToPay.toString() : ''}
                onChangeText={(text) => setAmountToPay(text)}
                keyboardType='numeric'
              />

              <TextInput
                placeholderTextColor='black'
                style={[styles.textInput]}
                label='Remarks'
                mode='outlined'
                outlineColor='#e6e6e6'
                underlineColor='#e6e6e6'
                activeUnderlineColor='#e6e6e6'
                activeOutlineColor='#737373'
                dense={true}
                multiline={true}
                value={remarks}
                onChangeText={(text) => setRemarks(text)}
              />
            </View>

            <View style={styles.btnCnt}>
              <Button
                style={styles.button}
                mode='contained'
                buttonColor='#77b300'
                disabled={isLoading}
                onPress={() => addPayment(item.farmerId)}
              >
                {isLoading ? 'Paying...' : 'Pay'}
              </Button>
            </View>
          </View>
        ))
      ) : (
        <Text
          style={{
            padding: 50,
            fontFamily: 'Inter',
            width: '85%',
            textAlign: 'center',
          }}
        >
          No matching farmer found
        </Text>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: 10,
    gap: 20,
  },
  search: {
    width: '90%',
    backgroundColor: '#fff',
    borderColor: '#edebeb',
    borderWidth: 2,
  },
  farmerDetails: {
    width: '90%',
    backgroundColor: '#fff',
    borderColor: '#edebeb',
    borderWidth: 2,
    padding: 10,
  },
  calender: {
    flex: 0.3,
    alignItems: 'center',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40,
  },
  btnCnt: {
    marginVertical: 10,
    gap: 10,
  },
  textInput: {
    marginVertical: 10,
    fontSize: 13,
    fontFamily: 'Inter',
  },
  rateText: {
    color: 'green',
  },
  longTextInput: {
    height: 50,
    alignItems: 'flex-start',
  },
  dateContainer: {
    backgroundColor: '#fffbff',
    borderColor: '#f0eff0',
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 10,
    height: 50,
    justifyContent: 'center',
    marginTop: 10,
  },
})

export default Payments
