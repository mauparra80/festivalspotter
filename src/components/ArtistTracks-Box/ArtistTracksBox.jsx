import './ArtistTracksBox.css'
import React, { useState, useEffect, useRef } from 'react'
import MobileArtistTracks from './MobileArtistTracks';

export default function ArtistTracksBox({tracks, festivalData}) {

  // const [combinedArtistSongsList, setCombinedArtistSongsList] = useState(combineArtistRepeats(tracks));
  const combinedArtistSongsList = combineArtistRepeats(tracks, festivalData);

  console.log("from inside artisttrackbox", combinedArtistSongsList);
  
  return (
    <>
      {combinedArtistSongsList && combinedArtistSongsList.map((artist, index) => (
        <MobileArtistTracks key={artist.artist.link} artist={artist} index={index}/>
      ))}
    </>
  )
}

//takes the matched list and combines the songs with same artist into 1 object under the same artist
const combineArtistRepeats = (tracks, festivalData) => {
  const combinedArtistSongs = [];
  const artistCheckList = new Set();

  tracks.forEach((track) => {
    if (!artistCheckList.has(track.artist.name)) {
      //artist is not in list so add new artist

      //find artist in festivalData and extract img
      const festivalPerformer = festivalData.performer.find(p => p.name === track.artist.name);

      combinedArtistSongs.push({
        artist: {
          name: track.artist.name,
          link: track.artist.link,
          image: festivalPerformer.image,
        },
        songs: [track]
      })
      artistCheckList.add(track.artist.name);
    } else {
      //artist is already in list, so just add song.
      const artistEntry = combinedArtistSongs.find(entry => entry.artist.name === track.artist.name);
      if(artistEntry) {
        artistEntry.songs.push(track);
      }
    }
  })


  return sortTracks(combinedArtistSongs);
}

//orders tracks by most tracks to least
const sortTracks = (combinedArtistSongs) => {
  let i, j, max;

  for (i = 0; i < combinedArtistSongs.length - 1; i++) {
    max = i;
    for (j = i + 1; j < combinedArtistSongs.length; j++) {
      if (combinedArtistSongs[j].songs.length > combinedArtistSongs[i].songs.length) {
        max = j;
        let temp = combinedArtistSongs[i]
        combinedArtistSongs[i] = combinedArtistSongs[max];
        combinedArtistSongs[max] = temp
      }
    }
  }

  return combinedArtistSongs;
}