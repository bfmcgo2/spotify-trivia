import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import { useContext } from 'react';
import { LogIn } from '@geist-ui/react-icons'

import Buttons from './shared/Buttons'
import styles from '../styles/UnAuth.module.css'

import { signInWithSpotify } from "../lib/firebase";
import { login } from '../lib/spotify';
import { User } from '../context/UserContext';
import SpotifyLogo from './shared/SpotifyLogo';



const dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const UnAuth = () => {
  const auth_code = window.location.search.substr(1).split('&')[0].split("=")[1];
  const {state, dispatch} = useContext(User)

  if (auth_code) {
    window.opener.spotifyCallback(auth_code)
  }
  return(
    <div className={styles.Authentication}>
      <SpotifyLogo />
      <h1>Spotify Trivia</h1>
      <Buttons type="login" action = { ()=> login(dispatch) }/>
    </div>
    
  )
}



export default UnAuth;