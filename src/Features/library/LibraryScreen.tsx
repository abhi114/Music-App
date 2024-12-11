import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomSafeAreaView from '../../components/ui/CustomSafeAreaView'
import CustomHeader from '../../components/ui/CustomHeader'
import { fontR, screenHeight } from '../../utils/Scaling'
import CustomText from '../../components/ui/CustomText'
import Icon from '../../components/ui/Icon'

const LibraryScreen = () => {
  return (
    <CustomSafeAreaView>
      <CustomHeader title=''/>
      <View style={styles.container}>
        <Icon name='musical-note' iconFamily='Ionicons' size={fontR(40)}/>
        <CustomText variant='h5'>
          Coming Soon!
        </CustomText>
      </View>
    </CustomSafeAreaView>
  )
}


const styles = StyleSheet.create({
  container:{
    height:screenHeight*0.7,
    justifyContent:'center',
    alignItems:'center'
  }
})
export default LibraryScreen