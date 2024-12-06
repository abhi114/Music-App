import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const AirPlayer = () => {
  return (
    <View style={styles.container}>
      <Text>AirPlayer</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        paddingTop:4,
        height:60,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'red',
        paddingHorizontal:5,
        overflow:'hidden',
        width:'100%'
    }
})
export default AirPlayer