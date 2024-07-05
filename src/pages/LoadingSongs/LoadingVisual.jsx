import './LoadingVisual.css'

export default function LoadingVisual() {

  return (
    <>
      <div id="loading-container">
        <div id="loading-box-container">
          <div id="loading-box"></div>
        </div>
        <h2 id='loading-text'>Loading Tracks</h2>
        <div className="square"></div>
      </div>
      
    </>
  )
}