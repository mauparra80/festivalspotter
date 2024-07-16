import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingVisual from './LoadingSongs/LoadingVisual';

export default function Callback() {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [tokenUsed, setTokenUsed] = useState(false);

  // Exchange code for token when we load.
  useEffect(() => {
    // Async function to get the token
    const getToken = async (code, verifier) => {
      try {
        // Fetching token using code and verifier
        const response = await fetch(`/.netlify/functions/getToken?code=${code}&verifier=${verifier}`);
        const data = await response.json();
        // Storing the token in sessionStorage and setting it in state
        sessionStorage.setItem('token', data.access_token);
        setToken(data.access_token);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Extracting code and verifier from URL and storage
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    let verifier = localStorage.getItem('verifier') || sessionStorage.getItem('verifier');

    // Calling getToken only if code, verifier are present and token hasn't been used yet
    if (code && verifier && !tokenUsed) {
      getToken(code, verifier);
    }
  }, [location, tokenUsed]); // Depend on location and tokenUsed to avoid redundant calls


  
  // //exchange code for token when we load. 
  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const code = params.get('code');
  //   let verifier = localStorage.getItem('verifier');
  //   if (!verifier) {
  //     verifier = sessionStorage.getItem('verifier');
  //   }
  //   console.log(code);
  //   console.log(verifier);
  //   // const verifier = localStorage.getItem('verifier'); 

  //   if (code && verifier && !tokenUsed) {
  //     console.log("calling getToken now");
  //     fetch(`/.netlify/functions/getToken?code=${code}&verifier=${verifier}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         // Handle tokens (save to state, local storage, etc.)
  //         sessionStorage.setItem('token', data.access_token)
  //         setToken(data.access_token);
  //       })
  //       .catch(error => {
  //         console.error('Error:', error);
  //       });
  //   }
  // }, [location, repeatToken]);

  //when we have token, fetch track data. 
  useEffect(() => {
    if (token) {
      setTokenUsed(true);
      navigate('/loading-songs', {state: { token }});
    }
  }, [token])

  return (
    <div>
      <LoadingVisual/>
    </div>
  );
}


