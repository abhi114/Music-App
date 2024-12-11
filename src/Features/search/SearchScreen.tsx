import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomSafeAreaView from '../../components/ui/CustomSafeAreaView'
import CustomHeader from '../../components/ui/CustomHeader'
import { screenHeight } from '../../utils/Scaling'
import CustomText from '../../components/ui/CustomText'

const SearchScreen = () => {
  return (
    <CustomSafeAreaView>
      <CustomHeader title=''/>
      <View style={styles.container}>
        <CustomText variant='h5'>
          Coming Soon!
        </CustomText>
      </View>
    </CustomSafeAreaView>
  )
}


const styles = StyleSheet.create({
  container:{
    height:screenHeight*0.5,
    justifyContent:'center',
    alignItems:'center'
  }
})
export default SearchScreen