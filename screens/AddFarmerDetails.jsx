import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput, Button, useTheme } from 'react-native-paper'
import DropDown from 'react-native-paper-dropdown'
import { SafeAreaView } from 'react-native'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { URL } from '@env'

const farmerLevelOptions = [
  { value: 1, label: 'Level 1' },
  { value: 2, label: 'Level 2' },
  { value: 3, label: 'Level 3' },
  { value: 4, label: 'Level 4' },
  { value: 5, label: 'Level 5 (Fixed Rate)' },
]

const paymentModeOptions = [
  { value: 'CASH', label: 'Cash' },
  { value: 'CHEQUE', label: 'Cheque' },
  { value: 'BANK', label: 'Bank' },
]

const AddFarmerDetails = ({ route }) => {
  const [farmerId, setFarmerId] = useState(-1)
  const [mobileNumber, setMobileNumber] = useState('')
  const [farmerName, setFarmerName] = useState('')
  const [farmerLevel, setFarmerLevel] = useState(null)
  const [fixedRate, setFixedRate] = useState(null)
  const [paymentMode, setPaymentMode] = useState('')
  const [bankName, setBankName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [bankHolderName, setBankHolderName] = useState('')
  const [showDropDown1, setShowDropDown1] = useState(false)
  const [showDropDown2, setShowDropDown2] = useState(false)
  const navigator = useNavigation()
  const { username } = route.params
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchLatestFarmerId = async () => {
      try {
        if (username) {
          const res = await axios.get(`${URL}user/${username}/farmer/latestid`)
          setFarmerId(res.data + 1)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchLatestFarmerId()
  }, [])

  const addFarmer = async () => {
    try {
      if (username) {
        setIsLoading(true)
        const res = await axios.post(`${URL}user/${username}/farmer`, {
          farmerId,
          mobileNumber,
          farmerName,
          farmerLevel,
          paymentMode,
          bankName,
          accountNumber,
          bankHolderName,
          fixedRate,
        })

        setAccountNumber('')
        setBankHolderName('')
        setBankName('')
        setFarmerId(farmerId + 1)
        setFarmerLevel(null)
        setFarmerName('')
        setFixedRate(0)
        setMobileNumber('')
        setPaymentMode('')
        setPaymentMode('')
        setIsLoading(false)
        alert('Farmer Details Saved Successfully')
      }
    } catch (error) {
      setIsLoading(false)
      alert('Error in saving farmer details')
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {farmerId >= 1 && (
          <TextInput
            placeholderTextColor='black'
            label='Farmer ID'
            defaultValue={String(farmerId)}
            editable={false}
            selectionColor='black'
            style={styles.textInput}
          />
        )}
        <TextInput
          placeholderTextColor='black'
          label='Mobile Number'
          value={mobileNumber}
          onChangeText={(num) => setMobileNumber(num)}
          selectionColor='black'
          style={styles.textInput}
          keyboardType='numeric'
        />
        <TextInput
          placeholderTextColor='black'
          label='Farmer Name'
          value={farmerName}
          onChangeText={(name) => setFarmerName(name)}
          selectionColor='black'
          style={styles.textInput}
        />

        <DropDown
          label={'Farmer Level'}
          mode={'flat'}
          visible={showDropDown1}
          showDropDown={() => setShowDropDown1(true)}
          onDismiss={() => setShowDropDown1(false)}
          value={farmerLevel}
          setValue={setFarmerLevel}
          list={farmerLevelOptions}
          dropDownStyle={styles.dropStyle}
          dropDownItemStyle={styles.dropDownStyle}
          dropDownItemSelectedStyle={styles.dropDownStyle}
          inputProps={{
            style: {
              backgroundColor: 'white',
              padding: 4,
            },
          }}
        />

        {farmerLevel === 5 && (
          <TextInput
            placeholderTextColor='black'
            label='Fixed Rate'
            value={fixedRate > 0 ? fixedRate.toString() : ''}
            onChangeText={(rate) => setFixedRate(rate)}
            selectionColor='black'
            style={styles.textInput}
            keyboardType='numeric'
          />
        )}

        <DropDown
          label={'Payment Mode'}
          mode={'flat'}
          visible={showDropDown2}
          showDropDown={() => setShowDropDown2(true)}
          onDismiss={() => setShowDropDown2(false)}
          value={paymentMode}
          setValue={setPaymentMode}
          list={paymentModeOptions}
          dropDownStyle={styles.dropStyle}
          dropDownItemStyle={styles.dropDownStyle}
          dropDownItemSelectedStyle={styles.dropDownStyle}
          inputProps={{
            style: {
              backgroundColor: 'white',
              padding: 4,
              color: 'red',
            },
          }}
        />

        <TextInput
          placeholderTextColor='black'
          label='Bank Name'
          value={bankName}
          onChangeText={(name) => setBankName(name)}
          selectionColor='black'
          style={styles.textInput}
        />
        <TextInput
          placeholderTextColor='black'
          label='Bank Account Number'
          value={accountNumber}
          onChangeText={(acc) => setAccountNumber(acc)}
          selectionColor='black'
          style={styles.textInput}
        />
        <TextInput
          placeholderTextColor='black'
          label='Bank Holder Name'
          value={bankHolderName}
          onChangeText={(name) => setBankHolderName(name)}
          selectionColor='black'
          style={styles.textInput}
        />
      </ScrollView>

      <Button
        icon='content-save'
        mode='contained'
        onPress={() => addFarmer()}
        style={styles.button}
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save'}
      </Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 2,
  },
  textInput: {
    backgroundColor: 'white',
    padding: 5,
  },
  button: {
    padding: 4,
  },
  dropDownStyle: {
    backgroundColor: 'white',
    color: 'blue',
  },
})

export default AddFarmerDetails
