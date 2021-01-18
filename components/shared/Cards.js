import { Spacer } from "@geist-ui/react"
import { LogIn } from '@geist-ui/react-icons';



import styles from '../../styles/Cards.module.css'

const Cards = (props) => {
	return(
		<div className={styles.Cards} onClick={props.action}>
			{props.children}
		</div>
	)
}

export default Cards