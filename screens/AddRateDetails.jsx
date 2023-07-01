import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button } from 'react-native-paper'

const AddRateDetails = () => {
  const [text, setText] = useState('')

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          label='KGFAT+KGSNF'
          value={text}
          onChangeText={(text) => setText(text)}
          selectionColor='black'
          style={styles.textInput}
        />
        <TextInput
          label='Level 1'
          value={text}
          onChangeText={(text) => setText(text)}
          selectionColor='black'
          style={styles.textInput}
        />
        <TextInput
          label='Enter Rate Chart Name'
          value={text}
          onChangeText={(text) => setText(text)}
          selectionColor='black'
          style={styles.textInput}
        />
        <TextInput
          label='Ratio'
          value={text}
          onChangeText={(text) => setText(text)}
          selectionColor='black'
          style={styles.textInput}
        />

        <TextInput
          label='Enter standard fat'
          value={text}
          onChangeText={(text) => setText(text)}
          selectionColor='black'
          style={styles.textInput}
        />
        <TextInput
          label='Enter standard snf'
          value={text}
          onChangeText={(text) => setText(text)}
          selectionColor='black'
          style={styles.textInput}
        />
        <TextInput
          label='Enter standard rate'
          value={text}
          onChangeText={(text) => setText(text)}
          selectionColor='black'
          style={styles.textInput}
        />
      </ScrollView>

      <Button
        icon='content-save'
        mode='contained'
        onPress={() => console.log('New Rate Details Saved')}
        style={styles.button}
      >
        Save
      </Button>
    </View>
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
})

export default AddRateDetails
