import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Searchbar, Button, TextInput, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddCollection = () => {
  const navigator = useNavigation();
  useLayoutEffect(() => {
    navigator.setOptions({ headerShown: false });
  }, [navigator]);

  const [totalAmt, setTotalAmt] = useState(0);
  const [rate, setRate] = useState(0);
  const [checked, setChecked] = useState('cow');

  const [search, setSearch] = useState('');

  const DATA = [
    {
      farmerName: 'Ayush',
      farmerId: '100',
    },
    {
      farmerName: 'Bhola',
      farmerId: '101',
    },
  ];

  const filteredData = DATA.filter((item) =>
    item.farmerId.includes(search)
  );

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        style={styles.search}
        placeholder="Search by Farmer ID"
        onChangeText={(text) => setSearch(text)}
        value={search}
      />

      {filteredData.length > 0 && search.length === filteredData[0].farmerId.length ? (
        filteredData.map((item, index) => (
          <View style={styles.farmerDetails} key={index}>
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <Text style={{ color: 'red', fontFamily: 'InterB' }}>
                FARMER NAME:{' '}
              </Text>
              <Text>{item.farmerName}</Text>
            </View>

            <View style={{ flexDirection: 'row', padding: 10 }}>
              <Text style={{ color: 'red', fontFamily: 'InterB' }}>
                FARMER ID:{' '}
              </Text>
              <Text>{item.farmerId}</Text>
            </View>

            <Text style={styles.amountRateText}>
              Total Amount: <Text style={styles.amountText}>{totalAmt}</Text> Rate:{' '}
              <Text style={styles.rateText}>{rate}</Text>
            </Text>

            <View>
              <TextInput
                style={styles.textInput}
                label="Quantity"
                mode="outlined"
                outlineColor="#e6e6e6"
                underlineColor="#e6e6e6"
                activeUnderlineColor="#e6e6e6"
                activeOutlineColor="#737373"
              />

              <TextInput
                style={styles.textInput}
                label="Fat"
                mode="outlined"
                outlineColor="#e6e6e6"
                underlineColor="#e6e6e6"
                activeUnderlineColor="#e6e6e6"
                activeOutlineColor="#737373"
              />

              <TextInput
                style={styles.textInput}
                label="SNF"
                mode="outlined"
                outlineColor="#e6e6e6"
                underlineColor="#e6e6e6"
                activeUnderlineColor="#e6e6e6"
                activeOutlineColor="#737373"
              />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="Cow"
                status={checked === 'cow' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('cow')}
                color='#77b300'
              />
              <Text>Cow</Text>

              <RadioButton
              value="Buffalo"
              status={checked === 'buffalo' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('buffalo')}
              color='#77b300'
            />
            <Text>Buffalo</Text>
            </View>

            

            <Button
              style={styles.button}
              icon="plus"
              mode="contained"
              buttonColor="#77b300"
            >
              Add Collection
            </Button>
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
          No farmer found
        </Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: 40,
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
  button: {
    marginVertical: 20,
  },
  textInput: {
    marginVertical: 10,
    fontSize: 13,
    fontFamily: 'Inter',
  },
  amountRateText: {
    fontFamily: 'Inter',
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    backgroundColor: '#e6e6e6',
    padding: 20
  },
  amountText: {
    color: 'blue',
  },
  rateText: {
    color: 'green',
  },
});

export default AddCollection;
