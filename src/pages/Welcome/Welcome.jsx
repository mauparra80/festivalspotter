import React, {useEffect, useState} from "react";
import { checkIndexedDBExists, getAllTracks, getACLData } from "../../components/indexedDBManager";
import crossReference from "../../components/functions/crossReference";

/*
TODO: 
1. create spacial layout
- then create simple festival name
2. sort matched songs by most popular artist to least popular artist. 
 */

export default function Welcome() {
  const [dbExists, setDbExists] = useState(null);
  const [matchedTracks, setMatchedTracks] = useState([]);
  console.log('test', dbExists);


  if (dbExists === true) {
     getAllTracks((tracks) => {
      console.log('here are the tracks',tracks)
      setMatchedTracks(crossReference(tracks, getACLData())) ;
      console.log('here are matchedTracks after reference', matchedTracks);
    })
    }

  

  useEffect(() => {
    checkIndexedDBExists('tracksDatabase')
      .then((exists) => setDbExists(exists))
      .catch((error) => {
        console.error(error);
        setDbExists(false);
      })
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/.netlify/functions/authorizeUser');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('YEY!! we got the data! ',data);
      localStorage.setItem('verifier', data.verifier);
      console.log("verifier", data.verifier);
      window.location.href = data.redirectUrl; 
    } catch (error) {
      console.error('Error fetching data:', error);
    } 
  };

  return (
    <>
  <h1>Hello Welcome</h1>
  {dbExists === null ? (
    <h1>Loading....</h1>
  ) : dbExists ? (
    <>
      <h1>Welcome Back, here are your songs</h1>
      {matchedTracks.length === 0 ? (
        <p>No songs in matched tracks</p>
      ) : (
        matchedTracks.map((track) => (
          <p key={track.id}>Artist: {track.artist.name} Song: {track.name}</p>
        ))
      )}
    </>
  ) : (
    <button onClick={fetchData}>click to login</button>
  )}
</>
  )
}
