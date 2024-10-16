import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import CoffeeHomePage from '../component/CoffeeComponent/CoffeeHomePage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlusIcon, StarIcon } from 'react-native-heroicons/solid';

import {HomeIcon as HomeOutline,HeartIcon as HeartOutline,ShoppingBagIcon as BagOutline} from 'react-native-heroicons/outline'
import {HomeIcon as HomeSolid,HeartIcon as HeartSolid,ShoppingBagIcon as BagSolid} from 'react-native-heroicons/solid'
import ProductScreen from '../component/CoffeeComponent/ProductScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{contentStyle: {backgroundColor: 'white'}}}>
        <Stack.Screen
          name="CoffeeHome"
          options={{headerShown: false}}
          component={HomeTabs}
        />
        <Stack.Screen
          name="ProductScreen"
          options={{headerShown: false}}
          component={ProductScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeTabs(){
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon:({focused,color,size})=>menuIcons(route,focused),
          tabBarStyle: {
            height:65,
            marginBottom: 10,
            borderRadius: 50,
            backgroundColor: '#96724D',
            marginHorizontal:20
          },
          tabBarItemStyle:{
            
          }
        })}>
        <Tab.Screen name="home" component={CoffeeHomePage} />
        <Tab.Screen name="Favourite" component={CoffeeHomePage} />
        <Tab.Screen name="Cart" component={CoffeeHomePage} />
      </Tab.Navigator>
    );
}
const menuIcons = (route,focused)=>{
    let icon;
    if(route.name == 'home'){
        icon = focused ? (
          <HomeSolid size="30" color="#96724D" />
        ) : (
          <HomeOutline size="30" strokeWidth={2} color="white" />
        );
    }else if(route.name == 'Favourite'){
        icon = focused ? (
          <HeartSolid size="30" color="#96724D" />
        ) : (
          <HeartOutline size="30" strokeWidth={2} color="white" />
        );

    }else if(route.name == 'Cart'){icon = focused ? (
      <BagSolid size="30" color="#96724D" />
    ) : (
      <BagOutline size="30" strokeWidth={2} color="white" />
    );
        
    }
    let buttonClass = focused?'bg-white':'';
    return (
      <View
    className={"flex items-center rounded-full p-2 shadow " + buttonClass}>
        {icon}
      </View>
    );
}
export default AppNavigation