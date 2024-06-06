import './Login.css'
import spotifyIconWhite from '../../assets/img/spotifyIconWhite.png'
import IntroSlide from '../ComponentSlider/IntroSlide';
import ComponentSlider from '../ComponentSlider/ComponentSlider';
import introImgLogin from '../../assets/img/introImg-login.webp';
import introImgResults from '../../assets/img/introImg-results.webp';
import introImgSearch from '../../assets/img/introImg-search.webp';


const SLIDES = [
  <IntroSlide step={"Step 1"} description={"get your spotify saved music"} img={introImgLogin} key={1} />,
  <IntroSlide step={"Step 2"} description={"search for an upcoming festival"} img={introImgSearch} key={2} />,
  <IntroSlide step={"Step 3"} description={"See what artists you know that will be at that festival and more!"} img={introImgResults} key={3} />,
]

export default function Login({authorizeSpotifyUser}) {

  return (
    <>
      <div className="login-page-container">
        <div className="login-container">
          <div className="intro">
            <div className='component-slider'>
              <ComponentSlider components=  {SLIDES} />
            </div>
          </div>
          <div className="login">
            <h1 className="font-poetsen text-customGunmetal">Sign in to FestivalSpot using spotify</h1>
            <p></p>
            <button
            className='spotify-button' onClick={authorizeSpotifyUser}>
              <img className='w-10' src={spotifyIconWhite} alt="" />Log in
            </button>
          </div>
        </div>
      </div>
    </>
  )
}