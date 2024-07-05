import { AppContext } from "../../components/AppProvider";
import { useContext, useEffect } from "react";
import './ActionPage.css'
import FestivalSearchBox from '../FestivalSearchBox/FestivalSearchBox';
import { checkIfDatabaseContainsStores, getAllTracks } from "../functions/indexedDBManager/indexedDBManager";
import Login from '../Login/Login';
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

export default function ActionPage() {

  const {dbExists, setDbExists, setUserTracks} = useContext(AppContext);
  console.log("dbExists is ",dbExists);

  //set dbExists and userTracks on mount
  useEffect(() => {
    const checkIfDbExists = async () => {
      const hasStores = await checkIfDatabaseContainsStores('tracksDatabase');
    setDbExists(hasStores);
    }
    checkIfDbExists();

    getAllTracks((tracks) => {setUserTracks(tracks)});
  }, [])

  return (
    <>
      <div className="action-page-container">
        <div className="action-container">
          <div className="intro">
            <div className='component-slider'>
              <ComponentSlider components={SLIDES} indexPreset={dbExists ? 0 : 1}/>
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