import { MMKV } from 'react-native-mmkv';
import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import { mmkvStorage } from './storage';
import { trackData } from '../utils/dummyData';
import TrackPlayer, { RepeatMode } from 'react-native-track-player';
import { convertTrack } from '../utils/Constants';
import { fetchLocalTracks } from '../utils/LocalData';
interface Track {
  id: any;
  track_uri: any;
  video_uri?: any;
  title: any;
  lyricist: any;
  artist: any;
  artwork_uri: any;
  category: any;
  Type:any;
}

interface PlayerStore{
    currentPlayingTrack:Track | null;
    allTracks:Track[];
    localTracks:Track[];
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
    fetchAndAppendLocalTracks:()=>Promise<void>;
}


export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      currentPlayingTrack: null,
      allTracks: trackData,
      localTracks:[],
      isShuffling: false,
      isRepeating: false,
      clear: () => {
        set({currentPlayingTrack: null});
      },
      setCurrentTrack: async (track: Track) => {
        set({currentPlayingTrack: track});
      },
      setCurrentPlayingTrack: async (track: Track) => {
        const {allTracks,localTracks} = get();
        await TrackPlayer.reset();
        set({currentPlayingTrack: track});
        const currentTrackConverted = convertTrack(track); // it converts the object given by our object specs to the background track player
        let MainTrack = [];
        if (track?.Type == 'dummy') {
          MainTrack = allTracks;
        } else {
          MainTrack = localTracks;
        }
        const otherTracks = MainTrack.filter(t => t.id !== track?.id).map(t =>
          convertTrack(t),
        );
        await TrackPlayer.add([currentTrackConverted, ...otherTracks]);
        await TrackPlayer.play();
      },
      play: async () => {
        const {currentPlayingTrack, allTracks,localTracks} = get();
        const activeTrack = await TrackPlayer.getActiveTrack();
        if (activeTrack) {
          await TrackPlayer.play();
        } else {
          let MainTrack = [];
          if (currentPlayingTrack?.Type == 'dummy') {
            MainTrack = allTracks;
          } else {
            MainTrack = localTracks;
          }
          await TrackPlayer.reset();
          const currentTrackConverted = convertTrack(currentPlayingTrack); // it converts the object given by our object specs to the background track player
          const otherTracks = MainTrack.filter(
            t => t.id !== currentPlayingTrack?.id,
          ).map(t => convertTrack(t));
          await TrackPlayer.add([currentTrackConverted, ...otherTracks]);
          await TrackPlayer.play();
        }
      },
      pause: async () => {
        TrackPlayer.pause();
      },
      next: async () => {
        const {currentPlayingTrack, allTracks, isRepeating,localTracks} = get();
        console.log(currentPlayingTrack?.Type);
        let MainTrack = [];
        if(currentPlayingTrack?.Type =='dummy'){
          MainTrack = allTracks;
        }else{
          MainTrack = localTracks;
        }
        
       
        await TrackPlayer.reset();
        if (isRepeating) {
          await TrackPlayer.add([convertTrack(currentPlayingTrack)]);
          await TrackPlayer.play();
          return;
        }
        const currentIndex = MainTrack?.findIndex(
          track => track.title === currentPlayingTrack?.title,
        );
        let nextindex = (currentIndex + 1) % MainTrack?.length; // it will check that in the end if it plays next on the last song then it should go back to the first song
        if (MainTrack.length == 1) {
          nextindex = currentIndex;
        }
        const nextTrack = MainTrack[nextindex];
        if (nextTrack) {
          set({currentPlayingTrack: nextTrack});
          const otherTracks = MainTrack.filter(t => t.id !== nextTrack?.id).map(
            t => convertTrack(t),
          );
          await TrackPlayer.add([convertTrack(nextTrack), ...otherTracks]);
          await TrackPlayer.play();
        }
      },

      previous: async () => {
        const {currentPlayingTrack, allTracks, isRepeating,localTracks} = get();
        await TrackPlayer.reset();
        if (isRepeating) {
          await TrackPlayer.add([convertTrack(currentPlayingTrack)]);
          await TrackPlayer.play();
          return;
        }
        let MainTrack = [];
        if (currentPlayingTrack?.Type == 'dummy') {
          MainTrack = allTracks;
        } else {
          MainTrack = localTracks;
        }
        const currentIndex = MainTrack?.findIndex(
          track => track.id === currentPlayingTrack?.id,
        );
        let prevIndex =
          (currentIndex - 1 + MainTrack?.length) % MainTrack?.length; // it will check that in the end if it plays next on the last song then it should go back to the first song

        const prevTrack = MainTrack[prevIndex];
        if (prevTrack) {
          set({currentPlayingTrack: prevTrack});
          const otherTracks = MainTrack.filter(t => t.id !== prevTrack?.id).map(
            t => convertTrack(t),
          );
          await TrackPlayer.add([convertTrack(prevTrack), ...otherTracks]);
          await TrackPlayer.play();
        }
      },
      toggleRepeat: async () => {
        const {currentPlayingTrack} = get();
        await TrackPlayer.reset();
        await TrackPlayer.add([convertTrack(currentPlayingTrack)]);
        await TrackPlayer.setRepeatMode(RepeatMode.Track);
        await TrackPlayer.play();
        set({isRepeating: true});
        set({isShuffling: false});
      },
      toggleShuffle: async () => {
        const {currentPlayingTrack, allTracks,localTracks} = get();
        await TrackPlayer.reset();
        let MainTrack = [];
        if (currentPlayingTrack?.Type == 'dummy') {
          MainTrack = allTracks;
        } else {
          MainTrack = localTracks;
        }
        const otherTracks = MainTrack.filter(
          t => t.id !== currentPlayingTrack?.id,
        ).map(t => convertTrack(t));
        await TrackPlayer.add([
          convertTrack(currentPlayingTrack),
          ...otherTracks,
        ]);
        await TrackPlayer.play();
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
        await TrackPlayer.play();
        set({isRepeating: false});
        set({isShuffling: true});
      },
      fetchAndAppendLocalTracks: async () => {
        try {
          const localTracks = await fetchLocalTracks(); // Fetch tracks from the device
          const placeholderTrack = {
            id: -1,
            title: 'Unknown Track',
            track_uri: null,
            artwork_uri: null,
            lyricist: 'Unknown',
            video_uri: null,
            artist: {
              name: 'Unknown Artist',
              bio: 'No information available.',
              cover_uri: null,
            },
            category: 'Uncategorized',
          };

          // Map fetched tracks to expected format, using placeholders for missing fields
          const formattedTracks = localTracks.map((track, index) => ({
            id: track.id || Date.now() + index, // Ensure unique IDs
            title: track.title || placeholderTrack.title,
            track_uri: track.track_uri || placeholderTrack.track_uri,
            artwork_uri: track.artwork_uri || placeholderTrack.artwork_uri,
            lyricist: track.lyricist || placeholderTrack.lyricist,
            video_uri: track.video_uri || placeholderTrack.video_uri,
            artist: track.artist || placeholderTrack.artist,
            category: track.category || placeholderTrack.category,
            Type:"Local"
          }));

          // Append the new tracks to the existing allTracks array
          set(state => ({
            localTracks: [...formattedTracks],
          }));
        } catch (error) {
          console.error('Error fetching local tracks:', error);
        }
      },
    }),
    {
      name: 'player-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);