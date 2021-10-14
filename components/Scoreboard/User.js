import styles from './Scoreboard.module.scss';

const User = ({ user, lyrics }) => {
  const totPoints = lyrics.filter(lyr => lyr.name === user.name).length;
  console.log(totPoints);
  return (
    <div 
    	className={styles.user}>
      <span 
        className={styles.user_name}
        style={{
          backgroundColor : user.color
        }}>
        <p>{ user.name }: {totPoints}</p>
      </span>

    </div>
  );
};


export default User;
