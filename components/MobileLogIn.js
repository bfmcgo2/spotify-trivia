import { Row, Col, Card, Spacer, useToasts, Button } from "@geist-ui/react";

import styles from '../styles/Join.module.css';

const MobileLogIn = ({ room_code, guest, disable, setGuest }) => {
	const tileColors = ['#FFD29A', '#7CD1F9', '#223441', '#ED5564', '#77ab59'];
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
						className={styles.Join__input}
						onChange={(e)=> {
				          setGuest({...guest, name: e.target.value})
				        }} />
				<Spacer y={1} />
				<Button size={'large'}
						type= {'success'}
						style={{
							fontWeight:900,
							textTransform: 'uppercase'
						}}
						disabled={disable}
						onClick={()=> setGuest({...guest, entered_room: true})}>Enter Game</Button>
				
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