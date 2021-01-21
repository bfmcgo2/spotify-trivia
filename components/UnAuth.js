import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import { useContext } from 'react';
import { LogIn } from '@geist-ui/react-icons'
import { Spacer } from "@geist-ui/react"

import Buttons from './shared/Buttons'
import styles from '../styles/UnAuth.module.css'

import { login } from '../lib/spotify';
import { User } from '../context/UserContext';
import SpotifyLogo from './shared/SpotifyLogo';



const dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const UnAuth = () => {
  const { state, dispatch } = useContext(User);
  return(
    <div className={styles.Authentication}>
      <SpotifyLogo />
      <h1>Spotify Trivia</h1>
      <Buttons type="login" action = { ()=> login(dispatch, '/dashboard') }>
        <Spacer x={2}/>Sign In With Spotify <Spacer x={2}/> <LogIn />
      </Buttons>
      <Spacer y={1}/>
      <Buttons type="login" action = { ()=> login(dispatch, '/admin') }>
        <Spacer x={2}/>Admin <Spacer x={2}/> <LogIn />
      </Buttons>
    </div>
    
  )
}



export default UnAuth;