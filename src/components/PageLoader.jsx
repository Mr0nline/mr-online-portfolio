import React, { useEffect, useState } from 'react';

function PageLoader(props) {
  const [loadingText, SetLoadingText] = useState('0%')
  const [progress, SetProgress] = useState(0)
  const [styles, setStyles] = useState({})

  const scale = (num,in_min,in_max,out_min,out_max) => {
    return ( (num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  }

  useEffect(() => {
    let interVal = setInterval(() => {
      SetProgress(progress + 1)
      if(progress > 99){
        clearInterval(interVal)
      }
      SetLoadingText(`${progress}%`)
      setStyles({
        opacity: scale(progress,0,100,1,0),
        filter: `blur(${scale(progress,0,100,30,0)}px)`
      })
    },50)
  }, [])

  return (
    <div className="PageLoader">
      <h1 className="loading-text" style={styles}>{loadingText}</h1>
    </div>
  );
}

export default PageLoader;