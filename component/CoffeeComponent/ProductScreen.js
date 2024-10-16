import { View, Text, Image, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {  ArrowLeftIcon, HeartIcon, MinusIcon, PlusIcon, ShoppingBagIcon, StarIcon } from 'react-native-heroicons/solid'
import { ArrowLeftCircleIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

const ProductScreen = (props) => {
    const item = props.route.params
     const navigation = useNavigation();
     const [size,setSize] = useState('small');
     const [number,setnumber] = useState(1);
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
      <SafeAreaView className="space-y-4 ">
        <View className="mx-4 flex-row justify-between items-center my-5">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftCircleIcon size={50} strokeWidth={1.2} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="rounded-full border-2 border-white p-2">
            <HeartIcon size={24} strokeWidth={1.2} color="white" />
          </TouchableOpacity>
        </View>
        <View
          className="flex-row justify-center "
          style={{elevation: 10, marginTop: 35}}>
          <Image source={item.image} className="h-60 w-60" />
        </View>
        <View
          style={{backgroundColor: '#824C1B'}}
          className="flex-row mx-4 items-center rounded-3xl p-1 px-2 space-x-1 w-16 opacity-90 ">
          <StarIcon size={15} color="white" />
          <Text className="text-base font-semibold text-white">
            {item.stars}
          </Text>
        </View>
        <View className="mx-4 flex-row justify-between items-center ">
          <Text style={{color: '#000000'}} className="text-2xl font-semibold">
            {item.name}
          </Text>
          <Text style={{color: '#000000'}} className="text-lg font-semibold">
            ${item.price}
          </Text>
        </View>
        <View className="mx-4 space-y-2">
          <Text style={{color: '#000000'}} className="text-lg font-bold">
            Coffee Size
          </Text>
          <View className="flex-row justify-between mt-2">
            <TouchableOpacity
              onPress={() => setSize('small')}
              style={{
                backgroundColor:
                  size == 'small' ? '#A17953' : 'rgba(0,0,0,0.07)',
              }}
              className="px-8 py-3 rounded-full">
              <Text
                className={size == 'small' ? 'text-white' : 'text-gray-700'}>
                Small
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSize('medium')}
              style={{
                backgroundColor:
                  size == 'medium' ? '#A17953' : 'rgba(0,0,0,0.07)',
              }}
              className="px-8 py-3 rounded-full">
              <Text
                className={size == 'medium' ? 'text-white' : 'text-gray-700'}>
                Medium
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSize('large')}
              style={{
                backgroundColor:
                  size == 'large' ? '#A17953' : 'rgba(0,0,0,0.07)',
              }}
              className="px-8 py-3 rounded-full">
              <Text
                className={size == 'large' ? 'text-white' : 'text-gray-700'}>
                Large
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mx-4 space-y-2 h-25">
          <Text style={{color: '#000000'}} className="text-lg font-bold">
            About
          </Text>
          <Text className="text-gray-600">{item.desc}</Text>
        </View>
        <View className="flex-row justify-between items-center mx-4 mb-2">
          <View className="flex-row items-center space-x-1">
            <Text className="text-base text-gray-700 font-sembold opacity-60">
              Volume
            </Text>
            <Text className="text-base text-black font-semibold">
              {item.volume}
            </Text>
          </View>
          <View className="flex-row items-center space-x-4 border-gray-500 border rounded-full p-1 px-4">
            <TouchableOpacity
              onPress={() => {
                setnumber(number!==0?number - 1:0);
              }}>
              <MinusIcon size={20} strokeWidth={4} color="#000000" />
            </TouchableOpacity>
            <Text style={{color: '#000000'}} className="font-extrabold">
              {number}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setnumber(number + 1);
              }}>
              <PlusIcon size={20} strokeWidth={4} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row justify-between mx-4 mb-1 mt-5">
          <TouchableOpacity className="p-4 rounded-full border border-gray-400">
            <ShoppingBagIcon size={25} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity
            className="p-4 rounded-full flex-1 ml-3 items-center justify-center"
            style={{backgroundColor: '#A17953'}}>
            <Text
              className="text-center text-base font-semibold"
              style={{color: 'white'}}>
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default ProductScreen