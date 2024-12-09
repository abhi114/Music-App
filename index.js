/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import { PlayBackService } from './src/service/PlayBackService';

TrackPlayer.registerPlaybackService(()=>PlayBackService)
AppRegistry.registerComponent(appName, () => App);
