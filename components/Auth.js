import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Button } from "@geist-ui/react";
import useSWR, { SWRConfig } from 'swr';
import { Grid } from "@geist-ui/react";

import { signInWithSpotify, signOutSpotify } from "../lib/firebase";
import { skipTrack } from "../lib/spotify";
import fetcher from '../lib/fetcher';

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

  const { data, error } = useSWR('/api/new-music?access_token='+token, fetcher);
  console.log(data);
  if(!data) return <Button onClick={logout}>Logout</Button>
  return(
    <>
      {
        // <h1>Hi! How it going?</h1>
        // <UserData token = {token}/>
          }
      <Button onClick={logout}>Logout</Button>
      <Grid.Container gap={2} justify="center">
        
      {
        // data.tracks.map((song, i)=> {
        //   return(
        //     <Grid xs={24} md={12} key={i}>
        //       <SongCard song={song} />
        //     </Grid>
        //   )
        // })
        
      }
      <SongQuiz token = {token} />
      </Grid.Container>
    </>
  )
}

export default Auth;