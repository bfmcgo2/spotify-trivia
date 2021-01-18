import { LogIn } from '@geist-ui/react-icons'

import styles from '../../styles/Button.module.css'

const Buttons = (props) => {
	if(props.type === 'login')
	return(
	  <button className={styles.Button} onClick={props.action}>{props.children}</button>
	)
}

export default Buttons