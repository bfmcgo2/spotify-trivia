import { useEffect, useContext, useRef } from 'react';
import { Page, Grid, Button, Text, Input,Spacer } from "@geist-ui/react"
import Cookies from 'js-cookie';
import  QRCode from 'qrcode.react';

import ReactPlayer from 'react-player/soundcloud'

import SongQuiz from '../../components/SongQuiz';
import SongCard from '../../components/shared/SongCard';

import useAuth from '../../hooks/useAuth';
import initLyricQuiz from '../../hooks/initLyricQuiz';
import { User } from '../../context/UserContext';
import { signOutSpotify } from "../../lib/firebase";
// Component Fix later 
import styles from '../../styles/Join.module.css';


const SoundCloud = () => {
	const playerRef = useRef(null)
	// const getUser = Cookies.get('userData');
	
	// const { lyrics, setInput, input, endQuiz, score, songDetails, game_data, room_id } = initLyricQuiz();
	
	// COME BACK TO THIS PLEASE
	// if(!getUser || !lyrics) return <div></div>
	// const userData = JSON.parse(getUser);
	// console.log(window.location.protocol + '//' + window.location.host)
	
	if(!playerRef) <div></div>
	return (
	<Page>
		<Button onClick={()=> playerRef.current.player.player.skip(1)}></Button>
		<ReactPlayer 
			ref = {playerRef}
			url='https://api.soundcloud.com/playlists/985159720' 
			onProgress={(e)=> {
				console.log(playerRef.current.player.player);
			}}
			config={{
				soundcloud:{
					options: {
						show_artwork: false,
						show_user: false,
						show_comments: true,
						visual: false
					}
				}
			}}/>
	</Page>
	)
}

export default SoundCloud
