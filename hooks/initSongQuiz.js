import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import useSWR, { SWRConfig } from 'swr';

import fetcher from '../lib/fetcher';
import { skipTrack } from '../lib/spotify';

const token = Cookies.get('spotifyAuthToken');


const initSongQuiz = () => {
	const [input, setInput] = useState('');
	const [answer, setAnswer] = useState();
	const [start_game, setStartGame] = useState(false);
	const [correct, setCorrect] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	useSWR((isPlaying === false && start_game ? '/api/spotify/now-playing?access_token='+token : null), fetcher, 
    { 
      onSuccess:(data, error)=>{
        if(data.isPlaying === true){
        	console.log(data, answer);
        	if(!answer || data.id !== answer.id) {
        		setAnswer(data);
        		setIsPlaying(data.isPlaying)
        	}
        	
        }
      }, refreshInterval: 100 
  	});

	// watching input change
	useEffect(()=> {
		console.log(answer, isPlaying)

	  if(answer) {
	    checkAnswer()
	  }
	},[input]);

	const nextTrack = () => {
		skipTrack(token);
		setIsPlaying(false);
		setCorrect(false);
		setInput('');
	}
	
	// matching acceptable answers with input field
	const checkAnswer = () => {
	  const format_input = input.toLowerCase().replace(/\s/g, '');
	  const { acceptable_answers } = answer;
	  if(acceptable_answers.indexOf(format_input) > -1) {
	    setCorrect(true);
	    setTimeout(()=>{
	      nextTrack();
	    }, 5000)
	  }
	}

	return { 
		input, 
		setInput, 
		answer, 
		correct,
		setStartGame,
		start_game
	}
}

export default initSongQuiz;