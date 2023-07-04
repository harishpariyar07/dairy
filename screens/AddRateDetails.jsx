import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button } from 'react-native-paper'
import DropDown from 'react-native-paper-dropdown'
import { RadioButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const typeOptions = [
  { value: 'kgfat+kgsnf', label: 'KGFAT + KGSNF' },
  { value: 'kgfat', label: 'KG FAT ONLY' },
  { value: 'fat', label: 'FAT ONLY' },
  { value: 'fat+snf', label: 'FAT+SNF' },
]

const levelOptions = [
  { value: 'level1', label: 'Level 1' },
  { value: 'level2', label: 'Level 2' },
  { value: 'level3', label: 'Level 3' },
  { value: 'level4', label: 'Level 4' },
]

const ratioOptions = [
  { value: '60:40', label: '60:40' },
  { value: '52:48', label: '52:48' },
  { value: '50:50', label: '50:50' },
]

const AddRateDetails = () => {
  const [checked, setChecked] = useState('COW')
  const [showDropDown1, setShowDropDown1] = useState(false)
  const [showDropDown2, setShowDropDown2] = useState(false)
  const [showDropDown3, setShowDropDown3] = useState(false)
  const [levelOption, setLevelOption] = useState('level1')
  const [typeOption, setTypeOption] = useState('kgfat+kgsnf')
  const [ratioOption, setRatioOption] = useState('60:40')
  const [level, setLevel] = useState('')
  const [chartName, setChartName] = useState('')
  const [ratio, setRatio] = useState('')
  const [standardFat, setStandardFat] = useState(0)
  const [standardSnf, setStandardSnf] = useState(0)
  const [standardRate, setStandardRate] = useState(0)
  const [rate, setRate] = useState(0)
  const [fatMinimum, setFatMinimum] = useState(0)
  const [fatMaximum, setFatMaximum] = useState(0)
  const [fatIncrement, setFatIncrement] = useState(0)
  const [snfMinimum, setSnfMinimum] = useState(0)
  const [snfMaximum, setSnfMaximum] = useState(0)
  const [snfIncrement, setSnfIncrement] = useState(0)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <DropDown
          label={'ENTER TYPE'}
          mode={'flat'}
          visible={showDropDown1}
          showDropDown={() => setShowDropDown1(true)}
          onDismiss={() => setShowDropDown1(false)}
          value={typeOption}
          setValue={setTypeOption}
          list={typeOptions}
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
          label={'ENTER LEVEL'}
          mode={'flat'}
          visible={showDropDown2}
          showDropDown={() => setShowDropDown2(true)}
          onDismiss={() => setShowDropDown2(false)}
          value={levelOption}
          setValue={(level) => {
            setLevelOption(level)
            setLevel(level)
          }}
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

        <TextInput
          label='ENTER RATE CHART NAME'
          value={chartName}
          onChangeText={(name) => setChartName(name)}
          selectionColor='black'
          style={styles.textInput}
        />

        <View style={styles.radioContainer}>
          <View style={styles.radio}>
            <RadioButton
              value='COW'
              status={checked === 'COW' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('COW')}
            />
            <Text>{'COW'}</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton
              value='BUFFALO'
              status={checked === 'BUFFALO' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('BUFFALO')}
            />
            <Text>{'BUFFALO'}</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton
              value='BOTH'
              status={checked === 'BOTH' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('BOTH')}
            />
            <Text>{'BOTH'}</Text>
          </View>
        </View>

        {typeOption === 'kgfat+kgsnf' && (
          <View>
            <DropDown
              label={'ENTER RATIO'}
              mode={'flat'}
              visible={showDropDown3}
              showDropDown={() => setShowDropDown3(true)}
              onDismiss={() => setShowDropDown3(false)}
              value={ratioOption}
              setValue={(ratio) => {
                setRatioOption(ratio)
                setRatio(ratio)
              }}
              list={ratioOptions}
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
            <TextInput
              label='ENTER STANDARD FAT'
              value={standardFat}
              onChangeText={(fat) => setStandardFat(fat)}
              selectionColor='black'
              style={styles.textInput}
              keyboardType='numeric'
            />
            <TextInput
              label='ENTER STANDARD SNF'
              value={standardSnf}
              onChangeText={(snf) => setStandardSnf(snf)}
              selectionColor='black'
              style={styles.textInput}
              keyboardType='numeric'
            />
            <TextInput
              label='ENTER STANDARD RATE'
              value={standardRate}
              onChangeText={(rate) => setStandardRate(rate)}
              selectionColor='black'
              style={styles.textInput}
              keyboardType='numeric'
            />
          </View>
        )}

        {typeOption === 'kgfat' && (
          <View>
            <TextInput
              label='ENTER RATE'
              value={rate}
              onChangeText={(rate) => setRate(rate)}
              selectionColor='black'
              style={styles.textInput}
              keyboardType='numeric'
            />
          </View>
        )}

        {(typeOption === 'fat' || typeOption === 'fat+snf') && (
          <View>
            <Text style={styles.titleStyle}>FAT</Text>
            <View>
              <TextInput
                label='ENTER FAT MINIMUM'
                value={fatMinimum}
                onChangeText={(fat) => setFatMinimum(fat)}
                selectionColor='black'
                style={styles.textInput}
                keyboardType='numeric'
              />
              <TextInput
                label='ENTER FAT MAXIMUM'
                value={fatMaximum}
                onChangeText={(fat) => setFatMaximum(fat)}
                selectionColor='black'
                style={styles.textInput}
                keyboardType='numeric'
              />
            </View>
            <TextInput
              label='ENTER FAT INCREMENT'
              value={fatIncrement}
              onChangeText={(fat) => setFatIncrement(fat)}
              selectionColor='black'
              style={styles.textInput}
              keyboardType='numeric'
            />
          </View>
        )}

        {typeOption === 'fat+snf' && (
          <View>
            <Text style={styles.titleStyle}>SNF</Text>
            <TextInput
              label='ENTER SNF MINIMUM'
              value={snfMinimum}
              onChangeText={(snf) => setSnfMinimum(snf)}
              selectionColor='black'
              style={styles.textInput}
              keyboardType='numeric'
            />
            <TextInput
              label='ENTER SNF MAXIMUM'
              value={snfMaximum}
              onChangeText={(snf) => setSnfMaximum(snf)}
              selectionColor='black'
              style={styles.textInput}
            />
            <TextInput
              label='ENTER SNF INCREMENT'
              value={snfIncrement}
              onChangeText={(snf) => setSnfIncrement(snf)}
              selectionColor='black'
              style={styles.textInput}
            />
          </View>
        )}
      </ScrollView>

      <Button
        icon='content-save'
        mode='contained'
        onPress={() => console.log('New Rate Details Saved')}
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
  radioContainer: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },

  radio: {
    padding: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  twoCol: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  titleStyle: {
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingTop: 5,
  },
})

export default AddRateDetails
