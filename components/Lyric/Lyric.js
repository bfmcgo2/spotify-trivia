import React, { useState, useEffect, useRef } from 'react';
import styles from './Lyric.module.scss';

const Lyric = ({ lyric }) => {
  const { color, name, correct} = lyric;
  const [ hover, setHover ] = useState(null);
  const [ ans_size ,setAnsSize ] = useState(null);

  let lyricRef = useRef(null);

  const hoverLyric = e => {
    console.log(e);
    let x = (e.clientX ) + 'px';
    let y = (e.clientY ) + 'px';
    setHover({
      x,
      y,
      active: true
    })
  }

  const leaveLyric = () => {
    setHover(null);
  }

  useEffect(() => {
    if(lyricRef) {
      setAnsSize({
        height: lyricRef.current.offsetHeight,
        width: lyricRef.current.offsetWidth
      })
    }
  }, [lyricRef]);

  if(!correct) {
    return(
      <div 
        className={styles.lyric}
        >
        <p
          style={{
            width: (ans_size ? ans_size.width : 'auto'),
            height: (ans_size ? ans_size.height : 'auto'),
            opacity: "0"
          }}
          ref={lyricRef}>
          { ans_size ? '' : lyric.lyric}
        </p> 
      </div>
    )
  }

  return (
    <div className={styles.lyric} 
      onMouseMove={(e)=> hoverLyric(e)}
      onMouseLeave={leaveLyric}>
      {hover && 
        <span className={ styles.lyric_guesser }
          style={{
            left: hover.x,
            top: hover.y,
            color
          }}>{ name }</span>
      }
      <p style={{backgroundColor: color}}>
        { lyric.lyric }
      </p> 
      
    </div>
  );
};


export default Lyric;
