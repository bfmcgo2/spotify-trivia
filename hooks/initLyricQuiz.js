import { useEffect, useState } from 'react';
import useSWR, { SWRConfig } from 'swr';

import fetcher from '../lib/fetcher';
import { getGame } from '../lib/firebase';

const initLyricQuiz = () => {
  
  const [lyrics, setLyrics] = useState();
  const [room_id, setRoomId] = useState('');
  const [game_details, setGameDetails] = useState()
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [songDetails, setSongDetails] = useState({});


  useEffect(()=> {
    const room_code = window.location.search.substr(1).split('&')[0].split("=")[1];
    setRoomId(room_code);
  },[]);

  useEffect( async () => {
    if(room_id) {
      const game_data = await getGame(room_id);
      setGameDetails(game_data);
    }
  },[room_id])


  const [init_lyrics, getLyrics] = useState(false);
  useSWR((game_details && init_lyrics === false ? `/api/genius/get-song?artist=${game_details.artist}&title=${game_details.title}`: null), fetcher, 
    { 
      onSuccess:(data, error)=>{
        let { artist, title } = data;

        setSongDetails({artist,title});

        const lyric_answers = []
        let lyrics = data.lyrics.replace(/[\(\[].*?[\)\]]/g, "");
        let formatted = lyrics
                          .replace(/(\r\n)+|\r+|\n+|\t+/g, ' . ')
                          .replace(/\s+/g, ' ').trim()
        let arr = formatted.split(' ')
        
        arr.map(lyric => {
          // console.log(lyric)
          const answer = {}

          if(lyric.match(/^\./g)) {
            console.log(lyric);
            answer.lyric = false;
            answer.formatted_answer = false
            return lyric_answers.push(answer);
          }

          answer.correct = false;
          answer.lyric = lyric;
          answer.formatted_answer = lyric.replace(/[^\w\s]|_/g, '').toLowerCase();

          return lyric_answers.push(answer);
          
        })
        console.log(lyric_answers)
        getLyrics(true)
        setLyrics(lyric_answers)
      }
    });

  const getAllIndexes = (arr, val) => {
    let indexes = []
    let i;
        for(i = 0; i < arr.length; i++)
            if (arr[i].formatted_answer === val)
                indexes.push(i);
        return indexes;
  }

  const updateAnswers = (mat) => {
    const dupl = [...lyrics];
    mat.map((mat)=> {
      if(dupl[mat].correct === false) {
        setInput('');
      }
      dupl[mat].correct = true;
      setLyrics(dupl);
    })
    const tot_corr = dupl.filter((lyr) => lyr.correct === true);
    console.log(tot_corr);
    setScore(tot_corr.length);
  }
  
  const endQuiz = () => {
    console.log('hey')
    const dupl = [...lyrics];
    let end_quiz = dupl.map(({correct, ...lyric}) => {
      let update = {...lyric, correct : true}
      console.log(update);
      return update
    });
    setLyrics(end_quiz);

  }

  // On input change
  useEffect(()=> {
    const format = input.replace(/[^\w\s]|_/g, '').toLowerCase();
    if(lyrics) {
      const matched = getAllIndexes(lyrics, format);
      updateAnswers(matched);
      console.log(lyrics);
    } 

  },[input]);

  

  return { 
    // return values
    lyrics,
    setInput,
    input,
    endQuiz,
    score,
    songDetails,
    room_id,
    game_details
  }
}

export default initLyricQuiz;