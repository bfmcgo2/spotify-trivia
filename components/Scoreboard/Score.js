import styles from './Scoreboard.module.scss';

const Score = ({ score, lyrics }) => {
  return (
    <div 
    	className={styles.score}>
    	<div>Score: {score}/{lyrics.filter(lyric => !lyric.lyric=== false).length}</div>
    </div>
  );
};


export default Score;