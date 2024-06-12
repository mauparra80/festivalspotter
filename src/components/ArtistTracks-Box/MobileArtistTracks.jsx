import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";


export default function MobileArtistTracks({name, songs}) {
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
    <div className="artist-box-container" ref={containerRef}>
      <div 
      className={`artist-box ${showSongs ? 'show' : ''}`}
      onClick={() => setShowSongs((prev) => !prev)}
      >
        {name ? (
          <h1 className='font-poetsen'>{name}</h1>
        ) : (
          <h1>No artist found</h1>
        )}
        <ChevronDown className='open-songs-arrow' />
      </div>
      <div 
      className={`songs-box ${showSongs ? 'show' : ''}`}
      >
        {songs.map((song) => (
          <p key={song.trackId}>{song.name}</p>
        ))}
      </div>
    </div>
  )
}