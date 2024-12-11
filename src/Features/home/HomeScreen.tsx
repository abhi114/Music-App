import { View, Text } from 'react-native'
import React, { FC } from 'react'
import CustomSafeAreaView from '../../components/ui/CustomSafeAreaView'
import withPlayer from '../../components/player/Player'
import CustomHeader from '../../components/ui/CustomHeader'

const HomeScreen:FC = () => {

  return (
    <CustomSafeAreaView>
      <CustomHeader title="Your Tracks"/>
    </CustomSafeAreaView>
    
  )
}


export default withPlayer(HomeScreen)