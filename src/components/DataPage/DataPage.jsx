import React, {useEffect, useState} from "react"
import { getWordCloudArtists } from "../WordCloudManager/getWordCloudArtists";
import WordCloudComponent from "../WordCloudManager/WordCloudComponent";
import ArtistTracksBox from "../ArtistTracks-Box/ArtistTracksBox";
import './dataPage.css'

/* TODO
- make wordcloud responsive (at least 3 stages)
  - full(current)
  - at 1300px - medium(800px?)
  - at 900px - small(300px)
  - make its height responive to total artists.
    - less artists, less height
  - make the artists clickable going to spotify
    - matched artists click - got to location on page
    - unmatched artists click - go to spotify
  -optional - make words in wordcloud colored if they match

- add matched artists. 

- add songs to matched artists

- less important - add recomended festivals? 
*/

export default function DataPage({festivalData, matchedTracks}) {
  const [artistWordCountList, setArtistWordCountList] = useState(null);

  useEffect(() => {
    console.log('this is festivalData from datapage',festivalData);
  setArtistWordCountList(getWordCloudArtists(festivalData));
  },[festivalData])

  

  return (

      <div className="page-container data-page">

        <div className="festival-poster-container">
            <img src={festivalData.image} alt="Festival poster" />
          <div className="festival-poster-info">
            <h1 className="font-poetsen">{festivalData.name}</h1>
            <h3 className="no-wrap">{festivalData.startDate}  ---  {festivalData.endDate}</h3>
            <h3>{festivalData.location.name}</h3>
          </div>
        </div>

        <h1 className="font-poetsen mb-10 mt-48 text-center">What artists will be there?</h1>
        {artistWordCountList && <WordCloudComponent words={artistWordCountList} />}
        
        <h1 className="font-poetsen mt-64 text-center">What artists will you recognize?</h1>
        <div className="artists-tracks-container">
        {matchedTracks && <ArtistTracksBox tracks={matchedTracks} festivalData={festivalData}/>}
      </div>


      </div>


      
  )
}