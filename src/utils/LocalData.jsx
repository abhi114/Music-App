import RNFS from 'react-native-fs';

const defaultArtist = {
  name: "Unknown Artist",
  bio: "No information available.",
  cover_uri: require('../assets/images/default_artwork.jpg'), // Placeholder image
};

const defaultArtwork = require('../assets/images/default_artwork.jpg'); // Placeholder image

export const fetchLocalTracks = async () => {
  try {
    // Scan the 'Music' directory for audio files
    const musicDir = `${RNFS.ExternalStorageDirectoryPath}/Download/`;
    console.log("directory is " + musicDir);
    const files = await RNFS.readDir(musicDir);
    console.log("Files found in directory:");
    files.forEach(file => {
      console.log(file.name); // Print each file name
    });
    // Filter for audio files based on extensions
    const audioFiles = files.filter(file =>
      file.isFile() &&
      (file.name.endsWith('.mp3') || file.name.endsWith('.wav'))
    );
    
    // Map audio files to trackData format
    const trackData = audioFiles.map((file, index) => ({
      id: index + 1, // Unique ID
      title: file.name.replace(/\.[^/.]+$/, ''), // Remove extension for title
      track_uri: `file://${file.path}`, // Local file URI
      artwork_uri: defaultArtwork, // Placeholder artwork
      lyricist: "Unknown Lyricist", // Placeholder lyricist
      video_uri: null, // Video not available
      artist: defaultArtist, // Default artist details
      category: "Uncategorized", // Placeholder category
      Type:"Local"
    }));

    return trackData;
  } catch (error) {
    console.error("Error fetching local tracks:", error);
    return [];
  }
};
