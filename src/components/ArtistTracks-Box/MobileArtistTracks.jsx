import { useState, useEffect, useRef } from "react";
import Track from "./Track";
import { ChevronDown } from "lucide-react";

import spotifyIconGreen from "../../assets/img/spotifyIconGreen.png";


export default function MobileArtistTracks({artist, index}) {
  const [showSongs, setShowSongs] = useState(false);
  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowSongs(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  },[])

  return (
    <div className={`artist-box-container ${index % 2 === 0 ? 'left' : 'right'}`} ref={containerRef}>
      <div 
      className={`artist-box ${showSongs ? 'show' : ''}`}
      onClick={() => setShowSongs((prev) => !prev)}
      >
        {artist.artist.name ? (
          <>
            <img src={artist.artist.image} alt="artrist image" className="artist-image"/>
            <div className="artist-info">
              <a href={artist.artist.link} target="__blank" className="artist-name spotify-link">
                <h1 className='font-poetsen'>{artist.artist.name}</h1>
                <img src={spotifyIconGreen} alt="Spotify link to artist" className="spotify-icon"/>
              </a>
              <p>{`You have ${artist.songs.length} matched songs`}</p>
            </div>
          </>
        ) : (
          <h1>No artist found</h1>
        )}
        <ChevronDown className='open-songs-arrow' />
      </div>
      <div 
      className={`songs-box ${showSongs ? 'show' : ''}`}
      >
        {artist.songs.map((song) => (
          <Track key={song.trackId} song={song}/>
        ))}
      </div>
    </div>
  )
}