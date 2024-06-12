import React, {createContext, useState} from "react";

const AppContext = createContext();

const AppProvider = ({children}) => {
  const [festivalData, setFestivalData] = useState(null);

  return (
    <AppContext.Provider value = {{festivalData, setFestivalData}}>
      {children}
    </AppContext.Provider>
  )
}

export {AppProvider, AppContext}