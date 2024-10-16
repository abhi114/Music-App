import { View, Text,Image, SafeAreaView, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import {coffe} from './Coffeeassets/coffe.png'
import { BellIcon, MagnifyingGlassIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CoffeeCard from './CoffeeCard';
const CoffeeHomePage = () => {
  const [category,setActiveCategory] = useState();
  const coffeeItems = [
    {
      id: 1,
      name: 'Black Coffee',
      price: '25.50',
      volume: '116 ml',
      stars: '4.6',
      image: require('./Coffeeassets/capp1.png'),
      desc: 'The taste of coffee can vary depending on factors such as the type of beans, roast, and brewing method.',
    },
    {
      id: 2,
      name: 'Cappuccino',
      price: '15.50',
      volume: '110 ml',
      stars: '4.3',
      image: require('./Coffeeassets/coffee1.png'),
      desc: 'The taste of coffee can vary depending on factors such as the type of beans, roast, and brewing method.',
    },
    {
      id: 3,
      name: 'Espresso',
      price: '20.00',
      volume: '80 ml',
      stars: '4.8',
      image: require('./Coffeeassets/capp3.png'),
      desc: 'A strong and rich coffee shot, known for its intense flavor and aroma.',
    },
    {
      id: 4,
      name: 'Latte',
      price: '18.00',
      volume: '200 ml',
      stars: '4.5',
      image: require('./Coffeeassets/capp2.png'),
      desc: 'A smooth blend of espresso and steamed milk, topped with a thin layer of foam.',
    },
    {
      id: 5,
      name: 'Mocha',
      price: '22.50',
      volume: '150 ml',
      stars: '4.7',
      image: require('./Coffeeassets/capp4.png'),
      desc: 'A delicious combination of espresso, chocolate, and steamed milk, topped with whipped cream.',
    },
  ];

  const categories = [
    {
      id: 1,
      title: 'Cappuccino',
    },
    {
      id: 2,
      title: 'Latte',
    },
    {
      id: 3,
      title: 'Espresso',
    },
    {
      id: 4,
      title: 'Mocha',
    },
    {
      id: 5,
      title: 'Americano',
    },
  ];

  return (
    <View className="flex-1 relative bg-white" style={{zIndex: 1}}>
      <Image
        source={require('./Coffeeassets/coffe.png')}
        className="w-full absolute -top-5 opacity-10"
        style={{height: 250}}
      />
      <SafeAreaView className="flex-1 mt-5">
        <View className="px-4 flex-row justify-between items-center">
          <Image
            source={require('./Coffeeassets/1.png')}
            className="h-9 w-9 rounded-full "
          />
          <View className="flex-row items-center space-x-2 ">
            <MapPinIcon size={25} color={'#ff0000'} />
            <Text className="text-base font-semibold">Lucknow,Gomti</Text>
          </View>
          <BellIcon size={27} color={'black'} />
        </View>
        <View className="mx-5 mt-14">
          <View className="flex-row justify-center items-center rounded-full p-1 bg-[#e6e6e6]">
            <TextInput
              placeholder="Search"
              className="p-4 flex-1 font-semibold text-gray-700"></TextInput>
            <TouchableOpacity
              className="rounded-full p-2"
              style={{backgroundColor: '#ff0000'}}>
              <MagnifyingGlassIcon size={25} strokeWidth={2} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="px-5 mt-6" style={{}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={item => item.id}
            className="overflow-visible"
            renderItem={({item}) => {
              let isActive = item.id == category;
              let activeTextClass = isActive ? 'text-white' : 'text-gray-700';
              return (
                <TouchableOpacity
                  onPress={() => setActiveCategory(item.id)}
                  style={{
                    backgroundColor: isActive ? '#ff0000' : 'rgba(0,0,0,0.07)',
                  }}
                  className="p-4 px-5 rounded-full mr-2 shadow">
                  <Text className={'font-semibold ' + activeTextClass}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        
          
          <Carousel
            containerCustomStyle={{overflow: 'visible',}}
            data={coffeeItems}
            renderItem={({item}) => <CoffeeCard item={item} />}
            firstItem={1}
            inactiveSlideOpacity={0.75}
            inactiveSlideScale={0.77}
            sliderWidth={400}
            itemWidth={260}
            slideStyle={{display: 'flex', alignItems: 'center'}}
            //loop={true}
            
          />
        
      </SafeAreaView>
    </View>
  );
}

export default CoffeeHomePage