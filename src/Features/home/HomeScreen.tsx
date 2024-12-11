import { View, Text, FlatList } from 'react-native'
import React, { FC } from 'react'
import CustomSafeAreaView from '../../components/ui/CustomSafeAreaView'
import withPlayer from '../../components/player/Player'
import CustomHeader from '../../components/ui/CustomHeader'
import { usePlayerStore } from '../../state/UsePlayerStore'
import TrackItem from '../../components/tracks/TrackItem'

const HomeScreen:FC = () => {
  const {allTracks} = usePlayerStore()

  const renderMusicTrack = ({item}:any)=>{
      return <TrackItem item={item}/>
  }
  return (
    <CustomSafeAreaView>
      <CustomHeader title="Your Tracks"/>
      <FlatList data={allTracks} 
      renderItem={renderMusicTrack}
      keyExtractor={(item:any)=>item.id}
      showsVerticalScrollIndicator={false}
      style={{paddingTop:20}}
      />
    </CustomSafeAreaView>
    
  )
}


export default withPlayer(HomeScreen)