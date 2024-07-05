import React, {useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router";
import { getAllTracks, clearDatabase, checkIfDatabaseContainsStores } from "../../components/functions/indexedDBManager/indexedDBManager";
import { authorizeSpotifyUser } from "../../components/functions/spotifyManager/spotifyAPI";
import crossReference from "../../components/functions/crossReference";
import FestivalSearchBox from "../../components/FestivalSearchBox/FestivalSearchBox";
import DataPage from "../../components/DataPage/DataPage";
import ActionPage from "../../components/ActionPage/ActionPage";
import { AppContext } from "../../components/AppProvider";



export default function Home() {
  // const [dbExists, setDbExists] = useState(null);
  // const [userTracks, setUserTracks] = useState(null);
  // const [matchedTracks, setMatchedTracks] = useState([]);
  const { festivalData, setUserTracks, setDbExists, dbExists, matchedTracks } = useContext(AppContext);
  const navigate = useNavigate();
  
  //check and set if we already have users spotify data and setUserTracks
  useEffect(() => {
    async function checkDatabase() {
      try {
        const hasStores = await checkIfDatabaseContainsStores('tracksDatabase');
        console.log('Database has stores:', hasStores);
        console.log('dbExists inside home', dbExists);
        if(hasStores) {
          setDbExists(hasStores);
          getAllTracks((tracks) => {
            setUserTracks(tracks)
          })
          navigate('/festival-search');
        } else {
          setDbExists(false);
          navigate('/festival-search');
        }
      } catch (error) {
        console.error(error);
      }
    }
    checkDatabase();
  }, []);


  

  return (
  <>
    {/* {festivalData ? <DataPage festivalData={festivalData} matchedTracks={matchedTracks}/> : 
    <ActionPage  dbExists={dbExists} />} */}
  </>
  )
}


