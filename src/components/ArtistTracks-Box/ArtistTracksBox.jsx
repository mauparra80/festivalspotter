import './ArtistTracksBox.css'
import React, { useState, useEffect, useRef } from 'react'
import MobileArtistTracks from './MobileArtistTracks';

export default function ArtistTracksBox({tracks}) {

  // const [combinedArtistSongsList, setCombinedArtistSongsList] = useState(combineArtistRepeats(tracks));
  const combinedArtistSongsList = combineArtistRepeats(tracks);

  console.log("from inside artisttrackbox", combinedArtistSongsList);
  
  return (
    <>
      {combinedArtistSongsList && combinedArtistSongsList.map((artist) => (
        <MobileArtistTracks key={artist.artist} name={artist.artist} songs={artist.songs}/>
      ))}
    </>
  )
}

//takes the matched list and combines the songs with same artist into 1 object under the same artist
const combineArtistRepeats = (tracks) => {
  const combinedArtistSongs = [];
  const artistCheckList = [];

  tracks.forEach((track) => {
    if (!artistCheckList.includes(track.artist.name)) {
      //artist is not in list so add new artist
      combinedArtistSongs.push({
        artist: track.artist.name,
        songs: [track]
      })
      artistCheckList.push(track.artist.name);
    } else {
      //artist is already in list, so just add song.
      const artistEntry = combinedArtistSongs.find(entry => entry.artist === track.artist.name);
      if(artistEntry) {
        artistEntry.songs.push(track);
      }
    }
  })

  return combinedArtistSongs;
}