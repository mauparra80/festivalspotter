import React, {useState, useEffect, useContext} from "react";
import states from "./stateData";
import Select from "react-select";
import getJamBaseEvent from '../functions/jamBaseManager/jamBaseAPI'
import './festivalSearchBox.css'
import { AppContext } from "../AppProvider";
import { clearDatabase } from "../functions/indexedDBManager/indexedDBManager";


export default function FestivalSearchBox({dbExists}) {
  //[{stateGeoInfo,...}]
  const [selectedState, setSelectedState] = useState(null); 
  //{festivalData}
  const [selectedFestival, setSelectedFestival] = useState(null);
  //[{festivalData,...}]
  const [stateFestivals, setStateFestivals] = useState([]);
  const [festivalListIsLoading, setFestivalListIsLoading] = useState(true);
  const [disableFestivalSearch, setDisableFestivalSearch] = useState(true);

  const {setFestivalData} = useContext(AppContext);
 

  //set selected State
  const selectState = selectedOption => {
    console.log(`Selected: ${selectedOption.value}`);
    setSelectedState(selectedOption.value);
    setSelectedFestival(null);
    setDisableFestivalSearch(false);
  };
  //set selected festival
  const selectFestival = selectedOption => {
    console.log('Selected Festival ID', selectedOption.value);
    //match selectedOption(id) to correct festival in stateFestivals
    const festival = stateFestivals.find(f => f.identifier === selectedOption.value);
    setSelectedFestival(festival);
    console.log('Selected Festival Data: ', festival);
  }

  //update Festival List on state change
  useEffect(() => {
    const getStateFestivalData = async () => {
      try {
        const result = await getJamBaseEvent(selectedState);
        console.log(result);
        // const festivalSearchData = createFestivalSearchData(result);
        setStateFestivals(result);
        setFestivalListIsLoading(false);
      } catch (error) {
        console.error('failed to fetch festival data', error);
      }
    }
    if (selectedState) {
      setFestivalListIsLoading(true);
      setStateFestivals([]);
      getStateFestivalData();
    }
  }, [selectedState])

  const submitSearch = () => {
    setFestivalData(selectedFestival);
  }

  //on dbExists change, reset search box (might not be used)
  useEffect(() => {
    setSelectedFestival(null);
    setSelectedState(null);
    setStateFestivals(null);
  },[dbExists])

  return (
  <>
    <h1 className="font-poetsen text-customGunmetal">Select an Upcoming Festival</h1>
    <div className="dropDown-container">
      <Select
        options={states}
        getOptionLabel={option => `${option.label} (${option.abbreviation})`}
        getOptionValue={option => option.value}
        filterOption={customFilter}
        onChange={selectState}
        placeholder="Search for a state..."
      />
      <Select
      options={stateFestivals ? createFestivalSearchData(stateFestivals) : ''}
      placeholder={(disableFestivalSearch ? "Select state first" : "Search for festival...")}
      isLoading={festivalListIsLoading}
      isSearchable={true}
      isClearable={true}
      value={selectedFestival ? { value: selectedFestival.identifier, label: selectedFestival.name } : null}
      onChange={selectFestival}
      isDisabled={disableFestivalSearch}
      />
    </div>

    <button className="bg-customGunmetal text-lg" onClick={submitSearch}>Get My Festival Music</button>

    <button className="bg-customTan border-gray-400 border-2 text-gray-500 text-sm" onClick={clearDatabase}>Refresh My Spotify Music</button>
    


  </>
  );
}




const customFilter = (option, inputValue) => {
  const lowerInput = inputValue.toLowerCase();
  const label = option.label ? option.label.toLowerCase() : '';
  const abbreviation = option.abbreviation ? option.abbreviation.toLowerCase() : '';
  return label.includes(lowerInput) || abbreviation.includes(lowerInput);
};

//change festival data from raw data to name,id
const createFestivalSearchData = (data) => {
  return data.map(festival => ({
    value: festival.identifier,
    label: festival.name,
  }))
}

