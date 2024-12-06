import { MMKV } from 'react-native-mmkv';
import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import { mmkvStorage } from './storage';
import { trackData } from '../utils/dummyData';
interface Track {
    id:any;
    track_uri:string;
    video_uri?:string;
    title:string;
    lyricist:string;
    artist:any;
    artwork_uri:any;
    category:string;
}

interface PlayerStore{
    currentPlayingTrack:Track | null;
    allTracks:Track[];
    isShuffling:boolean;
    clear:()=>void;
    isRepeating:boolean;
    setCurrentPlayingTrack:(track:Track)=>Promise<void>;
    setCurrentTrack:(track:Track)=>Promise<void>;
    play:()=>Promise<void>;
    pause:()=>Promise<void>;
    next:()=>Promise<void>;
    previous:()=>Promise<void>;
    toggleShuffle:()=>Promise<void>;
    toggleRepeat:()=>Promise<void>;

}


export const usePlayerStore =create<PlayerStore>()(
    persist(
        (set,get)=>({
                currentPlayingTrack:null,
                allTracks:trackData,
                isShuffling:false,
                isRepeating:false,
                clear:()=>{
                    set({currentPlayingTrack:null})
                }
        }),
        {
            name:'player-storage',
            storage:createJSONStorage(()=>mmkvStorage)
        }
    )
)