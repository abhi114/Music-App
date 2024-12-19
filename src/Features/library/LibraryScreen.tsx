import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import CustomSafeAreaView from '../../components/ui/CustomSafeAreaView'
import CustomHeader from '../../components/ui/CustomHeader'
import { fontR, screenHeight } from '../../utils/Scaling'
import CustomText from '../../components/ui/CustomText'
import Icon from '../../components/ui/Icon'
import withPlayer from '../../components/player/Player'
import { usePlayerStore } from '../../state/UsePlayerStore'
import TrackItem from '../../components/tracks/TrackItem'
const LibraryScreen = () => {
  const {localTracks} = usePlayerStore();
  const renderMusicTrack = ({item}: any) => {
    return <TrackItem item={item} />;
  };
  return (
    
    <CustomSafeAreaView style={{marginBottom: 65}}>
      <CustomHeader title="Your Local Tracks" />
      <FlatList
        data={localTracks}
        renderItem={renderMusicTrack}
        keyExtractor={(item: any) => item.id}
        showsVerticalScrollIndicator={false}
        style={{paddingTop: 20}}
      />
    </CustomSafeAreaView>
  );
}


const styles = StyleSheet.create({
  container:{
    height:screenHeight*0.7,
    justifyContent:'center',
    alignItems:'center'
  }
})
export default withPlayer(LibraryScreen)