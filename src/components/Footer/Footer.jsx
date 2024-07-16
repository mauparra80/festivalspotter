import './Footer.css'
import BuyMeACoffeeButton from '../BuyMeACoffeeButton'
import MaupbLInk from '../MaupbLInk'
import mauDrawing from '../../assets/img/maupic03.JPG'
import bmcLogo from '../../assets/img/bmc-logo-no-background.png'
import spotifyLogo from '../../assets/img/spotifyIconGreen.png';
import jambaseLogo from '../../assets/img/jambase-logo.jpeg';
import LinkButton from './LinkButton'
import { useLocation } from 'react-router'

export default function Footer() {
    const location = useLocation();

    return (
        <div className={`footer-container ${(location.pathname === '/loading-songs') ? 'hide' : ''}`}>

            <div className="footer-section footer-contact-about">
                <div className="boxFrame-1"></div>
                <div className="boxFrame-2"></div>
                <h3>Hey There!</h3>
                <p>If there was any issue or you have any suggestions, you can let me know through my <a href="https://maupb.com/contact" target='_blank'>contact</a> page</p>
                <p>Festival data is gathered from <a href="https://www.jambase.com/" target='_blank'>Jambase</a> and your music is safely retrieved from your <a href="https://open.spotify.com/" target='_blank'>Spotify</a> account.</p>
            </div>

            <div className="footer-section footer-links">
                <div className="footer-links-box"></div>
                <div className="link-left">
                    <div className="footer-item">
                        <LinkButton icon={bmcLogo} name="Buy me a coffee" link="" reverse={true}/>
                    </div>
                    <div className="footer-item rounded-logo">
                        <LinkButton icon={mauDrawing} name="Contact Me" link="" reverse={true}/>
                    </div>
                </div>
                <div className="links-right">
                    <div className="footer-item">
                        <LinkButton icon={spotifyLogo} name="Spotify" link=""/>
                    </div>
                    <div className="footer-item rounded-logo">
                        <LinkButton icon={jambaseLogo} name="JamBase" link=""/>
                    </div>
                </div>
            </div>


            
            
            
        </div>
    )
}