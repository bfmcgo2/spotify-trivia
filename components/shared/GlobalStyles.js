import styles from '../../styles/GlobalStyles.module.css'


const GlobalStyles = (props) => {
	return(
		<div className={styles.GlobalStyles}>
			{props.children}
		</div>
	)
}

export default GlobalStyles