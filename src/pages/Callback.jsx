import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { filterTrackData, storeDataInIndexedDB } from '../components/functions/indexedDBManager/indexedDBManager'

export default function Callback() {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [tokenUsed, setTokenUsed] = useState(false);
  
  //exchange code for token when we load. 
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log(params);
    const code = params.get('code');
    const verifier = localStorage.getItem('verifier');
    console.log(code);
    console.log(verifier);
    // const verifier = localStorage.getItem('verifier'); 

    if (code && verifier && !tokenUsed) {
      fetch(`/.netlify/functions/getToken?code=${code}&verifier=${verifier}`)
        .then(response => response.json())
        .then(data => {
          // Handle tokens (save to state, local storage, etc.)
          console.log(data);
          sessionStorage.setItem('token', data.access_token)
          setToken(data.access_token);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [location]);

  //when we have token, fetch track data. 
  useEffect(() => {
    console.log("token from useeffect", token);
    async function getTracks() {
      if (token) {
        //get token
        const tracks = await fetchAllSavedTracks(token);
        setTokenUsed(true);
        console.log("tracks from callback",tracks);
    
        //filter and store tracks
        let filteredTracks = tracks.map(filterTrackData);

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
    </div>
  );
}

async function fetchAllSavedTracks(token) {
  let url = "https://api.spotify.com/v1/me/tracks?limit=50";
  const tracks = [];

  try {
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
  return tracks;
}