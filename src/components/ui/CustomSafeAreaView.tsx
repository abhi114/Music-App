import { View, Text, ViewStyle, StyleSheet, SafeAreaView } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '../../utils/Constants';

interface CustomSafeAreaViewProps{
    children:React.ReactNode;
    style?:ViewStyle
}

const CustomSafeAreaView:FC<CustomSafeAreaViewProps> = ({children ,style}) => {
  return (
    <View style={[styles.container,style]}>
        {/* enclosing means it will only save from the above safe area view not the bottom area */}
      <SafeAreaView/>
      {children}
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:2,
        paddingHorizontal:5,
        backgroundColor:Colors.background
    }
})
export default CustomSafeAreaView