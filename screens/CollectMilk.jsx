import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Searchbar, SegmentedButtons } from 'react-native-paper';
import { Table, Row } from 'react-native-table-component';
import DateTimePicker from '@react-native-community/datetimepicker';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

const CollectMilk = () => {

  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [dateString, setDateString] = useState('Select Date')

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    const dateInStr = date.toUTCString().split(' ').slice(1, 4).join(' ');
    setDateString(dateInStr)
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  const navigator = useNavigation();
  useLayoutEffect(() => {
    navigator.setOptions({ headerShown: false });
  }, [navigator]);

  const tableHead = [
    { label: 'Date', width: 65 },
    { label: 'S', width: 20 },
    { label: 'Name', width: 65 },
    { label: 'Id', width: 36 },
    { label: 'Type', width: 30 },
    { label: 'Qty', width: 40 },
    { label: 'Rate', width: 40 },
    { label: 'Amt', width: 50 }
  ];

  const tableData = [
    ['01/01/21', 'A', 'Arvind', '100', 'C', '10', '50', '500'],
    ['01/01/21', 'A', 'Bhola', '101', 'C', '14', '45', '300'],
    ['01/01/21', 'A', 'Chetan', '102', 'B', '12', '50', '600'],
    ['01/01/21', 'A', 'Dinesh', '103', 'C', '10', '50', '500'],
    ['01/01/21', 'A', 'Eknath', '104', 'C', '10', '50', '500'],
    ['01/01/21', 'A', 'Firoz', '105', 'C', '10', '50', '500']
  ];

  const [search, setSearch] = useState('');
  const [filteredTableData, setFilteredTableData] = useState(tableData);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <Searchbar
          placeholder="Search by name"
          onChangeText={(e) => {
            setSearch(e);
            setFilteredTableData(
              tableData.filter((row) =>
                row[2].toLowerCase().includes(e.toLowerCase())
              )
            );
          }}
          value={search}
          style={styles.searchBar}
        />
      </View>



      <HideWithKeyboard style={styles.calender}>

        {/* The button that used to trigger the date picker */}
        {!isPickerShow && (
          <View style={styles.btnContainer}>
            <Button
              mode='text'
              icon='calendar-today'
              style={styles.button}
              onPress={showPicker}
            >
              <Text>{dateString}</Text>
            </Button>
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


        <View style={{ flexDirection: 'row', width: 170}}>
          <SegmentedButtons
            density='small'
            buttons={[
              {
                value: 'Cow',
                label: 'Cow',
              },
              {
                value: 'Buffallo',
                label: 'Buffallo',
              }
            ]}
          />
        </View>


      </HideWithKeyboard>


      <View style={styles.container2}>
        <ScrollView>
          <Table style={styles.table}>
            <Row
              data={tableHead.map((header) => header.label)}
              widthArr={tableHead.map((header) => header.width)}
              style={styles.head}
              textStyle={styles.headText}
            />
            {filteredTableData.map((rowData, index) => (
              <Row
                key={index}
                data={rowData}
                style={[
                  styles.row,
                  index % 2 === 0 && styles.evenRow,
                  index === 0 && styles.firstRow
                ]}
                textStyle={styles.text}
                widthArr={tableHead.map((header) => header.width)}
              />
            ))}
          </Table>
        </ScrollView>
      </View>

      <HideWithKeyboard style={styles.container3}>
        <Button
          icon="plus"
          mode="contained"
          style={styles.button}
          buttonColor="#77b300"
          onPress={() => navigator.navigate('AddCollection')}
        >
          Add Collection
        </Button>

        <Button
          icon="share"
          mode="contained"
          style={styles.shareButton}
          buttonColor="#6987d0"
        >
          Export and share
        </Button>
      </HideWithKeyboard>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    width: '100%',
  },
  head: {
    height: 30,
    backgroundColor: '#6987d0',
  },
  headText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'InterB'
  },
  row: {
    height: 45,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  firstRow: {
    borderTopWidth: 1,
  },
  text: {
    margin: 6,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Inter'
  },
  button: {
    width: '90%',
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: '90%',
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    margin: 10,
    backgroundColor: '#fff',
    borderColor: '#edebeb',
    borderWidth: 2,
  },
  container1: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: 15,
  },
  container3: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    top: 5,
    gap: 10,
  },
  container2: {
    flex: 3.8,
    width: '95%',
    top: 10,
    bottom: 10
  },
  calender: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    flexDirection: 'row',
    gap: 40,
  },
  // This only works on iOS
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default CollectMilk;
