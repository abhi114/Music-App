import { View, Text, StyleSheet, Platform, Image } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import TrackPlayer, { usePlaybackState, useProgress } from 'react-native-track-player';
import { usePlayerStore } from '../../state/UsePlayerStore';
import { Colors, Fonts } from '../../utils/Constants';
import { fontR, screenWidth } from '../../utils/Scaling';
import SlidingText from '../ui/SlidingText';
import CustomText from '../ui/CustomText';
import ScalePress from '../ui/ScalePress';
import Icon from '../ui/Icon';
import Slider from '@react-native-community/slider';
import PackageIcon from 'react-native-vector-icons/MaterialIcons'
const Controls:FC = () => {
     const [colors,setColors]= useState(['#666','#666']);
     const [icon,setIcon]= useState();
  const progress = useProgress();
  const [sliderValue, setSliderValue] = useState(progress?.position / progress?.duration || 0);

  const state = usePlaybackState()
  const isPlaying = state.state == 'playing'
  const {play,pause,currentPlayingTrack,next,previous,toggleRepeat,toggleShuffle,isRepeating} = usePlayerStore();
  const formatTime = (seconds:any)=>{
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds%60);
    return `${minutes}:${secs<10?'0':''}${secs}`
  }
  
 
  const calculateProgressWidth:any=()=>{
    if(progress.duration>0){
        const percentage = (progress?.position/progress?.duration) * 100;
        return `${percentage}%`
    }
    return '0%'
  }
  const togglePlayback = async()=>{
    if(isPlaying){
      pause()
    }else{
      play()
    }
  }
const handleSeek = async(value:any)=>{
        await TrackPlayer.seekTo(value*progress?.duration)
}
const handleLooping = async ()=>{
  if(isRepeating){
    toggleShuffle()
  }else{
    toggleRepeat();
  }
}
useEffect(() => {
  PackageIcon.getImageSource('circle',15,'white').then(setIcon)

  return () => {
    
  }
}, [])

  return (
    <View style={styles.container}>
      <View style={styles.flexRowBetween}>
        <View style={{width:'85%'}}>
            <SlidingText fontFamily={Fonts.Bold} fontSize={fontR(14)} text={currentPlayingTrack?.title}/>
            <CustomText fontSize={fontR(9)} fontFamily={Fonts.Medium} style={styles.artist}>
                {currentPlayingTrack?.artist?.name}
            </CustomText>
        </View>
        <ScalePress>
            <Icon name='add-circle-outline' iconFamily='MaterialIcons' size={fontR(28)}/>
        </ScalePress>
      </View>
      <Slider  style={styles.slider} minimumValue={0} maximumValue={1} value={progress?.position/progress?.duration || 0} tapToSeek onSlidingComplete={handleSeek} thumbImage={icon} 
      minimumTrackTintColor='#fff'
      maximumTrackTintColor='rgba(255,255,255,0.2)'/>
      
      <View style={styles.timeZone}>
        <CustomText fontSize={fontR(7)}>{formatTime(progress?.position)}</CustomText>
        <CustomText fontSize={fontR(7)}>{formatTime(progress?.duration - progress?.position)}</CustomText>
      </View>
      <View style={styles.flexRowBetween}>
        <ScalePress onPress={handleLooping}>
          <Icon name={isRepeating?'repeat':'shuffle'} iconFamily='Ionicons' color={Colors.primary} size={fontR(22)}/>
        </ScalePress>
        <ScalePress onPress={previous}>
          <Icon name='play-skip-back-sharp' iconFamily='Ionicons'  size={fontR(26)}/>
        </ScalePress>
        <ScalePress onPress={togglePlayback}>
          <Icon name={isPlaying?'pause-circle-sharp':'play-circle-sharp'} iconFamily='Ionicons'  size={fontR(40)}/>
        </ScalePress>
         <ScalePress onPress={next}>
          <Icon name='play-skip-forward-sharp' iconFamily='Ionicons'  size={fontR(26)}/>
        </ScalePress>
         <ScalePress>
          <Icon name='alarm' iconFamily='MaterialCommunityIcons'  size={fontR(22)} color={Colors.primary}/>
        </ScalePress>
      </View>
      <View style={styles.artistContainer}>
        <Image source={currentPlayingTrack?.artist?.cover_uri} style={styles.artistCover}/>
        <View style={{paddingHorizontal:20,paddingVertical:15}}>
            <CustomText fontFamily={Fonts.Bold} fontSize={fontR(11)}>{currentPlayingTrack?.artist?.name}</CustomText>
            <CustomText  fontFamily={Fonts.Medium} fontSize={fontR(8)} style={{opacity:0.7}}>1.7Cr Monthly Listener</CustomText>
            <CustomText  numberOfLines={3} fontSize={fontR(8)} fontFamily={Fonts.Medium} style={{marginTop:5,opacity:0.8}}>{currentPlayingTrack?.artist?.bio}</CustomText>
        </View>
      </View>
      <View style={styles.infoContainer}>
            <CustomText fontFamily={Fonts.Bold} fontSize={fontR(11)}>Credits</CustomText>
            <CustomText style={styles.titleText} fontFamily={Fonts.Medium} fontSize={fontR(9)}>{currentPlayingTrack?.artist?.name}</CustomText>
            <CustomText style={styles.subText} fontFamily={Fonts.Medium} fontSize={fontR(8)}>Main Artist,Composer,Producer</CustomText>
            <CustomText style={styles.titleText} fontFamily={Fonts.Medium} fontSize={fontR(8)}>{currentPlayingTrack?.lyricist}</CustomText>
            <CustomText style={styles.subText} fontFamily={Fonts.Medium} fontSize={fontR(8)}>Lyricist</CustomText>
      </View>
      <View style={styles.infoContainer}>
       
        <View style={styles.modelContainer}>
          <CustomText fontFamily={Fonts.Bold} fontSize={fontR(16)}>AN Music x Abhishek</CustomText>
          <CustomText  fontFamily={Fonts.Bold} fontSize={fontR(12)}>made with ❤️</CustomText>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:20,
        zIndex:88
    },
    subText:{
        marginTop:2,
        opacity:0.8,
    },
    titleText:{
        marginTop:10
    },
    modelContainer:{
        padding:20,
        alignItems:'center',
        justifyContent:'center',
        
        
        opacity:0.9
    },
    artistContainer:{
        backgroundColor:Colors.backgroundLight,
        borderRadius:12,
        overflow:'hidden',
        marginTop:40
    },
    infoContainer:{
        backgroundColor:Colors.backgroundLight,
        borderRadius:12,
        overflow:'hidden',
        marginTop:20,
        padding:10,
    },
    artistCover:{
        height:200,
        width:'100%',
        resizeMode:'cover'
    },
    slider:{
        width:Platform.OS=='android'?screenWidth-20:screenWidth-30,
        height:40,
        alignSelf:'center',
        marginTop:10, 
    },
    timeZone:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        bottom:10,
    },
    flexRowBetween:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',  
    },
    artist:{
        opacity:0.8,
        marginTop:5
    }

})
export default Controls