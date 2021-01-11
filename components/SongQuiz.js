import { useEffect, useState } from 'react';

import Slider from "react-slick";
import useSWR, { SWRConfig } from 'swr';
import { Button, Row, Grid, Input, Spacer } from "@geist-ui/react"

import initSongQuiz from '../hooks/initSongQuiz';
import fetcher from '../lib/fetcher';
import { getNowPlaying, skipTrack, getUserData, getTopTracks, getMyPlaylists } from '../lib/spotify';

import SongCard from './shared/SongCard';

const CurrentSong = ({token}) => {
  let { data, error } = useSWR('/api/now-playing?access_token='+token, fetcher);
  
  if(!data) return <div></div>
  const { isPlaying, title } = data;
  console.log(data)
  return (
    <div>{isPlaying === false ? 'Nothing Playing' : title}</div>
  )
}

const SongQuiz = ({token}) => {
  const { input, setInput, answer, setAnswer, start_game, setStartGame, correct, setCorrect} = initSongQuiz();

  const songAnswer = async() =>{
    let getSong = await getNowPlaying(token);
    if(getSong.status === 204 || getSong.status > 400) return false;
    let song = await getSong.json();
    // console.log(song)
    const acceptable_answers = []

    let answer = {
      image: song.item.album.images[0],
      uri: song.item.uri,
      artists: song.item.artists.map((artist) => artist.name),
      title: song.item.name,
    }
    answer.artists.map(ans => {
      const format = ans.toLowerCase();
      const remove_punc = format.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
      acceptable_answers.push(format.replace(/\s/g, ''));
      if(format.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g)) {
        acceptable_answers.push(remove_punc);
      }
    });
    answer.answers = acceptable_answers;
    setAnswer(answer);
  }

  useEffect(() => {
    songAnswer();
  }, [correct])

  

  return(
      <div>
        {start_game ? <CurrentSong token = {token} /> : <div></div>}
        <Button onClick={()=> {
          setStartGame(true);
        }}>Start Game</Button>
        <Button onClick={ async()=> {
          let getSong = await skipTrack(token);
        }}>Next (dont press please)</Button>
        <Spacer y={1} />

        <SongCard song= {correct ? answer : null}/>
        <Input size="large" value = {input} onChange={(e)=> {
          setInput(e.target.value)
        }}placeholder="Who Is The Artist?" width="100%" />
      </div>
  )
}

export default SongQuiz;