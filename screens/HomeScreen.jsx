import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { DataTable } from 'react-native-paper';

import AddFarmerImg from '../assets/icons/addFarmer.png'
import CollectMilkImg from '../assets/icons/collectMilk.png';
import DuesImg from '../assets/icons/dues.png';
import LedgerImg from '../assets/icons/ledger.png'
import PaymentsImg from '../assets/icons/payments.png'
import RateChartImg from '../assets/icons/rateChart.png';

const screens = [
  { name: 'Add Farmer', component: 'AddFarmer', image: AddFarmerImg },
  { name: 'Collect Milk', component: 'CollectMilk', image: CollectMilkImg },
  { name: 'Rate Chart', component: 'RateChart', image: RateChartImg },
  { name: 'Payments', component: 'Payments', image: PaymentsImg },
  { name: 'Dues', component: 'Dues', image: DuesImg },
  { name: 'Ledger', component: 'Ledger', image: LedgerImg }
];

const HomeScreen = () => {
  const navigator = useNavigation();

  useLayoutEffect(() => {
    navigator.setOptions({ headerShown: false });
  }, [navigator]);

  const handleNavigation = (component) => {
    navigator.navigate(component);
  };

  const currentDate = new Date()
  const dayOfWeek = currentDate.getDay()
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate();

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar style='auto' />

      <View style={styles.upperContainer}>
        <Text style={styles.dayText}>
          {daysOfWeek[dayOfWeek]}
        </Text>

        <Text style={styles.dayText}>
          {`${day}-${month}-${year}`}
        </Text>



        <DataTable style={styles.table}>
          <DataTable.Header>
            <DataTable.Title><Text style={styles.tableHead}>TOTAL MILK</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableHead}>AVERAGE FAT</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.tableHead}>AVERAGE SNF</Text></DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell><Text style={styles.tableData}>50.50 Lt</Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.tableData}>12.87</Text></DataTable.Cell>
            <DataTable.Cell><Text style={styles.tableData}>8.03</Text></DataTable.Cell>
          </DataTable.Row>
        </DataTable>

      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.bottomContainer}>
          {screens.map(({ name, component, image }) => (
            <TouchableOpacity
              key={component}
              style={styles.button}
              onPress={() => handleNavigation(component)}
            >
              <Image source={image} style={styles.icon} />
              <Text style={styles.btnText}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    width: "46%",
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: '#e9edf7'
  },
  upperContainer: {
    // flex: 1,
    paddingTop: 80,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#6987d0'
  },
  bottomContainer: {
    margin: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "space-around"
  },
  scrollContainer: {
    flex: 1
  },
  icon: {
    width: 60,
    height: undefined,
    aspectRatio: 1
  },
  btnText: {
    padding: 10,
    fontFamily: 'Inter'
  },
  dayText: {
    fontFamily: 'LeagueSB',
    fontSize: 30,
    color: '#fff',
  },
  table: {
    margin: 10,
    padding: 20,
  },
  tableData : {
    color: '#fff'
  },
  tableHead : {
    color: '#fff',
    fontFamily: 'InterB',
  }
});

export default HomeScreen;
