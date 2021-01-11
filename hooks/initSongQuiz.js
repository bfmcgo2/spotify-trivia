import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { skipTrack } from '../lib/spotify';

const token = Cookies.get('spotifyAuthToken');


const initSongQuiz = () => {
	const [input, setInput] = useState('');
	const [answer, setAnswer] = useState();
	const [start_game, setStartGame] = useState(false);
	const [correct, setCorrect] = useState(false);

	// watching input change
	useEffect(()=> {
	  if(answer) {
	    checkAnswer()
	  }
	},[input]);
	
	// matching acceptable answers with input field
	const checkAnswer = () => {
	  const format_input = input.toLowerCase().replace(/\s/g, '');
	  console.log(format_input, answer.answers);
	  const { answers } = answer;
	  if(answers.indexOf(format_input) > -1) {
	    setCorrect(true);
	    setTimeout(()=>{
	      skipTrack(token);
	      setCorrect(false);
	      setInput('');
	    }, 5000)
	  }
	}

	return { 
		input, 
		setInput, 
		answer, 
		setAnswer, 
		start_game, 
		setStartGame, 
		correct, 
		setCorrect }
}

export default initSongQuiz;