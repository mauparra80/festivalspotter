import { AppContext } from "../../components/AppProvider";
import { useContext, useEffect } from "react";
import './ActionPage.css'
import FestivalSearchBox from '../../components/FestivalSearchBox/FestivalSearchBox';
import { checkIfDatabaseContainsStores, getAllTracks } from "../../components/functions/indexedDBManager/indexedDBManager";
import Login from '../../components/Login/Login';
import IntroSlide from '../../components/ComponentSlider/IntroSlide';
import ComponentSlider from '../../components/ComponentSlider/ComponentSlider';
import Header from "../../components/Header/Header";

import introImgLogin from '../../assets/img/introImg-login.webp';
import introImgResults from '../../assets/img/introImg-results.webp';
import introImgSearch from '../../assets/img/introImg-search.webp';
import { useLocation } from "react-router";



const SLIDES = [
  <IntroSlide step={"Step 1"} description={"get your spotify saved music"} img={introImgLogin} key={1} />,
  <IntroSlide step={"Step 2"} description={"search for an upcoming festival"} img={introImgSearch} key={2} />,
  <IntroSlide step={"Step 3"} description={"See what artists you know that will be at that festival and more!"} img={introImgResults} key={3} />,
]

export default function ActionPage() {
  const {dbExists, setDbExists, setUserTracks} = useContext(AppContext);
  const location = useLocation();

  //set dbExists and userTracks on mount
  useEffect(() => {
    const checkIfDbExists = async () => {
      const hasStores = await checkIfDatabaseContainsStores('tracksDatabase');
      setDbExists(hasStores);
      if (hasStores) {getAllTracks((tracks) => {setUserTracks(tracks)});}
    }
    checkIfDbExists();
  }, [])

  return (
    <>
      <div className="action-page-container">
        <Header curLocation={location.pathname}/>
        <div className="action-container">
          <div className="intro">
            <div className='component-slider'>
              <ComponentSlider components={SLIDES} indexPreset={dbExists ? 1 : 0}/>
            </div>
          </div>

          <div className="action">
          {dbExists ? (
              <FestivalSearchBox /> ) : (
                <Login /> )
          }
          </div>
        </div>
      </div>
    </>
  )
}