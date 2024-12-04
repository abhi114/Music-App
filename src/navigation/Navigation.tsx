import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../utils/NavigationUtils';
import SplashScreen from '../Features/auth/SplashScreen';
import MoodScanner from '../Features/moodscanner/MoodScanner';
import UserBottomTab from '../Features/tabs/UserBottomTab';
import SharedTransition from '../Features/tabs/SharedTransition';


const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown:false,animation:'fade'}}>
            <Stack.Screen name='SplashScreen' component={SplashScreen} />
            <Stack.Screen name='MoodScanner' component={MoodScanner} />
            <Stack.Screen name='UserBottomTab' component={SharedTransition}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation