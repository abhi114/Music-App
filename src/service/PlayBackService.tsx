import TrackPlayer,{Event,Capability} from 'react-native-track-player'
import { usePlayerStore } from '../state/UsePlayerStore'
export const PlayBackService = async()=>{
     TrackPlayer.addEventListener(Event.RemotePlay,()=>{
        TrackPlayer.play()
     })
      TrackPlayer.addEventListener(Event.RemotePause,()=>{
        TrackPlayer.pause()
     })
     TrackPlayer.addEventListener(Event.RemoteStop,()=>{
        TrackPlayer.stop(),
        usePlayerStore.getState().clear()
     })
     await TrackPlayer.setupPlayer()
     await TrackPlayer.updateOptions({
        capabilities:[
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop
        ],
        compactCapabilities:[Capability.Play,Capability.Pause]
     })
}