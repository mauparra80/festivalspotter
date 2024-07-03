import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { filterTrackData, storeDataInIndexedDB } from '../../components/functions/indexedDBManager/indexedDBManager'
import LoadingVisual from "./LoadingVisual";

export default function LoadingSongs() {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  //setting token from callback
  useEffect(() => {
    if (location.state && location.state.token) {
      setToken(location.state.token);
    }
  }, [location.state]); 

  async function getTracks() {
    if (token) {
      let tracks = [];
      try {
        const [playlistTracks, savedTracks, albumTracks] = await Promise.all([
          fetchAllPlaylistTracks(token),
          fetchAllSavedTracks(token),
          fetchAllAlbumTracks(token),
        ])

        console.log("saved Tracks: ", savedTracks);
        console.log("Playlist Tracks: ", playlistTracks);
        console.log("album tracks: ", albumTracks);

        tracks.push(...savedTracks);
        tracks.push(...playlistTracks);
        tracks.push(...albumTracks);
        const uniqueTracks = removeDuplicates(tracks);
    
        //filter and store tracks
        let filteredTracks = uniqueTracks.map(filterTrackData);
        console.log("filtered tracks right before storing, ", filteredTracks);
        storeDataInIndexedDB(filteredTracks);

        //go to Main page
        navigate('/');

      } catch (error) {
        console.error("Error fetching tracks: ", error);
      }

      
    }
  }
  getTracks();

  return (
    <>
      <LoadingVisual />
    </>
  )
}




async function fetchAllSavedTracks(token) {
  let url = "https://api.spotify.com/v1/me/tracks?limit=50";
  const tracks = [];

  try {
    // const response = await fetch(url, {
    //   method: 'GET',
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json'
    //   }
    // });
    // const data = await response.json();
    // tracks.push(...data.items);

    while (url) {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      tracks.push(...data.items);
      url = data.next;
    }
    
  } catch (error) {
    console.log("Error fetching tracks: ", error);
    return null;
  } 

  console.log("tracks inside fetchtracks", tracks);
  return formatTracks(tracks);
}

async function fetchAllAlbumTracks(token) {
  let url = "https://api.spotify.com/v1/me/albums?limit=50"
  let albumTracks = []

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    data.items.forEach((album) => {
      albumTracks.push(...album.album.tracks.items);
    })

  } catch (error) {
    console.error("Error fetching tracks: ", error);
  }

  console.log("the album tracks are: ", albumTracks);
  return albumTracks;
}

async function fetchAllPlaylistTracks(token) {
  let url = "https://api.spotify.com/v1/me/playlists?limit=50"
  let allPlaylistTracks = []

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();

    for (const playlist of data.items) {
      // playlistTracks.push(...data.album.tracks.items);
      if(playlist.tracks) {
        const playListTracks = await fetchPlaylistTracks(token, playlist);
        allPlaylistTracks.push(...playListTracks);
      }
    }

  } catch (error) {
    console.error("Error fetching tracks: ", error);
  }

  return formatTracks(allPlaylistTracks);
}

async function fetchPlaylistTracks(token, playlist) {
  let url = playlist.tracks.href
  let playlistTracks = []

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    playlistTracks = data.items;

  } catch (error) {
    console.error("Error fetching Individual Playlist tracks: ", error);
  }

  return playlistTracks;
}

const formatTracks = (tracks) => {
  const formattedTracks = tracks.map(track => {
    if (track.track) {
      return track.track
    }
  })
  return formattedTracks;
}

//format tracks and then remove duplicates
const removeDuplicates = (tracks) => {
  const seen = new Set();
  return tracks.filter(track => {
    if (seen.has(track.id)) {
      return false;
    } else {
      seen.add(track.id);
      return true;
    }
  });
};