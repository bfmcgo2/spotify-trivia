import { useEffect, useContext, useState } from 'react';
import { Row, Col, Card, useToasts, Button } from "@geist-ui/react";

import MobileLogIn from '../../components/MobileLogIn';
import initJoinGame from '../../hooks/initJoinGame';

import styles from '../../styles/Join.module.css';

const Join = () => {
	const { guest, disable, room_code, setGuest, input, setInput } = initJoinGame();

	return (
	<div className={styles.Join} style={{
			backgroundColor: (guest.color ? guest.color : 'white')
		}}>
		{
			(guest.entered_room ? 
				<input type="text"  
					placeholder="Answers Here" 
					className={styles.Join__input}
					value={input}
					autocomplete="false"
					onChange={(e)=> {
						setInput(e.target.value)
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
