import Head from 'next/head';
import { useEffect, useState, createContext, useContext } from 'react'
import { Page, Col, Row, Loading, Input, Text, Button, useToasts } from "@geist-ui/react"

import useAuth from '../hooks/useAuth';

import fetcher from '../lib/fetcher';
import styles from '../styles/Home.module.css'

import UnAuth from '../components/UnAuth';

import { User } from '../context/UserContext';


const Home = () => {
  const { state } = useContext(User);
  const { user, loading, spotifyAuthToken } = useAuth();
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
        <UnAuth />
      </div>
    </div>
  )
}


export default Home;