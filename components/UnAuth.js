import { SpotifyAuth, Scopes } from 'react-spotify-auth';

import { signInWithSpotify } from "../lib/firebase";
import { login } from '../lib/spotify';
import useAuth from '../hooks/useAuth';

import { Button } from "@geist-ui/react"

const dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const UnAuth = () => {
  let auth_code = window.location.search.substr(1).split('&')[0].split("=")[1];
  
  if (auth_code) {
    window.opener.spotifyCallback(auth_code)
  }
  return(
    <div className='login-page'>
      <h1>React Spotify Auth Demo</h1>
      <h2>Sign in to get started</h2>
      <div className='spotifyBtn'>
        <Button onClick={login}>Sign In With Spotify</Button>
      </div>
    </div>
  )
}

export default UnAuth;