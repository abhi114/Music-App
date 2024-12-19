import { View, Text, FlatList, PermissionsAndroid } from 'react-native'
import React, { FC, useEffect } from 'react'
import CustomSafeAreaView from '../../components/ui/CustomSafeAreaView'
import withPlayer from '../../components/player/Player'
import CustomHeader from '../../components/ui/CustomHeader'
import { usePlayerStore } from '../../state/UsePlayerStore'
import TrackItem from '../../components/tracks/TrackItem'

const HomeScreen:FC = () => {

  const {allTracks} = usePlayerStore()
  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to read files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  
  const loadTracks = async () => {
    const {fetchAndAppendLocalTracks} = usePlayerStore.getState();
    await requestPermissions();
    await fetchAndAppendLocalTracks();
  };
  useEffect(()=>{
    
    loadTracks();
  },[])
  const renderMusicTrack = ({item}:any)=>{
      return <TrackItem item={item}/>
  }
  return (
    <CustomSafeAreaView style={{marginBottom:65}}>
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