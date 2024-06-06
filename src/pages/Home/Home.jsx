import React, {useEffect, useState} from "react";
import { getAllTracks, clearDatabase, checkIfDatabaseContainsStores } from "../../components/functions/indexedDBManager/indexedDBManager";
import { authorizeSpotifyUser } from "../../components/functions/spotifyManager/spotifyAPI";
import crossReference from "../../components/functions/crossReference";
import FestivalSearchBox from "../../components/FestivalSearchBox/FestivalSearchBox";
import DataPage from "../../components/DataPage/DataPage";
import Login from "../../components/Login/Login";



export default function Home() {
  const [dbExists, setDbExists] = useState(null);
  const [userTracks, setUserTracks] = useState(null);
  const [matchedTracks, setMatchedTracks] = useState([]);
  const [festivalData, setFestivalData] = useState(null);
  
  //check and set if we already have users spotify data and setUserTracks
  useEffect(() => {
    async function checkDatabase() {
      try {
        const hasStores = await checkIfDatabaseContainsStores('tracksDatabase');
        console.log('Database has stores:', hasStores);
        if(hasStores) {
          setDbExists(hasStores);
          getAllTracks((tracks) => {
            setUserTracks(tracks);
          })
        } else {
          setDbExists(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    checkDatabase();
  }, []);


  //start getting all matched data using tracks and festival
  const initiateMatchedData = (selectedFestival) => {
    setFestivalData(selectedFestival);
  }

  //when festivalData changes, initiate data presentation.
  //TODO: create functions to get all dat and update it here.
  useEffect(() => {
    if(festivalData) {
      if(festivalData.performer) {
        let festivalArtists = [];
  
        festivalData.performer.forEach((performer) => {
          festivalArtists.push(performer.name);
        })

        setMatchedTracks(crossReference(userTracks, festivalArtists))
      }
    }
    
  },[festivalData])

  return (
    <>
  {dbExists === null ? (
    <h1>Loading....</h1>
  ) : dbExists ? (
    <>
      <h1>Welcome Back, here are your songs</h1>
      {matchedTracks.length === 0 ? (
        <p>No songs in matched tracks</p>
      ) : (
        matchedTracks.map((track, index) => (
          <p key={`${track.id}-${index}`}>Artist: {track.artist.name} Song: {track.name}</p>
        ))
      )}
    <FestivalSearchBox dbExists={dbExists} initiateMatchedData={initiateMatchedData}/>
    <button onClick={clearDatabase}>clear database</button>
    </>
  ) : (
    <>
    <Login authorizeSpotifyUser={authorizeSpotifyUser}/>
    </>
  )}

  {festivalData && <DataPage festivalData={festivalData}/>}
</>
  )
}


