import { useEffect, useState } from 'react';
import useSWR, { SWRConfig } from 'swr';

import fetcher from '../lib/fetcher';

const initLyricQuiz = () => {
  const [init_lyrics, getLyrics] = useState(false);
  const [lyrics, setLyrics] = useState();
  const [input, setInput] = useState('');
  const [answers, setAnswers] = useState([]);
  useSWR((init_lyrics === false ? '/api/genius/get-song': null), fetcher, 
    { 
      onSuccess:(data, error)=>{
        const lyric_answers = []
        let lyrics = data.lyrics.replace(/[\(\[].*?[\)\]]/g, "");
        let formatted = lyrics.replace(/(\r\n)+|\r+|\n+|\t+/g, ' . ')
                    .replace(/\s+/g, ' ').trim()
                    // .replace(/\n|\r/g, ' ')
        // console.log(formatted);            
                    // .replace(/[^\w\s]|_/g, '').trim();
        let arr = formatted.split(' ')//.replace('↵', '<br/>')
        
        arr.map(lyric => {
          // console.log(lyric)
          const answer = {}

          if(lyric.match(/\./g)) {
            console.log(lyric);
            answer.lyric = false;
            answer.formatted_answer = false
            return lyric_answers.push(answer);
          }


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
  
  // On input change
  useEffect(()=> {
    const format = input.toLowerCase();
    if(lyrics) {
      const dupl = [...lyrics];
      const updateAnswers = [];
      const matched = getAllIndexes(lyrics, format);
      matched.map((mat)=> {
        updateAnswers.push(dupl[mat]);
      })
      console.log(updateAnswers);
      // console.log(matched)
      // for(let i = 0; i < matched.length; i++) {
        // lyrics.matched[i]
        // console.log(lyrics[matched[i]], matched[i]);
        // let correct = updateAnswers.push(dupl[matched[i]])
        // let removed = lyrics.splice(matched[i], 1)

        // console.log( removed);
      // }

    } 

  },[input]);

  

  return { 
    // return values
    lyrics,
    setInput,
    input
  }
}

export default initLyricQuiz;