import './LoadingVisual.css'

export default function LoadingVisual() {

  return (
    <>
      <div id="loading-container">
        <div id="loading-box-container">
          <div id="loading-box"></div>
        </div>
        <h1 id='loading-text'>Loading</h1>
        <div className="square"></div>
      </div>
      
    </>
  )
}