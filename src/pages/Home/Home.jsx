import React, {useEffect, useState, useContext} from "react";
import { getAllTracks, clearDatabase, checkIfDatabaseContainsStores } from "../../components/functions/indexedDBManager/indexedDBManager";
import { authorizeSpotifyUser } from "../../components/functions/spotifyManager/spotifyAPI";
import crossReference from "../../components/functions/crossReference";
import FestivalSearchBox from "../../components/FestivalSearchBox/FestivalSearchBox";
import DataPage from "../../components/DataPage/DataPage";
import ActionPage from "../../components/ActionPage/ActionPage";
import { AppContext } from "../../components/AppProvider";



export default function Home() {
  const [dbExists, setDbExists] = useState(null);
  const [userTracks, setUserTracks] = useState(null);
  const [matchedTracks, setMatchedTracks] = useState([]);
  // const [festivalData, setFestivalData] = useState(null);

  const {festivalData} = useContext(AppContext);
  
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
    {festivalData ? <DataPage festivalData={festivalData} matchedTracks={matchedTracks}/> : 
    <ActionPage  dbExists={dbExists} />}
  </>
  )
}


