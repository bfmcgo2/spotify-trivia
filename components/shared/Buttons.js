import { Spacer } from "@geist-ui/react"
import { LogIn } from '@geist-ui/react-icons'

import styles from '../../styles/Button.module.css'

const Buttons = ({type, action}) => {
	if(type === "login")
	return(
		<div className={styles.Button_container}>
		  <button className={styles.Button}  onClick={action}><Spacer x={2}/>Sign In With Spotify <Spacer x={2}/> <LogIn /></button>
		</div>
	)
}

export default Buttons