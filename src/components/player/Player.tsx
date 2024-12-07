import React, { useEffect, useRef } from "react";
import { BOTTOM_TAB_HEIGHT } from "../../utils/Constants";
import { screenHeight } from "../../utils/Scaling";
import { Platform, StyleSheet, View } from "react-native";
import CustomText from "../ui/CustomText";
import {Gesture, GestureDetector, ScrollView} from 'react-native-gesture-handler'
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSharedState } from "../../Features/tabs/SharedContext";
import FullScreenPlayer from "./FullScreenPlayer";
import AirPlayer from "./AirPlayer";
const MIN_PLAYER_HEIGHT = BOTTOM_TAB_HEIGHT + 60;
const MAX_PLAYER_HEIGHT = screenHeight;

const withPlayer = <P extends object>(
    WrappedComponent:React.Component<P>
):React.FC<P>=>{
    const WithPlayer:React.FC<P>=(props)=>{
        const {translationY} = useSharedState();
        const isExpanded = useSharedValue(false);
        const isScroll = useSharedValue(false);
        const scrollRef = useRef<Animated.ScrollView>(null)
        useEffect(()=>{
            translationY.value = withTiming(0,{duration:0}) //it means that full screen player should be minimized on app start
        },[translationY])
        // what we are doing here is that if the application is at the top most scroll then it cant scroll any further up and if the user is still trying to go up then let the gesture handler handle it
        // as it is most likely that user want to open full player screen
        const onScroll = useAnimatedScrollHandler({
            onBeginDrag({contentOffset}){
                if(contentOffset.y === 0){
                    isScroll.value=false
                }
            },
            onEndDrag({contentOffset}){
                if(contentOffset.y === 0){
                    isScroll.value=false
                }
            },
            onMomentumEnd({contentOffset}){
                 if(contentOffset.y === 0){
                    isScroll.value=false
                }
            }
        })
        const panGesture = Gesture.Pan()
        .onChange(()=>{
            if(translationY.value <= -602){
                isScroll.value=true
            }

        })
        .onUpdate((event)=>{
            translationY.value = Math.max(Math.min(event.translationY + (isExpanded.value ? -MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT:0),0),-MAX_PLAYER_HEIGHT+MIN_PLAYER_HEIGHT)
        })
        .onEnd((event)=>{
            //console.log(event?.translationY)
            if(event?.translationY<-MIN_PLAYER_HEIGHT/2){ //it means user want to open full player
                isExpanded.value= true;
                translationY.value = withTiming(-MAX_PLAYER_HEIGHT+MIN_PLAYER_HEIGHT,{duration:300})
            }else{
                isExpanded.value = false;
                translationY.value = withTiming(0,{duration:300})
            }
        }).enabled(!isScroll.value)
         const animatedContainerStyle = useAnimatedStyle(()=>{
            const height = interpolate(translationY.value,[-MAX_PLAYER_HEIGHT+MIN_PLAYER_HEIGHT,0],[MAX_PLAYER_HEIGHT,MIN_PLAYER_HEIGHT],"clamp")
            return{
                height,
                borderTopLeftRadius:translationY.value <-2 ? 15:0,
                borderTopRightRadius:translationY.value<-2 ?15:0,

            }
         })
         const collapsedOpacityStyle = useAnimatedStyle(()=>{
            const opacity = interpolate(translationY.value,[-2,0],[0,1],"clamp")
            return {
                opacity,
                display:translationY.value <-2 ?'none':'flex'
            }
         })
         const expandedOpacityStyle = useAnimatedStyle(()=>{
             const opacity = interpolate(translationY.value,[-2,0],[1,0],"clamp")
            return {
                opacity,
                display:translationY.value >-2 ?'none':'flex'
            }
         })
         const combinedGesture = Gesture.Simultaneous(panGesture,Gesture.Native())
        // expanded opacity style is a react native animated style that will change with the animation
        return (
            <View style={styles.container}>
                <WrappedComponent {...props}/>
                <GestureDetector gesture={combinedGesture}>
                    <Animated.View style={ [styles.playerContainer,animatedContainerStyle]}>
                        {Platform.OS === 'ios'?
                        <Animated.ScrollView persistentScrollbar
                        ref={scrollRef}
                        pinchGestureEnabled 
                        bounces={false} showsVerticalScrollIndicator={false} 
                        scrollEventThrottle={1}
                         onScroll={onScroll} 
                         contentContainerStyle={styles.expandedPlayer}
                         style={expandedOpacityStyle}> 
                            <FullScreenPlayer/>
                        </Animated.ScrollView>
                        :
                        <Animated.ScrollView style={expandedOpacityStyle}>
                            <ScrollView 
                            persistentScrollbar
                             bounces={false} 
                            pinchGestureEnabled 
                            showsVerticalScrollIndicator={false} 
                            nestedScrollEnabled 
                            contentContainerStyle={styles.expandedPlayer}>
                                     <FullScreenPlayer/>
                            </ScrollView>
                        </Animated.ScrollView>
                        }
                        <Animated.View style={[styles.collapsedPlayer,collapsedOpacityStyle]}>
                            <AirPlayer/>
                        </Animated.View>
                    </Animated.View>
                </GestureDetector>
            </View>
        )
    }
    return React.memo(WithPlayer)
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    expandedPlayer:{
        alignItems:'center',
        backgroundColor:'#444'
    },
    playerContainer:{
        position:'absolute',
        width:'100%',
        zIndex:1,
        overflow:'hidden',
        bottom:0
    },
    collapsedPlayer:{
        justifyContent:'center',
        alignItems:'center'
    }

})
export default withPlayer