import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FC } from "react";
import HomeScreen from "../home/HomeScreen";
import SearchScreen from "../search/SearchScreen";
import LibraryScreen from "../library/LibraryScreen";
import CustomTabBar from "./CustomTabBar";
import React from "react";
import ChatScreen from "../Chat/ChatScreen";

const Tab = createBottomTabNavigator()

const UserBottomTab:FC = () => {
    return (
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={() => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Library" component={LibraryScreen} />
        <Tab.Screen name="ChatScreen" component={ChatScreen} />
      </Tab.Navigator>
    );
}
export default UserBottomTab