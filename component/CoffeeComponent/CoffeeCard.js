import {View, Image, Text} from 'react-native';
import React from 'react';
import { PlusIcon, StarIcon } from 'react-native-heroicons/solid';
import { TouchableOpacity } from 'react-native';

const CoffeeCard = ({item}) => {
  return (
    <View
      style={{
        borderRadius: 40,
        backgroundColor: '#824C1B',
        height: 350,
        width: 250,
        overflow: 'visible', // Ensures the image can overflow outside
        elevation:20
      }}
      className="overflow-y-visible mt-20">
      <View
        style={{
          shadowColor: 'black',
          shadowRadius: 40,
          shadowOffset: {width: 0, height: 40},
          shadowOpacity: 0.9,
          elevation:70,
          overflow: 'visible', // Allows the image to extend beyond the boundaries
        }}
        className="flex-row justify-center -mt-14">
        <Image source={item.image} className="h-40 w-40"  style={{elevation:10}}/>
      </View>
      <View className="px-5 mt-5 space-y-3">
        <Text className="text-2xl text-white font-semibold z-10">
          {item.name}
        </Text>
        <View
          style={{backgroundColor: 'rgba(255,255,255,0.2)'}}
          className="flex-row items-center rounded-3xl p-1 px-2 space-x-1 w-16">
          <StarIcon size={15} color="white" />
          <Text className="text-base font-semibold text-white">
            {item.stars}
          </Text>
        </View>
        <View className="flex-row space-x-1 z-10 mb-6">
          <Text className="text-base text-white font-semibold opacity-60">
            Volume
          </Text>
          <Text className="text-base text-white font-semibold">
            {item.volume}
          </Text>
        </View>
        <View
          style={{
            shadowColor: 'black',
            shadowRadius: 40,
            shadowOffset: {width: -10, height: -10},
            shadowOpacity: 1,
            elevation:10
          }}
          className="flex-row justify-between items-center ">
          <Text className="text-white font-bold text-lg ">$ {item.price}</Text>
          <TouchableOpacity
            style={{
              shadowColor: 'black',
              shadowRadius: 40,
              shadowOffset: {width: -10, height: -10},
              shadowOpacity: 1,
              elevation:10,
            }}
            className="p-4 bg-white rounded-full">
            <PlusIcon size={25} strokeWidth={2} color={'#824C1B'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CoffeeCard;
