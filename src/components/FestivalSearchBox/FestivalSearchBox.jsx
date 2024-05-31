import React, {useState, useEffect} from "react";
import states from "./stateData";
import Select from "react-select";
import getJamBaseEvent from "./jamBaseAPI";


export default function FestivalSearchBox() {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [stateFestivals, setStateFestivals] = useState([]);
  const [festivalListIsLoading, setFestivalListIsLoading] = useState(true);

  //set selected State
  const handleChange = selectedOption => {
    console.log(`Selected: ${selectedOption.value}`);
    setSelectedState(selectedOption.value);
    setSelectedFestival(null);
  };

  //update Festival List on state change
  useEffect(() => {
    const getStateFestivalData = async () => {
      try {
        const result = await getJamBaseEvent(selectedState);
        console.log(result);
        const festivalSearchData = createFestivalSearchData(result);
        setStateFestivals(festivalSearchData);
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

  return (
  <>

    <Select
      options={states}
      getOptionLabel={option => `${option.label} (${option.abbreviation})`}
      getOptionValue={option => option.value}
      filterOption={customFilter}
      onChange={handleChange}
      placeholder="Search for a state..."
    />

    <Select
    options={stateFestivals}
    placeholder="Search for festival..."
    isLoading={festivalListIsLoading}
    isSearchable={true}
    isClearable={true}
    value={selectedFestival}
    onChange={setSelectedFestival}
    />


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