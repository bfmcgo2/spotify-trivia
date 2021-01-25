import { useEffect, useState } from 'react';
import useSWR, { SWRConfig } from 'swr';

import fetcher from '../lib/fetcher';
import { gameRef, getGame } from '../lib/firebase';

const initLyricQuiz = () => {
  
  const [lyrics, setLyrics] = useState();
  const [room_id, setRoomId] = useState('');
  const [game_details, setGameDetails] = useState()
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [songDetails, setSongDetails] = useState({});
  const [current_users, setCurrentUsers] = useState([]);

  useEffect(()=> {
    const room_code = window.location.search.substr(1).split('&')[0].split("=")[1];
    setRoomId(room_code);
  },[]);

  useEffect( async () => {
    if(room_id) {
      const game_data = await getGame(room_id);
      setGameDetails(game_data);
      // console.log(game_data)
      const userWatch = gameRef.doc(room_id).collection('users').onSnapshot(snapshot => {
        let users = [];
        snapshot.forEach((snp)=>{
          console.log(snp)
          let data = snp.data();
          users.push({...data, id: snp.id})
        });
        setCurrentUsers(users);
      }, err => {
        console.log(`Encountered error: ${err}`);
      });
      console.log(current_users);
    }
  },[room_id]);

  useEffect( async () => {
    if(current_users) {
      current_users.map((user,i) => {
        const answerWatch = gameRef.doc(room_id)
          .collection('users')
            .doc(user.id)
              .collection('answers')
              .orderBy('createdAt', 'desc')
              .limit(1)
              .onSnapshot(snapshot => {
                snapshot.forEach((snp)=>{
                  const data = snp.data()
                  if(data) {
                    console.log(data, snp)
                    const matched = getAllIndexes(lyrics, data.answer);
                    // console.log(matched);
                    updateAnswers(matched);
                  }
                  
                });
        }, err => {
          console.log(`Encountered error: ${err}`);
        });
      })
      
      
    }
  },[current_users]);


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
      console.log(format)
      const matched = getAllIndexes(lyrics, format);
      console.log(matched)
      updateAnswers(matched);
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
    game_details,
    current_users
  }
}

export default initLyricQuiz;