import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-paper'

const RateChart = () => {

  const data = [
    {
      category: 'KGFAT + KGSNF',
      name: 'Standard RC',
      ratio: '60:40',
      level: 'Level 1',
      type: 'Cow',
    }
  ]

  const navigator = useNavigation()

  useLayoutEffect(() => {
    navigator.setOptions({ headerShown: false });
  }, [navigator])

  return (
    <View style={styles.container}>


      <Button mode='contained'>
        Add Rate Chart
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default RateChart