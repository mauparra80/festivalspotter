
import React, {useEffect, useRef, useState} from "react";
import wordCloud from 'wordcloud';
import PropTypes from 'prop-types';


const WordCloudComponent = ({words}) => {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  // const [screenWidth, setScreenWidth] = useState(window.width)
  const [options, setOptions] = useState({
    width: 1300,
    height: 1200,
    weightFactor: 10,
  });

  //TODO: see if this needs fixing.

  // useEffect(() => {
  //   window.addEventListener('resize', () => {
  //     setScreenWidth(screenWidth);
  //     console.log(screenWidth);
  //   })
  // })

  console.log('how many words? ', words)

  useEffect(() => {
    const wordCount = words.length
    const screenWidth = window.innerWidth
    console.log("wordCount", wordCount);
    console.log("screenWidth", window.innerWidth);

    if(wordCount > 0 && wordCount <= 50) {
      setOptions((prev) => ({...prev, height: 500}))
    } else if (wordCount > 50 && wordCount <= 100) {
      setOptions((prev) => ({...prev, height: 700}))
    } else if (wordCount > 100 && wordCount <= 150) {
      setOptions((prev) => ({...prev, height: 1000}))
    } else if (wordCount > 150 && wordCount <= 200) {
      setOptions((prev) => ({...prev, height: 1200}))
    } else if (wordCount > 200) {
      setOptions((prev) => ({...prev, height: 1500}))
    } 

    if(screenWidth < 600) {
      setIsMobile(true);
      setOptions((prev) => ({
        ...prev,
        width: 400,
        weightFactor: 6,
      }))
    } else if ((screenWidth >= 600) && (screenWidth <= 900)) {
      setIsMobile(true);
      setOptions((prev) => ({
        ...prev,
        width: 700,
        weightFactor: 8,
      }))
    } else {
      setIsMobile(false);
      setOptions((prev) => ({
        ...prev,
        width: 1300,
        weightFactor: 10,
      }))
    }

    
  },[words])

  

  useEffect(() => {
    console.log("wordcloud width: ", options.width);
    console.log("wordcloud height: ", options.height);
    if (canvasRef.current && words.length > 0) {
      const wordList = words.map(word => [word.name, word.count]);

      wordCloud(canvasRef.current, {
        list: wordList,
        gridSize: 8,
        weightFactor: 15,
        minSize: 10,
        fontFamily: 'Times, serif',
        color: 'random-light',
        // color: function() {
        //   return (['#59A5D8', '#DB5461', '#D4D6B9'])[Math.floor(Math.random() * 3)]
        // },
        backgroundColor: '#202D36',
        shape: "circle",
        rotateRatio: 0,
        rotationSteps: 2,
        shrinkToFit: true,
        origin: [options.width / 2,0]
      });
    }
  }, [words, options]);

  return <canvas
   ref={canvasRef}
   width={options.width}
   height={options.height}
   ></canvas>
}

WordCloudComponent.propTypes = {
  words: PropTypes.array,
}

export default WordCloudComponent

