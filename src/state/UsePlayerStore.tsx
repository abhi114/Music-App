import { MMKV } from 'react-native-mmkv';
import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import { mmkvStorage } from './storage';
import { trackData } from '../utils/dummyData';
import TrackPlayer, { RepeatMode } from 'react-native-track-player';
import { convertTrack } from '../utils/Constants';
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
                },
                setCurrentTrack: async (track:Track)=>{
                    set({currentPlayingTrack:track})
                },
                setCurrentPlayingTrack:async (track:Track)=>{
                    const {allTracks} =get()
                    await TrackPlayer.reset();
                    set({currentPlayingTrack:track})
                    const currentTrackConverted = convertTrack(track)   // it converts the object given by our object specs to the background track player
                    const otherTracks = allTracks.filter(t=>t.id !== track?.id).map(t=>convertTrack(t))
                    await TrackPlayer.add([currentTrackConverted,...otherTracks])
                    await TrackPlayer.play()

                },
                play:async ()=>{
                    const {currentPlayingTrack,allTracks}= get()
                    const activeTrack = await TrackPlayer.getActiveTrack();
                    if(activeTrack){
                        await TrackPlayer.play()
                    }else{
                        await TrackPlayer.reset()
                         const currentTrackConverted = convertTrack(currentPlayingTrack)   // it converts the object given by our object specs to the background track player
                        const otherTracks = allTracks.filter(t=>t.id !== currentPlayingTrack?.id).map(t=>convertTrack(t))
                        await TrackPlayer.add([currentTrackConverted,...otherTracks])
                        await TrackPlayer.play()
                    }
                },
                pause:async ()=>{
                    TrackPlayer.pause();
                },
                next:async ()=>{
                    const {currentPlayingTrack,allTracks,isRepeating}= get()
                    await TrackPlayer.reset();
                    if(isRepeating){
                        await TrackPlayer.add([convertTrack(currentPlayingTrack)])
                        await TrackPlayer.play()
                        return
                    }
                    const currentIndex = allTracks?.findIndex(track=>track.id === currentPlayingTrack?.id)
                    let nextindex = (currentIndex+1) % allTracks?.length // it will check that in the end if it plays next on the last song then it should go back to the first song
                    if(allTracks.length == 1){
                        nextindex = currentIndex;
                    }
                    const nextTrack = allTracks[nextindex]
                    if(nextTrack){
                        set({currentPlayingTrack:nextTrack})
                         const otherTracks = allTracks.filter(t=>t.id !== nextTrack?.id).map(t=>convertTrack(t))
                        await TrackPlayer.add([convertTrack(nextTrack),...otherTracks])
                        await TrackPlayer.play()
                        
                    }
                },

                 previous:async ()=>{
                    const {currentPlayingTrack,allTracks,isRepeating}= get()
                    await TrackPlayer.reset();
                    if(isRepeating){
                        await TrackPlayer.add([convertTrack(currentPlayingTrack)])
                        await TrackPlayer.play()
                        return
                    }
                    const currentIndex = allTracks?.findIndex(track=>track.id === currentPlayingTrack?.id)
                    let prevIndex = (currentIndex-1 + allTracks?.length) % allTracks?.length // it will check that in the end if it plays next on the last song then it should go back to the first song
                    

                    const prevTrack = allTracks[prevIndex]
                    if(prevTrack){
                        set({currentPlayingTrack:prevTrack})
                         const otherTracks = allTracks.filter(t=>t.id !== prevTrack?.id).map(t=>convertTrack(t))
                        await TrackPlayer.add([convertTrack(prevTrack),...otherTracks])
                        await TrackPlayer.play()
                        
                    }
                },
                toggleRepeat:async()=>{
                    const {currentPlayingTrack} = get();
                    await TrackPlayer.reset()
                    await TrackPlayer.add([convertTrack(currentPlayingTrack)]);
                    await TrackPlayer.setRepeatMode(RepeatMode.Track)
                    await TrackPlayer.play();
                    set({isRepeating:true})
                    set({isShuffling:false})
                },
                toggleShuffle:async()=>{
                     const {currentPlayingTrack,allTracks} = get();
                    await TrackPlayer.reset()
                     const otherTracks = allTracks.filter(t=>t.id !== currentPlayingTrack?.id).map(t=>convertTrack(t))
                    await TrackPlayer.add([convertTrack(currentPlayingTrack),...otherTracks])
                    await TrackPlayer.play()
                    await TrackPlayer.setRepeatMode(RepeatMode.Off)
                    await TrackPlayer.play();
                    set({isRepeating:false});
                    set({isShuffling:true})
                    
                },
        }),
        {
            name:'player-storage',
            storage:createJSONStorage(()=>mmkvStorage)
        }
    )
)