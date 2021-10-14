import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode.react';

import User from './User';
import Score from './Score';

import styles from './Scoreboard.module.scss';

const Scoreboard = ({ users, score, lyrics, room_id }) => {

  return (
    <div className={styles.scoreboard}>
      <Score score={ score } lyrics={ lyrics }/>
      <div className={styles.qrcode}>
        <QRCode value={'https://spotify-trivia.vercel.app/join?room_token='+room_id} />
      </div>
      <h2>Currently Playing:</h2>
      <div>
      { 
        users.map((user,i)=> {
          return(
            <User user={ user } lyrics={ lyrics }/>
          )
        })
      }
      </div>
      
    </div>
  );
};


export default Scoreboard;
