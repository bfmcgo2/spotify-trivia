import { useEffect, useState } from 'react';

import { Row, Col, Card, Spacer, useToasts, Button } from "@geist-ui/react";
import { addUsers } from '../lib/firebase';

import styles from '../styles/Join.module.css';

const MobileLogIn = ({ room_code, guest, disable, setGuest }) => {
	const tileColors = ['#FFD29A', '#7CD1F9', '#223441', '#ED5564', '#77ab59'];
	const [input, setInput] = useState('')
	console.log(guest)
	const submitHandler = () => {	
		addUsers(room_code, {...guest, entered_room: true}, (i)=> {
			setGuest({...guest, entered_room: true, id: i});
		})
	}

	useEffect(() => {
    	setGuest({...guest, name: input})
	}, [input])

	return(
		<div className={styles.Join__login}>
			<div className={styles.Join__label}>
				<h2 className={styles.Join__h2}>Room Code:</h2>
				<span className="Join__code">{room_code}</span>
			</div>
			
			<div className={styles.Join__form}>
				<input type="text" 
						maxLength = '12' 
						placeholder="NAME" 
						value = {input}
						className={styles.Join__input}
						onChange={(e)=> {
							const val = e.target.value;
							const format = val.toLowerCase();
							setInput(format)
				        }} />
				<Spacer y={1} />
				<Button size={'large'}
						type= {'success'}
						style={{
							fontWeight:900,
							textTransform: 'uppercase'
						}}
						disabled={disable}
						onClick={submitHandler}>Enter Game</Button>
				
			</div>
			<div className={styles.Join__label}>
				<h2 className={styles.Join__h2}>Choose Color:</h2>
			</div>
			<Row justify="space-around" style={{ marginBottom: '18px' }}>
				{tileColors.map((color, i)=> {
					return(
						<Col span="4" key={i}>
							<Card style={{ 
								backgroundColor: color,
								boxShadow: (guest.color === color) ? "0px 0px 1px 5px #E0E0E0" : 'none' }} 
								onClick={()=> {
									setGuest({...guest, color})
								}
							}>
							</Card>
						</Col>
					)
				})}
			</Row>
		</div>
	)

}

export default MobileLogIn;