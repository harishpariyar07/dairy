import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button, IconButton, MD3Colors } from 'react-native-paper'
import { FlatList } from 'react-native'
import AddRateDetails from './AddRateDetails'
import { SafeAreaView } from 'react-native-safe-area-context'

const RateChart = () => {
  const navigator = useNavigation()
  const [search, setSearch] = useState('')

  const data = [
    {
      category: 'KGFAT + KGSNF',
      name: 'Standard RC',
      ratio: '60:40',
      level: 1,
      type: 'COW',
    },
    {
      category: 'KGFAT + KGSNF',
      name: 'Standard RC',
      ratio: '60:40',
      level: 1,
      type: 'BUFFALO',
    },
  ]

  const Item = ({ category, name, level, type }) => (
    <View style={styles.item}>
      <View style={styles.itemDetails}>
        <View style={styles.wrapper}>
          <Text style={{ fontWeight: '500', fontSize: 16 }}>{name}</Text>
          <Text style={{ color: 'red' }}>({type})</Text>
        </View>
        <View style={styles.wrapper}>
          <Text>Level {level}</Text>
          <Text>({category})</Text>
        </View>
      </View>
      <IconButton
        icon='pencil'
        iconColor={MD3Colors.error50}
        size={20}
        onPress={() => console.log('Rate chart edited')}
      />
      <IconButton
        icon='delete'
        iconColor={MD3Colors.error50}
        size={20}
        onPress={() => console.log('Rate chart deleted')}
      />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            level={item.level}
            type={item.type}
            category={item.category}
            key={item.name}
          />
        )}
        key={(item) => item.id}
        keyExtractor={(item) => item.id}
      />

      <Button
        icon='plus'
        mode='contained'
        onPress={() => navigator.navigate(AddRateDetails)}
        style={styles.button}
      >
        Add Rate Chart
      </Button>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  itemDetails: {
    width: 300,
  },
  wrapper: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  button: {
    padding: 4,
    backgroundColor: '#6987d0',
  },
})

export default RateChart
