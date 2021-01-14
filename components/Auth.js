import { useEffect, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import { Button } from "@geist-ui/react";
import useSWR, { SWRConfig } from 'swr';
import { Grid } from "@geist-ui/react";


import { signInWithSpotify, signOutSpotify } from "../lib/firebase";
import { skipTrack } from "../lib/spotify";
import fetcher from '../lib/fetcher';

import { User } from '../context/UserContext';
import SongCard from './shared/SongCard';
import SongQuiz from './SongQuiz';

const dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const UserData = ({token}) => {

  return( 
    <Button onClick={async()=> {
      let skip = await skipTrack(token);
    }}>Get User Data</Button>
  )
}

const logout = () => {
  Cookies.remove('spotifyAuthToken');
  signOutSpotify();
}

const Auth = ({token}) => {
  const { state } = useContext(User);
  console.log(state)
  return(
    <>
      <Button auto size="small" onClick={logout}>Logout</Button>
      <Grid.Container gap={2} justify="center">
        
      <SongQuiz token = {token} />
      </Grid.Container>
    </>
  )
}

export default Auth;