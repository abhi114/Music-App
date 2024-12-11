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
     TrackPlayer.addEventListener(Event.RemoteNext,async ()=>{
      await usePlayerStore.getState().next();
     })
     TrackPlayer.addEventListener(Event.RemotePrevious,async ()=>{
      await usePlayerStore.getState().previous();
     })
     TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged,async (e)=>{ //for when the songs moves to next after completion so that ui can be updated
      const currentTrack = usePlayerStore.getState().currentPlayingTrack
      if(e?.track?.id == undefined || currentTrack?.id == e?.track?.id){
         return
      }
      const allTracks = usePlayerStore.getState().allTracks;
      const track = allTracks.find((item)=>item.id == e?.track?.id) as any
      usePlayerStore?.getState().setCurrentTrack(track);


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