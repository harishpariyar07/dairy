import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button, useTheme } from 'react-native-paper'
import DropDown from 'react-native-paper-dropdown'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'

const farmerLevelOptions = [
  { value: 1, label: 'Level 1' },
  { value: 2, label: 'Level 2' },
  { value: 3, label: 'Level 3' },
  { value: 4, label: 'Level 4' },
]

const paymentModeOptions = [
  { value: 'CASH', label: 'Cash' },
  { value: 'CHEQUE', label: 'Cheque' },
  { value: 'BANK', label: 'Bank' },
]

const AddFarmerDetails = () => {
  const [farmerId, setFarmerId] = useState('')
  const [rfid, setRfId] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [farmerName, setFarmerName] = useState('')
  const [farmerLevel, setFarmerLevel] = useState(0)
  const [paymentMode, setPaymentMode] = useState('')
  const [bankName, setBankName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [bankHolderName, setBankHolderName] = useState('')
  const [showDropDown1, setShowDropDown1] = useState(false)
  const [showDropDown2, setShowDropDown2] = useState(false)

  const addFarmer = () => {
    try {
      const res = axios.post('http://172.16.54.237:5001/api/farmer', {
        farmerId,
        rfid,
        mobileNumber,
        farmerName,
        farmerLevel,
        paymentMode,
        bankName,
        accountNumber,
        bankHolderName,
      })

      alert('Farmer Details Saved Successfully')
      navigator.navigate('AddFarmer')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TextInput
          label='Farmer ID'
          value={farmerId}
          onChangeText={(id) => setFarmerId(id)}
          selectionColor='black'
          style={styles.textInput}
        />
        <TextInput
          label='RFID'
          value={rfid}
          onChangeText={(id) => setRfId(id)}
          selectionColor='black'
          style={styles.textInput}
        />
        <TextInput
          label='Mobile Number'
          value={mobileNumber}
          onChangeText={(num) => setMobileNumber(num)}
          selectionColor='black'
          style={styles.textInput}
        />
        <TextInput
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
          label='Bank Name'
          value={bankName}
          onChangeText={(name) => setBankName(name)}
          selectionColor='black'
          style={styles.textInput}
        />
        <TextInput
          label='Bank Account Number'
          value={accountNumber}
          onChangeText={(acc) => setAccountNumber(acc)}
          selectionColor='black'
          style={styles.textInput}
        />
        <TextInput
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
      >
        Save
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
