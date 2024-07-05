//takes database element with tracks and festival Artist element with array of artist strings. returns matched list of track objects. 

export default function crossReference(tracks, festivalArtists) {
  const matchedTracks = [];
  const lowerCaseFestivalArtists = [];
  festivalArtists.forEach((artist) => {
    lowerCaseFestivalArtists.push(artist.toLowerCase());
  });

  console.log("Tracks inside crossref: ", tracks);
  tracks.forEach(track => {

    //check if artist exists in ACLData
    if (track.artist) {
      const trackArtist = track.artist.name.toLowerCase();
      
      if (lowerCaseFestivalArtists.includes(trackArtist)) {
        matchedTracks.push(track);
      }
      
    }
    
  });
  console.log('here are matchedTracks from inside function', matchedTracks);
  return matchedTracks;
}