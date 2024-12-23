import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { BOTTOM_TAB_HEIGHT } from "../../utils/Constants";
import { screenHeight } from "../../utils/Scaling";
import { createContext, ReactNode, useContext, useState } from "react";

interface ShareStateContextType{
    translationY:Animated.SharedValue<number>
    isScroll:Animated.SharedValue<boolean>
    isExpanded:Animated.SharedValue<boolean>
    expandPlayer:()=>void;
    collapsePlayer:()=>void;
    ScrollingEnabled:boolean;
   setScrollingEnabled :React.Dispatch<React.SetStateAction<boolean>>;
   expanded:boolean;
   setExpanded:React.Dispatch<React.SetStateAction<boolean>>;
}

const MIN_PLAYER_HEIGHT = BOTTOM_TAB_HEIGHT + 60;
const MAX_PLAYER_HEIGHT = screenHeight;


const SharedContext = createContext<ShareStateContextType|undefined>(undefined)

export const SharedStateProvider: React.FC<{children:ReactNode}>=({children}) =>{
    const translationY = useSharedValue(0); //it runs on ui thread
    const isScroll = useSharedValue(false);
    const isExpanded = useSharedValue(false);
    const [ScrollingEnabled,setScrollingEnabled] = useState(false);
    const [expanded,setExpanded] = useState(false);
    const expandPlayer = ()=>{
        translationY.value = withTiming(-MAX_PLAYER_HEIGHT+MIN_PLAYER_HEIGHT,{duration:300})
        isScroll.value = true;
        isExpanded.value =true;
        setScrollingEnabled(true);
    } 
    const collapsePlayer = ()=>{
        translationY.value = withTiming(0,{duration:300})
        isScroll.value = false;
        isExpanded.value = false;
        setScrollingEnabled(false);
    }
    return (
        <SharedContext.Provider value={{translationY,expandPlayer,collapsePlayer,isScroll,isExpanded,ScrollingEnabled,setScrollingEnabled,expanded,setExpanded}}>
            {children}
        </SharedContext.Provider>
    )
}

export const useSharedState = ()=>{
    const context  = useContext(SharedContext);
    if(context === undefined){
        throw new Error("useSharedState must be used within a Shared State Provider")
    }
    return context;
}