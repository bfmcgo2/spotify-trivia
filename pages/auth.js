import { useEffect } from 'react';
import { Page } from "@geist-ui/react"

import useAuth from '../hooks/useAuth';
import { signInWithSpotify } from "../lib/firebase";


const AuthPage = () => {
	const { spotifyAuthToken } = useAuth();
	
	useEffect(()=> {
		const auth_code = window.location.search.substr(1).split('&')[0].split("=")[1];
		console.log(auth_code, spotifyAuthToken)
		if (auth_code) {
		  window.opener.spotifyCallback(auth_code)
		}
	},[])
	return (
	<Page>		
		It Worked!
	</Page>
	)
}

export default AuthPage
