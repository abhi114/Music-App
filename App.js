import { View, Text, StyleSheet, Platform, LogBox } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './src/navigation/Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';
LogBox.ignoreAllLogs()
const App = () => {
  useEffect(() => {
    if(Platform.OS === 'android'){
      TrackPlayer.setupPlayer()
    }
  
   
  }, [])
  
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <Navigation />
    </GestureHandlerRootView>
  );
}


export default App