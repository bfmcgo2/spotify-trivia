import { useEffect, useContext } from 'react';
import { Page, Grid, Button, Text, Input } from "@geist-ui/react"
import Cookies from 'js-cookie';

import SongQuiz from '../../components/SongQuiz';
import SongCard from '../../components/shared/SongCard';

import useAuth from '../../hooks/useAuth';
import initLyricQuiz from '../../hooks/initLyricQuiz';
import { User } from '../../context/UserContext';
import { signOutSpotify } from "../../lib/firebase";


const LyricQuiz = () => {
	const getUser = Cookies.get('userData');
	
	const { lyrics, setInput, input, endQuiz, score } = initLyricQuiz();
	

	// COME BACK TO THIS PLEASE
	// if(!getUser || !lyrics) return <div></div>
	// const userData = JSON.parse(getUser);

	if(!lyrics) return <div></div>

	return (
	<Page>	
		<div>Score: {score}/{lyrics.filter(lyric => !lyric.lyric=== false).length}</div>
		<Input 
			size="large" 
			placeholder="Large Input" 
			style={{
				color:'white',
				position: 'fixed',
				backgroundColor: 'black',
				top: 0
			}} 
			value = { input }
			onChange={(e)=> {
	          setInput(e.target.value)
	        }} />
	        <Button onClick={endQuiz}>End Quiz</Button>
		{ lyrics.map((lyric, i) => {
			if(lyric.lyric === false) return <br key={i}/>
			return (
				<span style={{
					borderBottom:'1px solid white',
					margin: '0 2px',
					textAlign: 'center'
				}} key={i}>
					<span style={{
						opacity: (lyric.correct === true ? 1 : 0)
					}}>{lyric.lyric} </span> 
					
				</span>
			)
		}) }
	</Page>
	)
}

export default LyricQuiz
