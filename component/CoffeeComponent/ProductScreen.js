import { View, Text, Image, SafeAreaView } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import {  ArrowLeftIcon, HeartIcon } from 'react-native-heroicons/solid'
import { ArrowLeftCircleIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

const ProductScreen = (props) => {
    const item = props.route.params
     const navigation = useNavigation();
  return (
    <View className="flex-1">
      <Image
        source={require('./Coffeeassets/coffe-back1.png')}
        style={{
          height: 300,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}
        className="w-full absolute opacity-80"
      />
      <SafeAreaView className="space-y-12 ">
        <View className="mx-4 flex-row justify-between items-center my-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftCircleIcon size={50} strokeWidth={1.2} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="rounded-full border-2 border-white p-2" >
            <HeartIcon size={24} strokeWidth={1.2} color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center " style={{elevation:10,marginTop:10}}>
            <Image source={item.image} className="h-60 w-60"/>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default ProductScreen