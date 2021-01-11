import Head from 'next/head';
import { useEffect, useState, createContext } from 'react'
import { Page, Col, Row, Loading, Input, Text, Button, useToasts } from "@geist-ui/react"
import useSWR from 'swr';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';


import useAuth from '../hooks/useAuth';

import fetcher from '../lib/fetcher';
import styles from '../styles/Home.module.css'

import UnAuth from '../components/UnAuth';
import Auth from '../components/Auth';

const AuthContext = createContext();

const Home = () => {
  const { user, loading, spotifyAuthToken } = useAuth();
  // console.log(spotifyAuthToken, user)
  if(loading) return (
    <Row style={{ padding: '10px 0', width: '50px' }}>
        <Loading size="large" />
    </Row>
  )
  return (
    <div className={styles.container}>
      <Head>
        <title>Spotify Trivia</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"/>
        <link rel="stylesheet" type="text/css"href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"/>
      </Head>
    <Page>
      {user && spotifyAuthToken? 
              (<Auth token = { spotifyAuthToken }/>) : 
              (<UnAuth />)} 
    </Page>
    </div>
  )
}


export default Home;