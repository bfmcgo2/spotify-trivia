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
	
	const { lyrics, setInput, input } = initLyricQuiz();
	const matchInputToLyric = () => {
		console.log(input)
	}


	if(!getUser || !lyrics) return <div></div>
	const userData = JSON.parse(getUser);

	
	return (
	<Page>	
		<Input size="large" placeholder="Large Input" style={{
			color:'white'
		}} onChange={(e)=> {
          setInput(e.target.value)
        }}/>
		{ lyrics.map((lyric, i) => {
			if(lyric.lyric === false) return <br />
			return (
				<Text>{lyric.lyric}</Text>
			)
		}) }
	</Page>
	)
}

export default LyricQuiz
