import { useEffect, useState } from 'react';

import Slider from "react-slick";
import useSWR, { SWRConfig } from 'swr';
import { Button, Row, Grid, Input, Spacer, Modal } from "@geist-ui/react";
import  QRCode from 'qrcode.react';

import initSongQuiz from '../hooks/initSongQuiz';
import fetcher from '../lib/fetcher';
import { getNowPlaying, skipTrack, getUserData, getTopTracks, getMyPlaylists } from '../lib/spotify';

import SongCard from './shared/SongCard';



const SongQuiz = ({token}) => {
  const { input, setInput, answer, correct, setStartGame, start_game } = initSongQuiz();

  return(
      <div>
        {
          <Modal open={!start_game} disableBackdropClick={true}>
                  <Modal.Title>Scan QR Code to Start Game</Modal.Title>
                  <Modal.Content>
                    <QRCode value="google.com" fgColor = '#1DB954'/>
                  </Modal.Content>
                  <Modal.Action passive onClick={() => setStartGame(true)}>Start Game</Modal.Action>
                </Modal>
        }
        
        <Button size="small" onClick={ async()=> {
          let getSong = await skipTrack(token);
        }}>Next</Button>
        <Spacer y={1} />

        <SongCard song= {correct ? answer : null}/>
        <Spacer y={.5} />
        <Input size="large" 
          value = {input} 
          onChange={(e)=> {
            setInput(e.target.value)
          }} 
          placeholder="Who Is The Artist?" 
          width="100%" 
          style = {{
            color: 'white'
          }}/>
      </div>
  )
}

export default SongQuiz;