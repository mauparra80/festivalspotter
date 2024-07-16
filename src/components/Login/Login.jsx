import { authorizeSpotifyUser } from "../functions/spotifyManager/spotifyAPI";

import spotifyIconWhite from '../../assets/img/spotifyIconWhite.png'


export default function Login() {

  return (
    <>
      <h1 className="font-poetsen text-customGunmetal">Sign in to FestivalSpotter using spotify</h1>
      <p></p>
      <button
      className='spotify-button' onClick={authorizeSpotifyUser}>
        <img className='w-10' src={spotifyIconWhite} alt="" />Log in
      </button>
    </>
  )
}