import { useEffect, useContext } from 'react';
import { Page, Grid, Button, Text, Input,Spacer } from "@geist-ui/react"
import Cookies from 'js-cookie';

import SongQuiz from '../../components/SongQuiz';
import SongCard from '../../components/shared/SongCard';

import useAuth from '../../hooks/useAuth';
import initLyricQuiz from '../../hooks/initLyricQuiz';
import { User } from '../../context/UserContext';
import { signOutSpotify } from "../../lib/firebase";
// Component Fix later 
import styles from '../../styles/Join.module.css';


const LyricQuiz = () => {
	const getUser = Cookies.get('userData');
	
	const { lyrics, setInput, input, endQuiz, score, songDetails } = initLyricQuiz();
	

	// COME BACK TO THIS PLEASE
	// if(!getUser || !lyrics) return <div></div>
	// const userData = JSON.parse(getUser);
	// console.log(lyrics)
	if(!lyrics) return <div></div>

	return (
	<Page>
		<div style={{
				position: 'fixed',
				top: '100px',
				right: '50px',
				display: 'flex',
				alignItems:'center',
				justifyContent:'center',
				flexDirection: 'column'
			}}>
			<input type="text"  
					placeholder="Post Lyrics here" 
					className={styles.Join__input}
					style={{
						width: '300px'
					}} 
					value = {input}
					onChange={(e)=> {
			          setInput(e.target.value)
			        }} />
			<Spacer y={.5} />
	        <Button onClick={endQuiz}>End Quiz</Button>
		</div>
		<h2>{songDetails.title}</h2>
		<h3>{songDetails.artist}</h3>
		<div>Score: {score}/{lyrics.filter(lyric => !lyric.lyric=== false).length}</div>
		
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
