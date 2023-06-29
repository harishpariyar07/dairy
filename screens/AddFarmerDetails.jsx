import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import Select from 'react-select';

const levelOptions = [
  { value: 'level1', label: 'Level 1' },
  { value: 'level2', label: 'Level 2' },
  { value: 'level3', label: 'Level 3' },
  { value: 'level4', label: 'Level 4' },
];

const AddFarmerDetails = () => {
  const [text, setText] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          label='Farmer ID'
          value={text}
          onChangeText={(text) => setText(text)}
          selectionColor='black'
          style={styles.textInput}
        />
        <TextInput
          label='RFID'
          value={text}
          onChangeText={(text) => setText(text)}
          selectionColor='black'
          style={styles.textInput}
        />
        <TextInput
          label='Mobile Number'
          value={text}
          onChangeText={(text) => setText(text)}
          selectionColor='black'
          style={styles.textInput}
        />
        <TextInput
          label='Farmer Name'
          value={text}
          onChangeText={(text) => setText(text)}
          selectionColor='black'
          style={styles.textInput}
        />

        {/* <Select options={levelOptions} defaultValue={selectedOption} onChange={setSelectedOption} /> */}

        <TextInput
          label='Bank Name'
          value={text}
          onChangeText={(text) => setText(text)}
          selectionColor='black'
          style={styles.textInput}
        />
        <TextInput
          label='Bank Account Name'
          value={text}
          onChangeText={(text) => setText(text)}
          selectionColor='black'
          style={styles.textInput}
        />
        <TextInput
          label='Bank Holder Name'
          value={text}
          onChangeText={(text) => setText(text)}
          selectionColor='black'
          style={styles.textInput}
        />
        <TextInput
          label='Bank IFSC'
          value={text}
          onChangeText={(text) => setText(text)}
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
    </View>
  );
};

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
});

export default AddFarmerDetails;
