import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button, useTheme } from 'react-native-paper'
import DropDown from 'react-native-paper-dropdown'
import { SafeAreaView } from 'react-native-safe-area-context'

const levelOptions = [
  { value: 'level1', label: 'Level 1' },
  { value: 'level2', label: 'Level 2' },
  { value: 'level3', label: 'Level 3' },
  { value: 'level4', label: 'Level 4' },
]

const paymentOptions = [
  { value: 'cash', label: 'Cash' },
  { value: 'cheque', label: 'Cheque' },
  { value: 'bank', label: 'Bank' },
]

const AddFarmerDetails = () => {
  const [farmerId, setFarmerId] = useState('')
  const [rfId, setRfId] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [farmerName, setFarmerName] = useState('')
  const [levelOption, setLevelOption] = useState('')
  const [paymentOption, setPaymentOption] = useState('')
  const [bankName, setBankName] = useState('')
  const [bankAccountNumber, setBankAccountNumber] = useState('')
  const [bankHolderName, setBankHolderName] = useState('')
  const [bankIFSC, setBankIFSC] = useState('')
  const [showDropDown1, setShowDropDown1] = useState(false)
  const [showDropDown2, setShowDropDown2] = useState(false)

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
          value={rfId}
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
          value={levelOption}
          setValue={setLevelOption}
          list={levelOptions}
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
          value={paymentOption}
          setValue={setPaymentOption}
          list={paymentOptions}
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
          value={bankAccountNumber}
          onChangeText={(text) => setBankAccountNumber(text)}
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
        <TextInput
          label='Bank IFSC'
          value={bankIFSC}
          onChangeText={(ifsc) => setBankIFSC(ifsc)}
          selectionColor='black'
          style={styles.textInput}
        />
      </ScrollView>

      <Button
        icon='content-save'
        mode='contained'
        onPress={() => console.log('New Farmer Details saved')}
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
