import React, {createContext, useState} from "react";

const AppContext = createContext();

const AppProvider = ({children}) => {
  const [festivalData, setFestivalData] = useState(null);
  const [userTracks, setUserTracks] = useState(null);
  const [dbExists, setDbExists] = useState(false);
  const [matchedTracks, setMatchedTracks] = useState([]);

  return (
    <AppContext.Provider value = {{
      festivalData, setFestivalData,
      userTracks, setUserTracks,
      dbExists, setDbExists,
      matchedTracks, setMatchedTracks,
      }}>
      {children}
    </AppContext.Provider>
  )
}

export {AppProvider, AppContext}