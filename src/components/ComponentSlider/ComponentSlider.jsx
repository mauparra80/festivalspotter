
import React, {useState} from "react";
import {ArrowBigLeft, ArrowBigRight, Key} from "lucide-react"
import './componentSlider.css'

export default function ComponentSlider({components}) {
  const [componentIndex, setComponentIndex] = useState(0);

  console.log("component", components)

  function showNextComponent() {
    setComponentIndex(index => {
      if (index === components.length - 1) return 0
      return index + 1
    })
  }

  function showPrevComponent() {
    setComponentIndex(index => {
      if (index === 0) return components.length -1
      return index - 1
    })
  }

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full flex overflow-hidden">
        {components.map((component, index) => (
          <div
          key={index}
          className="slider-item"
          style={{ translate: `${-100 * componentIndex }%`}}
        >
          {component}
        </div>
        ))}
      </div>
      {/* <>
        {components[componentIndex]}
      </> */}
      <button className="component-slider-btn left-0" onClick={showPrevComponent}><ArrowBigLeft/></button>
      <button className="component-slider-btn right-0" onClick={showNextComponent}><ArrowBigRight/></button>
    </div>
  )
}
