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
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;900&display=swap" rel="stylesheet" />
      </Head>
    <div className={styles.page_wrapper}>
      {user && spotifyAuthToken? 
              (<Auth token = { spotifyAuthToken }/>) : 
              (<UnAuth />)} 

      
    </div>
    </div>
  )
}


export default Home;