import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { BOTTOM_TAB_HEIGHT } from "../../utils/Constants";
import { screenHeight } from "../../utils/Scaling";
import { createContext, ReactNode, useContext } from "react";

interface ShareStateContextType{
    translationY:Animated.SharedValue<number>
    expandPlayer:()=>void;
    collapsePlayer:()=>void;
}

const MIN_PLAYER_HEIGHT = BOTTOM_TAB_HEIGHT + 60;
const MAX_PLAYER_HEIGHT = screenHeight;


const SharedContext = createContext<ShareStateContextType|undefined>(undefined)

export const SharedStateProvider: React.FC<{children:ReactNode}>=({children}) =>{
    const translationY = useSharedValue(0); //it runs on ui thread
    const expandPlayer = ()=>{
        translationY.value = withTiming(-MAX_PLAYER_HEIGHT+MIN_PLAYER_HEIGHT,{duration:300})
    } 
    const collapsePlayer = ()=>{
        translationY.value = withTiming(0,{duration:300})
    }
    return (
        <SharedContext.Provider value={{translationY,expandPlayer,collapsePlayer}}>
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