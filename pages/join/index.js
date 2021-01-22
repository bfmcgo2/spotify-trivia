import { useEffect, useContext, useState } from 'react';
import { Row, Col, Card, useToasts, Button } from "@geist-ui/react";

import MobileLogIn from '../../components/MobileLogIn';

import styles from '../../styles/Join.module.css';

const Join = () => {
	const [room_code, setRoomCode] = useState('');
	const [guest, setGuest] = useState({});
	const [disable, setDisable] = useState(true);

	useEffect(()=>{
		const code = window.location.search.substr(1).split('&')[0].split("=")[1];
		setRoomCode(code);
	}, []);

	useEffect(()=> {
		if(guest.hasOwnProperty('name') && guest.hasOwnProperty('color')) setDisable(false);
	}, [guest])
	
	return (
	<div className={styles.Join} style={{
			backgroundColor: (guest.color ? guest.color : 'white')
		}}>
		{
			(guest.entered_room ? 
				<input type="text"  
					placeholder="Answers Here" 
					className={styles.Join__input}
					onChange={(e)=> {
						console.log('hey')
					}} /> :
				<MobileLogIn 
					room_code={ room_code } 
					guest={ guest }
					disable = { disable }
					setGuest = { setGuest } />)
		}
		
		
	</div>
	)
}


export default Join
