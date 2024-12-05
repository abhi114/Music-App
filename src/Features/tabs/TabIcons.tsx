import HomeFocused from '../../assets/icons/home_focused.png'
import SearchFocused from '../../assets/icons/search_focused.png'
import LibraryFocused from '../../assets/icons/library_focused.png'
import { RFValue } from "react-native-responsive-fontsize";

import Home from '../../assets/icons/home.png'
import Search from '../../assets/icons/search.png'
import Library from '../../assets/icons/library.png'
import { Image, ImageStyle, TextStyle, View, ViewStyle } from 'react-native'
import { Colors } from '../../utils/Constants';
import { fontR } from '../../utils/Scaling';
import { FC } from 'react';

interface TabProps{
    name:string;
}

interface IconProp{
    focused:boolean;
}

const styles:ImageStyle={
    width:RFValue(20),
    height:RFValue(18),
}

const tabStyles:ViewStyle={
    justifyContent:'center',
    alignItems:'center',
    padding:5
}
const textStyleInactive:TextStyle={
    textAlign:'center',
    marginTop:4,
    color:Colors.inactive,
    fontSize:fontR(9.5)
}

const textStyleActive:TextStyle={
    textAlign:'center',
    marginTop:4,
    color:Colors.text,
    fontSize:fontR(9.5)
}

const TabIcon:FC<TabProps>=({name})=>{
    return(
        <View style={tabStyles}>
             <Image source={name==='Home'?Home:name==="Search"?Search:Library} style={[styles]}/>
             
        </View>
    )
}

const TabIconFocused:FC<TabProps>=({name})=>{
    return(
        <View style={tabStyles}>
             <Image source={name==='Home'?HomeFocused:name==="Search"?SearchFocused:LibraryFocused} style={[styles]}/>
             
        </View>
    )
}

export const HomeTabIcon:FC<IconProp>=({focused})=>{
    return focused ?<TabIconFocused name='Home'/>:<TabIcon name='Home'/>
}

export const LibraryTabIcon:FC<IconProp>=({focused})=>{
    return focused ?<TabIconFocused name='Library'/>:<TabIcon name='Library'/>
}

export const SearchTabIcon:FC<IconProp>=({focused})=>{
    return focused ?<TabIconFocused name='Search'/>:<TabIcon name='Search'/>
}