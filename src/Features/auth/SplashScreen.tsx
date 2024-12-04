import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC, useEffect } from 'react'
import { Colors } from '../../utils/Constants'
import { screenHeight, screenWidth } from '../../utils/Scaling'
import { resetAndNavigate } from '../../utils/NavigationUtils'

const SplashScreen:FC = () => {
  useEffect(() => {
    console.log("here");
    setTimeout(() => {
       resetAndNavigate('UserBottomTab')
       //console.log("this also");
    }, 2000);
   
  
    return () => {
      
    }
  }, [])
  
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logoImage}/>
      
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Colors.background,
    justifyContent:'center',
    alignItems:'center'
  },
  logoImage:{
    height:screenHeight*0.4,
    width:screenWidth*0.4,
    resizeMode:'contain'
  }
})
export default SplashScreen