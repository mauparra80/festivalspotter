
import React, {useEffect, useRef} from "react";
import wordCloud from 'wordcloud';
import PropTypes from 'prop-types';


const WordCloudComponent = ({words}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && words.length > 0) {
      const wordList = words.map(word => [word.name, word.count]);

      wordCloud(canvasRef.current, {
        list: wordList,
        gridSize: 8,
        weightFactor: 10,
        fontFamily: 'Times, serif',
        color: 'random-dark',
        // backgroundColor: 'white',
        shape: "circle",
        rotateRatio: 0,
        rotationSteps: 2,
        // shrinkToFit: true,
      });
    }
  }, [words]);

  return <canvas
   ref={canvasRef}
   width={1400}
   height={1200}
   ></canvas>
}

WordCloudComponent.propTypes = {
  words: PropTypes.array,
}

export default WordCloudComponent

