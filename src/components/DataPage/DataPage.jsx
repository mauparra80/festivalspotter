import React, {useEffect, useState} from "react"
import { getWordCloudArtists } from "../WordCloudManager/getWordCloudArtists";
import WordCloudComponent from "../WordCloudManager/WordCloudComponent";

export default function DataPage({festivalData}) {
  const [artistWordCountList, setArtistWordCountList] = useState(null);

  useEffect(() => {
    console.log('this is festivalData from datapage',festivalData);
  setArtistWordCountList(getWordCloudArtists(festivalData));
  },[festivalData])

  

  return (
    <>
      {artistWordCountList ? 
      <WordCloudComponent words={artistWordCountList} /> :
      <p>No word cloud</p>}
    </>
  )
}