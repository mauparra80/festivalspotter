import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { filterTrackData, storeDataInIndexedDB } from '../components/functions/indexedDBManager/indexedDBManager'

export default function Callback() {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [tokenUsed, setTokenUsed] = useState(false);
  const [repeatToken, setRepeatToken] = useState(0);

  const addCounter = () => {
    setRepeatToken(repeatToken + 1);
    console.log("button clicked", repeatToken);
  }
  
  //exchange code for token when we load. 
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log(params);
    const code = params.get('code');
    let verifier = localStorage.getItem('verifier');
    if (!verifier) {
      verifier = sessionStorage.getItem('verifier');
    }
    console.log(code);
    console.log(verifier);
    // const verifier = localStorage.getItem('verifier'); 

    if (code && verifier && !tokenUsed) {
      console.log("calling getToken now");
      fetch(`/.netlify/functions/getToken?code=${code}&verifier=${verifier}`)
        .then(response => response.json())
        .then(data => {
          // Handle tokens (save to state, local storage, etc.)
          console.log(data);
          console.log("data.token", data.access_token);
          sessionStorage.setItem('token', data.access_token)
          setToken(data.access_token);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [location, repeatToken]);

  //when we have token, fetch track data. 
  useEffect(() => {
    console.log("token from useeffect", token);
    async function getTracks() {
      if (token) {
        //get token
        console.log("token exists so fetching all saved tracks now");
        const tracks = await fetchAllSavedTracks(token);
        const allAlbumTracks = await fetchAllAlbumTracks(token);
        const allPlaylistTracks = await fetchAllPlaylistTracks(token);
        console.log("Playlist Tracks: ", allPlaylistTracks);
        console.log("album tracks: ", allAlbumTracks);
        tracks.push(...allPlaylistTracks);
        tracks.push(...allAlbumTracks)
        const uniqueTracks = removeDuplicates(tracks);

        setTokenUsed(true);
        console.log("tracks from callback",uniqueTracks);
    
        //filter and store tracks
        let filteredTracks = uniqueTracks.map(filterTrackData);

        storeDataInIndexedDB(filteredTracks);

        //go to Main page
        navigate('/');
      }
    }
    getTracks();
  }, [token])

  return (
    <div>
      <h1>Loading</h1>
      <button onClick={() => addCounter()}>{repeatToken}</button>
    </div>
  );
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
  console.log("unformatted tracks:", tracks);

  const formattedTracks = tracks.map(track => {
    if (track.track) {
      return track.track
    }
  })
  console.log("formatted tracks",formattedTracks);
  return formattedTracks;
}

//format tracks and then remove duplicates
const removeDuplicates = (tracks) => {
  let count = 0;
  

  const seen = new Set();
  return tracks.filter(track => {
    count++;
    console.log(count);
    if (seen.has(track.id)) {
      return false;
    } else {
      seen.add(track.id);
      return true;
    }
  });
};
