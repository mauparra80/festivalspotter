import Header from '../../components/Header/Header'
import './FAQS.css'

export default function FAQS() {

  return (
    <div className="faqs-page-container">
      <Header curLocation={true}/>
      <div className="content-container">
        <h1 className='faqs-title'>FAQS</h1>
        <ul className='faqs-list'>
          <li className='faqs-item'>
            <h2>How are you using my spotify information?</h2>
            <p>FestivalSpot only collects your spotify tracks and saves them to your own browser so nothing is stored in the cloud.</p>
            <hr />
          </li>
          <li className="faqs-item">
            <h2>I saved some new songs in my spotify but they are not showing up as matches</h2>
            <p>Your tracks are initially saved when you sign into spotify, then they are kept in your browsers memory. to refresh your spotify tracks, just click the refresh button below the search button or clear your browser cookies</p>
            <hr />
          </li>
          <li className="faqs-item">
            <h2>I cannot find the festival I am looking for</h2>
            <p>Unfortunately, the festivals available are limited to the festivals provided by Jambase. If your festival does not show up, it might have already happened or it is happening too far into the future</p>
            <hr />
          </li>
        </ul>
      </div>
    </div>
  )
}