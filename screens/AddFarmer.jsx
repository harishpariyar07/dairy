import { View, Text } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { Button, Searchbar, IconButton, MD3Colors } from 'react-native-paper'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AddFarmerDetails from './AddFarmerDetails'

const DATA = [
  {
    id: 1,
    name: 'Harish Pariyar',
    phone: '9821500061',
    level: 1,
  },
  {
    id: 2,
    name: 'Kiran Poudel',
    phone: '9867185525',
    level: 2,
  },
]

const Item = ({ id, name, level, phone }) => (
  <View style={styles.item}>
    <View style={styles.icon}>
      <IconButton icon='account' iconColor={MD3Colors.error50} size={20} />
    </View>
    <View>
      <Text style={styles.name}>{name}</Text>
      <Text>{phone}</Text>
    </View>
    <Text>Level {level}</Text>
    <IconButton
      icon='delete'
      iconColor={MD3Colors.error50}
      size={20}
      onPress={() => console.log('Farmer details deleted')}
    />
  </View>
)

const AddFarmer = () => {
  const [search, setSearch] = useState('')
  const navigator = useNavigation()

  return (
    <View style={styles.container}>
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
        data={DATA.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))}
        renderItem={({ item }) => (
          <Item id={item.id} name={item.name} level={item.level} phone={item.phone} />
        )}
        keyExtractor={(item) => item.id}
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
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    marginBottom: 2,
    padding: 10,
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
