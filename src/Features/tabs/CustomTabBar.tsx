import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { BOTTOM_TAB_HEIGHT, Colors } from '../../utils/Constants'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const CustomTabBar:FC<BottomTabBarProps> = (props) => {
    const {state,navigation} = props
    const safeAreaInsets = useSafeAreaInsets()
  return (
    <Animated.View style={[styles.tabBarContainer,{paddingBottom:safeAreaInsets.bottom}]}>
      {
        state.routes.map((route,index)=>{
            const isFocused = state.index === index
            const onPress = ()=>{
                const event = navigation.emit({
                    type:'tabPress',
                    target:route.key,
                    canPreventDefault:true
                })
                if(!isFocused && !event.defaultPrevented){
                    navigation.navigate(route.name)
                }
            }
            const onLongPress = ()=>{
                navigation.emit({
                    type:'tabLongPress',
                    target:route.key,
                })
            }
            return(
                    
            )
        })
      }
    </Animated.View>
  )
}
const styles = StyleSheet.create({
    tabBarContainer:{
        backgroundColor:Colors.backgroundDark,
        width:'100%',
        position:'absolute',
        height:BOTTOM_TAB_HEIGHT,
        bottom:0,
        paddingTop:10,
        zIndex:5,
        alignItems:'center',
        justifyContent:'space-around'
    }
})
export default CustomTabBar