
import { useNavigate } from "react-router";
import festivalSpotLogo from "../../assets/img/FestivalSpot-Logo.png";
import './Header.css';
import { Search, CircleHelp } from "lucide-react";


export default function Header({curLocation}) {
  const navigate = useNavigate();

  const returnHome = () => {
    navigate('/');
  }

  return (
    <div className="header-container">
      <div className="logo-container" onClick={() => returnHome()}>
        <div className="logo-img-container">
          <img className="logo-medium" src={festivalSpotLogo} alt="Festival Spot Logo" />
        </div>
        <h1 id="header-logo-name" className="font-poetsen">FestivalSpotter</h1>
      </div>
      <div className="header-nav-container">
        {!curLocation && 
        <a href="" className="header-nav-item">
         <Search className="header-icon" />
          New Search
        </a>
        }
        
        <a href='/FAQS' target="_blank" rel="noopener noreferrer" className="header-nav-item">
          <CircleHelp className="header-icon" />
          FAQS
        </a>
      </div>
    </div>
  )
}