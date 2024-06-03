import React, {useState, useEffect} from "react";
import states from "./stateData";
import Select from "react-select";
import getJamBaseEvent from "./jamBaseAPI";
import { getAllTracks } from "../indexedDBManager";
import crossReference from "../functions/crossReference";
import WordCloudComponent from "../WordCloud/WordCloudComponent";
import { getWordCloudArtists } from "../WordCloud/getWordCloudArtists";


export default function FestivalSearchBox({dbExists, initiateMatchedData}) {
  //[{stateGeoInfo,...}]
  const [selectedState, setSelectedState] = useState(null); 
  //{festivalData}
  const [selectedFestival, setSelectedFestival] = useState(null);
  //[{festivalData,...}]
  const [stateFestivals, setStateFestivals] = useState([]);
  const [festivalListIsLoading, setFestivalListIsLoading] = useState(true);
  const [disableFestivalSearch, setDisableFestivalSearch] = useState(true);
  const [artistWordCountList, setArtistWordCountList] = useState(null);
 



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

  
  /*
  continue on this. we just finished the search boxes
  1. get all tracks with callback
  2. match selectedFestival with stateFestivals - return festival.
   */
  const submitSearch = () => {
    setArtistWordCountList(getWordCloudArtists(selectedFestival));

    //call parent function to get all data
    initiateMatchedData(selectedFestival);
  }
  

    // if (dbExists === true) {

    //     getAllTracks((tracks) => {
    //      console.log('here are the tracks',tracks)
    //      setMatchedTracks(crossReference(tracks, getACLData())) ;
    //      console.log('here are matchedTracks after reference', matchedTracks);
    //     console.log('Here is the jambase API result');
    //     // getJamBaseEvent('Distortion');
    //    })
    //    }
  

  //on dbExists change, reset search box (might not be used)
  useEffect(() => {
    setSelectedFestival(null);
    setSelectedState(null);
    setStateFestivals(null);
  },[dbExists])

  return (
  <>

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

    <button onClick={submitSearch}>Get My Festival Music</button>

    {artistWordCountList ? 
    <WordCloudComponent words={artistWordCountList} /> :
    <p>No word cloud</p>}

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

