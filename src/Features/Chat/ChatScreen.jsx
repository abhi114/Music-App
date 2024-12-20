import { View, Text } from 'react-native'
import React from 'react'
import withPlayer from '../../components/player/Player'
import CustomSafeAreaView from '../../components/ui/CustomSafeAreaView'
import CustomHeader from '../../components/ui/CustomHeader'
import FriendsList from './FriendsList'

const ChatScreen = () => {
  return (
    <CustomSafeAreaView style={{marginBottom: 65}}>
      <CustomHeader title="Your Friends" />
        <FriendsList/>
    </CustomSafeAreaView>
  )
}   

export default withPlayer(ChatScreen)