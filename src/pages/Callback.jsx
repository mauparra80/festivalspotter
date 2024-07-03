import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


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
    if (token) {
      setTokenUsed(true);
      console.log("routing to loading screen now. token from useeffect", token);
      navigate('/loading-songs', {state: { token }});
    }
  }, [token])

  return (
    <div>
      <h1>Loading</h1>
      <button onClick={() => addCounter()}>{repeatToken}</button>
    </div>
  );
}


