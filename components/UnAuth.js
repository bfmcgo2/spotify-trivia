import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import Cookies from 'js-cookie'

import { signInWithSpotify } from "../lib/firebase";
import { login } from '../lib/spotify';
import useAuth from '../hooks/useAuth';

import { Button } from "@geist-ui/react"

const dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const UnAuth = ({client_id}) => {
  let token = window.location.hash.substr(1).split('&')[0].split("=")[1];
  
  if (token) {
    window.opener.spotifyCallback(token)
    Cookies.set('spotifyAuthToken', token);
  }
  return(
    <div className='login-page'>
      <h1>React Spotify Auth Demo</h1>
      <h2>Sign in to get started</h2>
      <div className='spotifyBtn'>
        <Button onClick={()=> {
          console.log('unauth: ', client_id)
          login(client_id);
        }}>Sign In With Spotify</Button>
      </div>
    </div>
  )
}

export default UnAuth;