import { View, Text } from 'react-native'
import React from 'react'
import Home from './component/Home'
import CoffeeHomePage from './component/CoffeeComponent/CoffeeHomePage'
import AppNavigation from './navigation/AppNavigation'

const App = () => {
  return (
    <View style={{flex:1}}>
      <AppNavigation/>
    </View>
  );
}

export default App