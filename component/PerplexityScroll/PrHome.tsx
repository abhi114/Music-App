import { View, Text, FlatList, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'
import { Item } from './fakedata'
import Animated, { interpolate, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
type VerticalListProps = {
  data:Item[];
}
type AnimatedCardProps = {
  item:Item;
  index:number;
  scrollY:SharedValue<number>
}
const {height} = Dimensions.get('screen');
const _spacing = 6;
const blackColor = '#000000'
const _itemsize = height *0.65;
const _itemFullSize = _itemsize + _spacing * 2
const AnimatedCard = ({item,index,scrollY}:AnimatedCardProps)=>{
  const stylez = useAnimatedStyle(()=>{
    return {
      opacity:interpolate(scrollY.value,[index-1,index,index+1],[0.1,1,0.1]),
      transform:[{
        scale:interpolate(
          scrollY.value,
          [index-1,index,index+1],
          [0.9,1,0.9]
        )
      }]
    }
  })
  return <Animated.View style={[{flex:1,height:_itemsize,padding:_spacing*2,borderRadius:8,gap:_spacing},stylez]}>
    <Image source={{uri:item.image,}} style={[StyleSheet.absoluteFillObject,{borderRadius:12,}] } blurRadius={50}/>
    <Image source={{uri:item.image}} style={{flex:1,height:_itemsize*0.4,borderRadius:5}} />
    <View style={{gap:_spacing}}>
      <Text style={{fontSize:24,fontWeight:'700',color:"#fff"}}>{item.title}</Text>
      <Text numberOfLines={3} style={{color:'#ddd'}}>{item.description}</Text>
    </View>
    <View style={{flexDirection:'row',gap:_spacing,alignItems:'center'}}>
      <Image source={{uri:item.author.avatar,}} style={{width:24,aspectRatio:1,borderRadius:12}} />
      
      <Text style={{color:'#ddd'}}>{item.author.name}</Text>
    </View>
  </Animated.View>
}
const PrHome = ({data}:VerticalListProps) => {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(e=>{
    scrollY.value = e.contentOffset.y/_itemFullSize;
  })
  return (
    <View style={styles.container}>
      <Animated.FlatList 

      data={data} 
      contentContainerStyle={{paddingHorizontal:_spacing * 3,gap:_spacing * 2,paddingVertical:(height-_itemFullSize)/2}}
      renderItem={({item,index})=>(
        <AnimatedCard item={item} index={index} scrollY = {scrollY}/>
      )}
      snapToInterval={_itemFullSize}
      decelerationRate={'fast'}
      onScroll={onScroll}
      scrollEventThrottle={16}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#111',
    justifyContent:"center",
  }
})
export default PrHome