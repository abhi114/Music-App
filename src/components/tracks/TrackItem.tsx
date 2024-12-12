import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'
import { usePlayerStore } from '../../state/UsePlayerStore';
import { Colors, Fonts } from '../../utils/Constants';
import { resetAndNavigate } from '../../utils/NavigationUtils';
import CustomText from '../ui/CustomText';
import { fontR } from '../../utils/Scaling';
import Icon from '../ui/Icon';
import SlidingText from '../ui/SlidingText';
interface TrackItemProps {
    item:any;
    onNavigate?:boolean;

}
const TrackItem:FC<TrackItemProps> = ({item,onNavigate}) => {
    const {currentPlayingTrack,setCurrentPlayingTrack} = usePlayerStore();
    const togglePlayTrack = async()=>{
        await setCurrentPlayingTrack(item)
    }
    const isActive = currentPlayingTrack?.id === item?.id
  return (
    <TouchableOpacity 
    activeOpacity={0.8} 
    style={styles.container} 
    onPress={()=>{
        togglePlayTrack();
        if(onNavigate){
        resetAndNavigate("UserBottomTab");
    } }}>
        <View style={styles.flexRowBetween}>
            <View style={styles.flexRow}>
                    <Image source={item?.artwork_uri} style={styles.img}/>
                    <View style={styles.trackInfo}>
                        {currentPlayingTrack?.title === item?.title?
                        <SlidingText fontFamily={Fonts.Bold} fontSize={fontR(8)} text={currentPlayingTrack?.title}/>
                        :<CustomText numberOfLines={1} fontSize={fontR(9)} fontFamily={Fonts.Medium} style={{color:isActive?Colors.primary:Colors.text}}>{item.title}</CustomText>}
                        <CustomText numberOfLines={1} fontSize={fontR(8)}>
                            {item?.artist?.name}
                        </CustomText>
                    </View>
            </View>
            <Icon name='ellipsis-horizontal-sharp' iconFamily='Ionicons' size={fontR(14)}/>
        </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container:{
        padding:10,
        borderRadius:10,
        backgroundColor:Colors.backgroundDark,
        marginVertical:5,

    },
    flexRowBetween:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center', 
        padding:5
    },
    flexRow:{
        flexDirection:'row',
        gap:10,
        alignItems:'center'
    },
    img:{
        borderRadius:4,
        width:45,
        height:45,
        resizeMode:'cover',
    },
    trackInfo:{
        width:'65%',
    }

})
export default TrackItem