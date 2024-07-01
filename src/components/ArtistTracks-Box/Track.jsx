import React, {useRef, useEffect, useState} from "react";
import spotifyIconGreen from "../../assets/img/spotifyIconGreen.png";

export default function Track({song}) {
  const trackNameRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const checkOverflow = () => {
      const trackNameElement = trackNameRef.current;
      if (trackNameElement) {
        const scrollWidth = trackNameElement.scrollWidth;
        const clientWidth = trackNameElement.clientWidth;
        if (scrollWidth > clientWidth) {
          setIsOverflow(true);
          setScrollDistance(scrollWidth - clientWidth);
        } else {
          setIsOverflow(false);
        }
      }
    };

    checkOverflow();

    // const trackNameElement = trackNameRef.current;
   
    // if (trackNameElement && trackNameElement.scrollWidth > trackNameElement.clientWidth) {
      
    //   setIsOverflow(true);
    //   setScrollDistance(scrollWidth - clientWidth);
    // } else {
    //   setIsOverflow(false);
    //   console.log("scrollwidth", trackNameElement.scrollWidth);
    //   console.log("clientWidth", trackNameElement.clientWidth);
    // }
  }, [song.name]);

  return (
    <div className="track-container">
      <a href={song.link} className="spotify-link track-spotify-link">
        <img src={spotifyIconGreen} alt="Spotify link to artist" className="spotify-icon icon-small"/>
        <div className="track-name-container">
          <p 
          className={`track-name ${isOverflow ? 'scroll' : ''}`} 
          key={song.trackId}
          ref={trackNameRef}
          style={{ '--scroll-distance': `${scrollDistance}px` }}
          >
            {song.name}
          </p>
        </div>
      </a>
      <div className="track-line"></div>
      <audio controls controlsList="nodownload">
        <source src={song.preview}/>
        Your broswer does not support the audio element
      </audio>
    </div>
  )
}