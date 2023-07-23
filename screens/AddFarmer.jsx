import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Searchbar, IconButton, MD3Colors } from 'react-native-paper'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AddFarmerDetails from './AddFarmerDetails'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'

const deleteFarmer = async (farmerId) => {
  try {
    const res = await axios.delete(`http://172.16.54.237:5001/api/farmer/${farmerId}`)
    alert('Farmer Deleted Successfully')
  } catch (error) {
    console.warn(error)
  }
}

const Item = ({ farmerId, farmerName, farmerLevel, mobileNumber }) => (
  <View style={styles.item}>
    <View style={styles.icon}>
      <IconButton icon='account' iconColor={MD3Colors.error50} size={20} />
    </View>
    <View>
      <Text style={styles.name}>{farmerName}</Text>
      <Text>{mobileNumber}</Text>
    </View>
    <Text>Level {farmerLevel}</Text>
    <IconButton
      icon='delete'
      iconColor={MD3Colors.error50}
      size={20}
      onPress={() => deleteFarmer(farmerId)}
    />
  </View>
)

const AddFarmer = () => {
  const [search, setSearch] = useState('')
  const navigator = useNavigation()

  const [farmerData, setFarmerData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://172.16.54.237:5001/api/farmer')
        setFarmerData(response.data)
      } catch (error) {
        console.warn(error)
      }
    }

    fetchData()
  }, [farmerData])

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder='Search'
        onChangeText={(e) => setSearch(e)}
        value={search}
        style={{
          margin: 10,
          backgroundColor: '#fff',
          borderColor: '#edebeb',
          borderWidth: 2,
        }}
      />

      <FlatList
        data={farmerData.filter(({ farmerName }) =>
          farmerName.toLowerCase().includes(search.toLowerCase())
        )}
        renderItem={({ item }) => (
          <Item
            farmerId={item.farmerId}
            farmerName={item.farmerName}
            farmerLevel={item.farmerLevel}
            mobileNumber={item.mobileNumber}
          />
        )}
        keyExtractor={(item) => item.farmerId}
      />

      <Button
        icon='plus'
        mode='contained'
        onPress={() => navigator.navigate(AddFarmerDetails)}
        style={styles.button}
        buttonColor='#6987d0'
      >
        Add farmer
      </Button>
    </SafeAreaView>
  )
}

const styles = {
  container: {
    flex: 1,
    marginBottom: 2,
  },
  item: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    width: 200,
  },
  button: {
    padding: 4,
  },
}
export default AddFarmer
